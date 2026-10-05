import { useState } from "react";
import type { CSSProperties } from "react";

import { CharacterThemeSurface } from "@/components/anuime-v2/system-preview";
import type { SceneDocumentV1, SceneNode } from "@/lib/anuime/scenes";
import { isRegistryComponentId } from "@/lib/anuime/studio";

import { AnuimeButton } from "../../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCard } from "../../../registry/items/components/anuime-card/anuime-card";
import { AnuimeInput } from "../../../registry/items/components/anuime-input/anuime-input";
import {
  AnuimeHeading,
  AnuimeText,
} from "../../../registry/items/components/anuime-typography/anuime-typography";
import { ComponentPreview } from "./component-preview";

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}
function SceneNodeView({
  node,
  scene,
  onAction,
}: {
  node: SceneNode;
  scene: SceneDocumentV1;
  onAction: (label: string) => void;
}) {
  if (node.kind !== "component") {
    const style = {
      "--scene-mobile-columns": node.layout.columns.mobile,
      "--scene-tablet-columns": node.layout.columns.tablet,
      "--scene-desktop-columns": node.layout.columns.desktop,
      gap: { none: 0, small: 8, medium: 16, large: 28 }[node.layout.gap],
    } as CSSProperties;
    return (
      <section className="scene-layout" aria-label={node.label || "Scene section"} style={style}>
        {node.children.map((child) => (
          <SceneNodeView key={child.id} node={child} scene={scene} onAction={onAction} />
        ))}
      </section>
    );
  }
  const recipe = scene.recipe;
  const children = (slot: string) =>
    (node.slots[slot] ?? []).map((child) => (
      <SceneNodeView key={child.id} node={child} scene={scene} onAction={onAction} />
    ));
  switch (node.component) {
    case "button":
      return (
        <AnuimeButton
          recipe={recipe}
          variant={node.state === "secondary" ? "secondary" : "primary"}
          disabled={node.state === "disabled" || node.state === "loading"}
          onClick={() => onAction(text(node.props.label))}
        >
          {node.state === "loading" ? "Working…" : text(node.props.label)}
        </AnuimeButton>
      );
    case "input":
      return (
        <AnuimeInput
          recipe={recipe}
          label={text(node.props.label)}
          placeholder={text(node.props.placeholder)}
          hint={text(node.props.hint)}
          disabled={node.state === "disabled"}
          error={node.state === "error" ? "Check this value and try again." : undefined}
        />
      );
    case "card":
      return (
        <AnuimeCard
          recipe={recipe}
          title={text(node.props.title)}
          description={text(node.props.description)}
          eyebrow={text(node.props.eyebrow)}
          action={<div className="flex flex-wrap gap-2">{children("action")}</div>}
        />
      );
    case "typography":
      return (
        <div>
          <AnuimeHeading recipe={recipe}>{text(node.props.title)}</AnuimeHeading>
          <AnuimeText recipe={recipe}>{text(node.props.text)}</AnuimeText>
        </div>
      );
    default:
      return isRegistryComponentId(node.component) ? (
        <ComponentPreview
          document={{
            recipe,
            componentId: node.component,
            previewState: node.state,
            viewport: "desktop",
            zoom: 1,
          }}
        />
      ) : (
        <p>Unsupported component</p>
      );
  }
}
export function ScenePreview({ scene }: { scene: SceneDocumentV1 }) {
  const [message, setMessage] = useState("");
  return (
    <CharacterThemeSurface
      character={scene.recipe.colorSystem}
      mode={scene.lighting}
      className="scene-preview-surface"
    >
      {scene.sections.map((section) => (
        <SceneNodeView
          key={section.id}
          node={section}
          scene={scene}
          onAction={(label) => setMessage(`${label} completed in the preview.`)}
        />
      ))}
      {scene.sections.length === 0 && <p>Add a section to start building.</p>}
      <p role="status" className="mt-4 text-sm">
        {message}
      </p>
    </CharacterThemeSurface>
  );
}
