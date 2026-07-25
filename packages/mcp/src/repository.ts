import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";

const REGISTRY_KINDS = ["components", "themes", "blocks", "lib", "bases"] as const;

export type RegistryFile = {
  path: string;
  content: string;
};

export type RegistryItem = {
  name: string;
  type: string;
  title: string;
  description: string;
  kind: (typeof REGISTRY_KINDS)[number];
  localRegistryDependencies: string[];
  installCommand: string;
  files: RegistryFile[];
};

export type AnuimeRepository = {
  readDesignSpec(fileName: string): unknown;
  listRegistryItems(): RegistryItem[];
  listComponentItems(): RegistryItem[];
  getRegistryItem(name: string): RegistryItem | undefined;
};

export type StaticRepositorySnapshot = {
  designSpecs: Readonly<Record<string, unknown>>;
  registryItems: readonly RegistryItem[];
};

type RegistryFrontmatter = {
  name?: unknown;
  type?: unknown;
  title?: unknown;
  description?: unknown;
  localRegistryDependencies?: unknown;
  files?: unknown;
};

type FrontmatterFile = {
  path?: unknown;
};

const sourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
let configuredRepository: AnuimeRepository | undefined;

export function configureAnuimeRepository(repository: AnuimeRepository): void {
  configuredRepository = repository;
}

export function findRepositoryRoot(start = process.cwd()): string {
  const candidates = [resolve(start), dirname(fileURLToPath(import.meta.url))];

  for (const candidate of candidates) {
    let current = candidate;

    while (true) {
      if (
        existsSync(join(current, "design-spec", "manifest.json")) &&
        existsSync(join(current, "registry", "items"))
      ) {
        return current;
      }

      const parent = dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }

  throw new Error("Could not locate the AnUIme repository root.");
}

export function readDesignSpec<T>(fileName: string, repositoryRoot?: string): T {
  if (!repositoryRoot && configuredRepository) {
    return configuredRepository.readDesignSpec(fileName) as T;
  }

  const root = repositoryRoot ?? findRepositoryRoot();
  return JSON.parse(readFileSync(join(root, "design-spec", fileName), "utf8")) as T;
}

export function getInstallCommand(names: readonly string[]): string {
  if (names.length === 0) {
    throw new Error("At least one registry item is required.");
  }

  const urls = names.map((name) => `https://anuime.vercel.app/r/${name}.json`);
  return `npx shadcn@latest add ${urls.join(" ")}`;
}

export function listRegistryItems(repositoryRoot?: string): RegistryItem[] {
  if (!repositoryRoot && configuredRepository) {
    return configuredRepository.listRegistryItems();
  }

  const root = repositoryRoot ?? findRepositoryRoot();
  const items: RegistryItem[] = [];

  for (const kind of REGISTRY_KINDS) {
    const kindRoot = join(root, "registry", "items", kind);
    if (!existsSync(kindRoot)) continue;

    for (const entry of readdirSync(kindRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const itemRoot = join(kindRoot, entry.name);
      const registryPath = join(itemRoot, "_registry.mdx");
      if (!existsSync(registryPath)) continue;
      items.push(readRegistryItem(registryPath, kind));
    }
  }

  return items.toSorted((left, right) => left.name.localeCompare(right.name));
}

export function listComponentItems(repositoryRoot?: string): RegistryItem[] {
  if (!repositoryRoot && configuredRepository) {
    return configuredRepository.listComponentItems();
  }

  return listRegistryItems(repositoryRoot).filter((item) => item.kind === "components");
}

export function getRegistryItem(name: string, repositoryRoot?: string): RegistryItem | undefined {
  if (!repositoryRoot && configuredRepository) {
    return configuredRepository.getRegistryItem(name);
  }

  return listRegistryItems(repositoryRoot).find((item) => item.name === name);
}

export const fileSystemRepository: AnuimeRepository = {
  readDesignSpec(fileName: string) {
    return readDesignSpec<unknown>(fileName, findRepositoryRoot());
  },
  listRegistryItems() {
    return listRegistryItems(findRepositoryRoot());
  },
  listComponentItems() {
    return listComponentItems(findRepositoryRoot());
  },
  getRegistryItem(name: string) {
    return getRegistryItem(name, findRepositoryRoot());
  },
};

export function createStaticRepository({
  designSpecs,
  registryItems,
}: StaticRepositorySnapshot): AnuimeRepository {
  const sortedRegistryItems = [...registryItems].toSorted((left, right) =>
    left.name.localeCompare(right.name),
  );

  return {
    readDesignSpec(fileName: string): unknown {
      if (!Object.hasOwn(designSpecs, fileName)) {
        throw new Error(`Unknown statically bundled AnUIme design spec: ${fileName}`);
      }

      return designSpecs[fileName];
    },
    listRegistryItems() {
      return sortedRegistryItems;
    },
    listComponentItems() {
      return sortedRegistryItems.filter((item) => item.kind === "components");
    },
    getRegistryItem(name: string) {
      return sortedRegistryItems.find((item) => item.name === name);
    },
  };
}

function readRegistryItem(registryPath: string, kind: RegistryItem["kind"]): RegistryItem {
  const itemRoot = dirname(registryPath);
  const source = readFileSync(registryPath, "utf8");
  const frontmatter = parseFrontmatter(source);
  const name = requireString(frontmatter.name, "name", registryPath);
  const type = requireString(frontmatter.type, "type", registryPath);
  const title =
    typeof frontmatter.title === "string" && frontmatter.title.trim() ? frontmatter.title : name;
  const description = typeof frontmatter.description === "string" ? frontmatter.description : "";
  const localRegistryDependencies = Array.isArray(frontmatter.localRegistryDependencies)
    ? frontmatter.localRegistryDependencies.filter(
        (dependency): dependency is string => typeof dependency === "string",
      )
    : [];
  const files = resolveRegistryFiles(itemRoot, frontmatter.files);

  return {
    name,
    type,
    title,
    description,
    kind,
    localRegistryDependencies,
    installCommand: getInstallCommand([name]),
    files,
  };
}

function parseFrontmatter(source: string): RegistryFrontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/u.exec(source);
  if (!match?.[1]) {
    throw new Error("Registry item is missing YAML frontmatter.");
  }

  const value: unknown = parse(match[1]);
  if (!value || typeof value !== "object") {
    throw new Error("Registry frontmatter must be an object.");
  }

  return value as RegistryFrontmatter;
}

function resolveRegistryFiles(itemRoot: string, value: unknown): RegistryFile[] {
  const explicitPaths = Array.isArray(value)
    ? value
        .map((file) =>
          file && typeof file === "object" ? (file as FrontmatterFile).path : undefined,
        )
        .filter((path): path is string => typeof path === "string")
    : [];
  const paths = explicitPaths.length > 0 ? explicitPaths : discoverDefaultSourceFiles(itemRoot);

  return paths.map((path) => {
    const absolutePath = join(itemRoot, path);
    if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
      throw new Error(`Registry source file does not exist: ${absolutePath}`);
    }

    return { path, content: readFileSync(absolutePath, "utf8") };
  });
}

function discoverDefaultSourceFiles(itemRoot: string): string[] {
  return readdirSync(itemRoot)
    .filter((name) => !name.startsWith("_"))
    .filter((name) => sourceExtensions.has(name.slice(name.lastIndexOf("."))))
    .toSorted();
}

function requireString(value: unknown, key: string, filePath: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Registry frontmatter ${key} must be a non-empty string: ${filePath}`);
  }
  return value;
}
