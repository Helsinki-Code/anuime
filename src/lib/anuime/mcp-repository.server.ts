import lawsSource from "../../../design-spec/laws.json?raw";
import motionSource from "../../../design-spec/motion.json?raw";
import themesSource from "../../../design-spec/themes.json?raw";
import {
  createStaticRepository,
  getInstallCommand,
  type RegistryItem,
} from "../../../packages/mcp/src/repository";
import { registryItems } from "../registry/catalog";
import type { RegistryCatalogItem } from "../registry/catalog-builder";
import { getRegistryItemWithSources } from "../registry/source.server";

const registryKinds = ["components", "themes", "blocks", "lib", "bases"] as const;
type RegistryKind = (typeof registryKinds)[number];

export const productionMcpRepository = createStaticRepository({
  designSpecs: {
    "laws.json": JSON.parse(lawsSource) as unknown,
    "motion.json": JSON.parse(motionSource) as unknown,
    "themes.json": JSON.parse(themesSource) as unknown,
  },
  registryItems: registryItems.map(toMcpRegistryItem),
});

function toMcpRegistryItem(item: RegistryCatalogItem): RegistryItem {
  const itemWithSources = getRegistryItemWithSources(item);

  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    kind: getRegistryKind(item.registryMdxFilePath),
    localRegistryDependencies: (item.registryDependencies ?? [])
      .map(getLocalRegistryDependency)
      .filter((dependency): dependency is string => dependency !== undefined),
    installCommand: getInstallCommand([item.name]),
    files: itemWithSources.sourceFiles.map((file) => ({
      path: getAuthoredSourcePath(item.registryMdxFilePath, file.sourcePath, file.path),
      content: file.source,
    })),
  };
}

function getRegistryKind(path: string): RegistryKind {
  const kind = path.split("/")[2];

  if (!isRegistryKind(kind)) {
    throw new Error(`Unsupported MCP registry kind in statically bundled path: ${path}`);
  }

  return kind;
}

function isRegistryKind(value: string | undefined): value is RegistryKind {
  return registryKinds.some((candidate) => candidate === value);
}

function getLocalRegistryDependency(value: string): string | undefined {
  return /\/r\/([^/]+)\.json$/u.exec(value)?.[1];
}

function getAuthoredSourcePath(
  registryMdxPath: string,
  sourcePath: string,
  fallbackPath: string,
): string {
  const itemRoot = registryMdxPath.slice(0, registryMdxPath.lastIndexOf("/") + 1);

  return sourcePath.startsWith(itemRoot) ? sourcePath.slice(itemRoot.length) : fallbackPath;
}
