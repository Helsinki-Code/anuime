import { IconBolt, IconLoader2 } from "@tabler/icons-react";

import type { StudioDocument } from "@/lib/anuime/studio";

import { AnuimeAuthPanel } from "../../../registry/items/blocks/anuime-auth-panel/anuime-auth-panel";
import { AnuimeAccordion } from "../../../registry/items/components/anuime-accordion/anuime-accordion";
import { AnuimeButton } from "../../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCard } from "../../../registry/items/components/anuime-card/anuime-card";
import { AnuimeCheckbox } from "../../../registry/items/components/anuime-checkbox/anuime-checkbox";
import { AnuimeCombobox } from "../../../registry/items/components/anuime-combobox/anuime-combobox";
import { AnuimeCommandPalette } from "../../../registry/items/components/anuime-command-palette/anuime-command-palette";
import { AnuimeDataTable } from "../../../registry/items/components/anuime-data-table/anuime-data-table";
import { AnuimeDateControl } from "../../../registry/items/components/anuime-date-control/anuime-date-control";
import { AnuimeDialog } from "../../../registry/items/components/anuime-dialog/anuime-dialog";
import { AnuimeInput } from "../../../registry/items/components/anuime-input/anuime-input";
import { AnuimeNavigationMenu } from "../../../registry/items/components/anuime-navigation-menu/anuime-navigation-menu";
import { AnuimePagination } from "../../../registry/items/components/anuime-pagination/anuime-pagination";
import { AnuimePopover } from "../../../registry/items/components/anuime-popover/anuime-popover";
import { AnuimeProgress } from "../../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeRadioGroup } from "../../../registry/items/components/anuime-radio-group/anuime-radio-group";
import { AnuimeSelect } from "../../../registry/items/components/anuime-select/anuime-select";
import { AnuimeSkeleton } from "../../../registry/items/components/anuime-skeleton/anuime-skeleton";
import { AnuimeSwitch } from "../../../registry/items/components/anuime-switch/anuime-switch";
import { AnuimeTabs } from "../../../registry/items/components/anuime-tabs/anuime-tabs";
import { AnuimeTextarea } from "../../../registry/items/components/anuime-textarea/anuime-textarea";
import { AnuimeToast } from "../../../registry/items/components/anuime-toast/anuime-toast";
import { AnuimeTooltip } from "../../../registry/items/components/anuime-tooltip/anuime-tooltip";

