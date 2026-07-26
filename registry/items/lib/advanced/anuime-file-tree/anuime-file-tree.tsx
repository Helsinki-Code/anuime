"use client";

import { useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeFileTreeNode = {
  id: string;
  label: string;
  children?: readonly AnuimeFileTreeNode[];
};

export type AnuimeFileTreeProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  nodes: readonly AnuimeFileTreeNode[];
  defaultExpanded?: readonly string[];
  onSelect?: (node: AnuimeFileTreeNode) => void;
};

export function AnuimeFileTree({
  character = "kira",
  recipe,
  nodes,
  defaultExpanded = [],
  onSelect,
  className = "",
  ...props
}: AnuimeFileTreeProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      data-character={system}
      data-anuime-component="file-tree"
      className={`grid text-sm text-foreground ${className}`}
      {...props}
    >
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          character={system}
          depth={0}
          expanded={expanded}
          onToggle={toggle}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function TreeNode({
  node,
  character,
  depth,
  expanded,
  onToggle,
  onSelect,
}: {
  node: AnuimeFileTreeNode;
  character: "kira" | "mochi" | "atlas";
  depth: number;
  expanded: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onSelect?: (node: AnuimeFileTreeNode) => void;
}) {
  const branch = Boolean(node.children?.length);
  const open = expanded.has(node.id);
  return (
    <div className="relative">
      {depth > 0 ? (
        <span
          aria-hidden="true"
          className={`absolute top-0 bottom-0 border-l ${
            character === "mochi"
              ? "rounded-bl-full border-[var(--anuime-accent,var(--accent))]"
              : "border-border"
          }`}
          style={{ left: `${depth * 16 - 8}px` }}
        />
      ) : null}
      <button
        type="button"
        aria-expanded={branch ? open : undefined}
        className={`flex min-h-9 w-full items-center gap-2 px-2 text-left transition-colors hover:bg-[var(--anuime-surface,var(--muted))] motion-reduce:transition-none ${
          character === "kira"
            ? "duration-[240ms]"
            : character === "mochi"
              ? "duration-[250ms]"
              : "duration-[180ms]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (branch) onToggle(node.id);
          onSelect?.(node);
        }}
      >
        <TreeDisclosure character={character} branch={branch} open={open} />
        <span>{node.label}</span>
      </button>
      {branch && open
        ? node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              character={character}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))
        : null}
    </div>
  );
}

function TreeDisclosure({
  character,
  branch,
  open,
}: {
  character: "kira" | "mochi" | "atlas";
  branch: boolean;
  open: boolean;
}) {
  if (!branch) {
    return <span aria-hidden="true" className="size-1.5 bg-border" />;
  }
  if (character === "kira") {
    return (
      <span aria-hidden="true" className="w-3 font-mono text-[var(--anuime-accent,var(--accent))]">
        {open ? "⌄" : "›"}
      </span>
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className={`size-3 rounded-full border-r-2 border-[var(--anuime-accent,var(--accent))] ${open ? "border-b-2" : ""}`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`size-3 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))] ${
        open ? "border-b-2" : "border-r-2"
      }`}
    />
  );
}