export function ComponentPreview({ document }: { document: StudioDocument }) {
  const { recipe, componentId, previewState } = document;
  switch (componentId) {
    case "button":
      return (
        <AnuimeButton
          recipe={recipe}
          variant={previewState === "secondary" ? "secondary" : "primary"}
          disabled={previewState === "disabled" || previewState === "loading"}
        >
          {previewState === "loading" ? (
            <>
              <IconLoader2 className="size-4 animate-spin motion-reduce:animate-none" />
              Activating…
            </>
          ) : (
            <>
              <IconBolt className="size-4" /> Activate sequence
            </>
          )}
        </AnuimeButton>
      );
    case "input":
      return (
        <AnuimeInput
          recipe={recipe}
          label="Call sign"
          placeholder="Starlight"
          hint={
            previewState === "error" ? undefined : "Visible labels and supporting text included."
          }
          error={previewState === "error" ? "Call sign is required." : undefined}
          disabled={previewState === "disabled"}
          className={previewState === "focus" ? "ring-2 ring-offset-2" : ""}
        />
      );
    case "checkbox":
      return (
        <AnuimeCheckbox
          recipe={recipe}
          label="Enable tactical motion"
          description="The system preference always overrides decorative motion."
          defaultChecked={previewState === "selected"}
          disabled={previewState === "disabled"}
        />
      );
    case "card":
      return (
        <AnuimeCard
          recipe={recipe}
          eyebrow="Mission 07"
          title="Build something unmistakable."
          description="A real registry component rendered through the selected recipe."
          aria-current={previewState === "selected" ? "true" : undefined}
          action={<AnuimeButton recipe={recipe}>Inspect tokens</AnuimeButton>}
        />
      );
    case "tabs":
      return (
        <AnuimeTabs
          recipe={recipe}
          defaultTab={previewState === "selected" ? "tokens" : "brief"}
          tabs={[
            { id: "brief", label: "Brief", content: "Direct an expressive, bounded interface." },
            {
              id: "tokens",
              label: "Tokens",
              content: "Color, shape, structure, and motion stay explicit.",
            },
            { id: "code", label: "Code", content: "Install readable React and TypeScript source." },
          ]}
        />
      );
    case "dialog":
      return (
        <AnuimeDialog
          recipe={recipe}
          title="Initialize system?"
          description="Your recipe is valid and ready for installation."
          triggerLabel="Open transmission"
        >
          <p className="text-sm">Keyboard focus remains inside the native modal.</p>
        </AnuimeDialog>
      );
    case "select":
      return (
        <AnuimeSelect
          recipe={recipe}
          label="Choose your system"
          disabled={previewState === "disabled"}
          hint="Mix individual dimensions in the controls panel."
          options={[
            { value: "kira", label: "Kira — Neon Ronin" },
            { value: "mochi", label: "Mochi — Dream Familiar" },
            { value: "atlas", label: "Atlas — Mecha Architect" },
          ]}
        />
      );
    case "toast":
      return (
        <AnuimeToast
          recipe={recipe}
          status={previewState === "success" || previewState === "warning" ? previewState : "info"}
          title={previewState === "warning" ? "Review recipe" : "Recipe installed"}
          description="The component source now belongs to your project."
          onDismiss={() => undefined}
        />
      );
    case "navigation-menu":
      return (
        <AnuimeNavigationMenu
          recipe={recipe}
          items={[
            { label: "Components", href: "#components" },
            { label: "Characters", href: "#characters" },
            { label: "Docs", href: "#docs" },
          ]}
          action={<AnuimeButton recipe={recipe}>Studio</AnuimeButton>}
        />
      );
    case "command-palette":
      return (
        <AnuimeCommandPalette
          recipe={recipe}
          commands={
            previewState === "empty"
              ? []
              : [
                  { id: "kira", label: "Cast Kira", group: "Characters", shortcut: "K" },
                  { id: "mochi", label: "Cast Mochi", group: "Characters", shortcut: "M" },
                  { id: "atlas", label: "Cast Atlas", group: "Characters", shortcut: "A" },
                ]
          }
        />
      );
    case "data-table":
      return (
        <AnuimeDataTable
          recipe={recipe}
          caption="Component readiness"
          rows={
            previewState === "empty"
              ? []
              : [
                  { id: "1", component: "Button", system: "Kira", status: "Ready" },
                  { id: "2", component: "Dialog", system: "Atlas", status: "Review" },
                  { id: "3", component: "Card", system: "Mochi", status: "Ready" },
                ]
          }
          columns={[
            { key: "component", header: "Component" },
            { key: "system", header: "System" },
            { key: "status", header: "Status" },
          ]}
        />
      );
    case "auth-panel":
      return (
        <div className={previewState === "loading" ? "pointer-events-none animate-pulse" : ""}>
          <AnuimeAuthPanel recipe={recipe} />
        </div>
      );
    case "textarea":
      return (
        <AnuimeTextarea
          recipe={recipe}
          label="Mission brief"
          placeholder="Describe the intended experience…"
          hint={
            previewState === "error" ? undefined : "The Director receives bounded product context."
          }
          error={previewState === "error" ? "A mission brief is required." : undefined}
          disabled={previewState === "disabled"}
          className={previewState === "focus" ? "ring-2 ring-offset-2" : ""}
        />
      );
    case "switch":
      return (
        <AnuimeSwitch
          key={previewState}
          recipe={recipe}
          label="Enable signature power"
          description="Character behavior remains bounded by accessibility preferences."
          defaultChecked={previewState === "selected"}
          disabled={previewState === "disabled"}
        />
      );
    case "radio-group":
      return (
        <AnuimeRadioGroup
          recipe={recipe}
          legend="Choose a specialty"
          defaultValue={previewState === "selected" ? "dream-cache" : "signal-cut"}
          disabled={previewState === "disabled"}
          options={[
            {
              value: "signal-cut",
              label: "Signal Cut",
              description: "Decisive keyboard-first action.",
            },
            {
              value: "dream-cache",
              label: "Dream Cache",
              description: "Contextual guidance and recovery.",
            },
            {
              value: "gridforge",
              label: "Gridforge",
              description: "Modular hierarchy and data structure.",
            },
          ]}
        />
      );
    case "tooltip":
      return (
        <AnuimeTooltip recipe={recipe} label="Signal Cut: press ⌘K to isolate the next action.">
          <AnuimeButton recipe={recipe}>Focus for power hint</AnuimeButton>
        </AnuimeTooltip>
      );
    case "popover":
      return (
        <AnuimePopover
          key={previewState}
          recipe={recipe}
          trigger="Open Dream Cache"
          title="Context charm"
        >
          Useful guidance appears near the task and never mutates your recipe without approval.
        </AnuimePopover>
      );
    case "combobox":
      return (
        <AnuimeCombobox
          recipe={recipe}
          label="Find a component"
          placeholder={previewState === "empty" ? "No matching signal" : "Start typing…"}
          disabled={previewState === "disabled"}
          options={
            previewState === "empty"
              ? []
              : [
                  { value: "Accordion", label: "Accordion" },
                  { value: "Command Palette", label: "Command Palette" },
                  { value: "Data Table", label: "Data Table" },
                ]
          }
        />
      );
    case "accordion":
      return (
        <AnuimeAccordion
          recipe={recipe}
          items={[
            {
              id: "power",
              title: "How does Gridforge work?",
              content: "It exposes structure through modular hierarchy and inspectable regions.",
            },
            {
              id: "accessibility",
              title: "Does it respect accessibility?",
              content: "Native disclosure semantics work with keyboards and assistive technology.",
            },
          ]}
        />
      );
    case "progress":
      return (
        <AnuimeProgress
          recipe={recipe}
          label={previewState === "success" ? "Power ready" : "Charging signature power"}
          value={previewState === "loading" ? undefined : previewState === "success" ? 100 : 68}
        />
      );
    case "skeleton":
      return (
        <AnuimeSkeleton
          recipe={recipe}
          lines={previewState === "compact" ? 2 : 4}
          label="Loading component signal"
        />
      );
    case "pagination":
      return (
        <AnuimePagination
          recipe={recipe}
          page={previewState === "first" ? 1 : previewState === "last" ? 4 : 2}
          pageCount={4}
        />
      );
    case "date-control":
      return (
        <AnuimeDateControl
          recipe={recipe}
          label="Launch date"
          hint="Uses the browser's locale-aware date picker."
          disabled={previewState === "disabled"}
        />
      );
    default:
      return null;
  }
}
