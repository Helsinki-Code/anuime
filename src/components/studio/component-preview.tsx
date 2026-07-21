import { IconBolt, IconLoader2 } from "@tabler/icons-react";

import type { StudioDocument } from "@/lib/anuime/studio";

import { AnuimeAuthPanel } from "../../../registry/items/blocks/anuime-auth-panel/anuime-auth-panel";
import { AnuimeAccordion } from "../../../registry/items/components/anuime-accordion/anuime-accordion";
import { AnuimeAlertDialog } from "../../../registry/items/components/anuime-alert-dialog/anuime-alert-dialog";
import { AnuimeAlert } from "../../../registry/items/components/anuime-alert/anuime-alert";
import { AnuimeAspectRatio } from "../../../registry/items/components/anuime-aspect-ratio/anuime-aspect-ratio";
import {
  AnuimeAvatar,
  AnuimeAvatarGroup,
} from "../../../registry/items/components/anuime-avatar/anuime-avatar";
import {
  AnuimeBadge,
  AnuimeStatusIndicator,
} from "../../../registry/items/components/anuime-badge/anuime-badge";
import { AnuimeBreadcrumb } from "../../../registry/items/components/anuime-breadcrumb/anuime-breadcrumb";
import {
  AnuimeButtonGroup,
  AnuimeButtonGroupItem,
  AnuimeSplitButton,
} from "../../../registry/items/components/anuime-button-group/anuime-button-group";
import { AnuimeButton } from "../../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCalendar } from "../../../registry/items/components/anuime-calendar/anuime-calendar";
import { AnuimeCard } from "../../../registry/items/components/anuime-card/anuime-card";
import { AnuimeCheckbox } from "../../../registry/items/components/anuime-checkbox/anuime-checkbox";
import { AnuimeCollapsible } from "../../../registry/items/components/anuime-collapsible/anuime-collapsible";
import { AnuimeCombobox } from "../../../registry/items/components/anuime-combobox/anuime-combobox";
import { AnuimeCommandPalette } from "../../../registry/items/components/anuime-command-palette/anuime-command-palette";
import { AnuimeContextMenu } from "../../../registry/items/components/anuime-context-menu/anuime-context-menu";
import { AnuimeDataTable } from "../../../registry/items/components/anuime-data-table/anuime-data-table";
import { AnuimeDateControl } from "../../../registry/items/components/anuime-date-control/anuime-date-control";
import { AnuimeDialog } from "../../../registry/items/components/anuime-dialog/anuime-dialog";
import { AnuimeDrawer } from "../../../registry/items/components/anuime-drawer/anuime-drawer";
import { AnuimeDropdownMenu } from "../../../registry/items/components/anuime-dropdown-menu/anuime-dropdown-menu";
import { AnuimeEmptyState } from "../../../registry/items/components/anuime-empty-state/anuime-empty-state";
import {
  AnuimeField,
  AnuimeFieldset,
} from "../../../registry/items/components/anuime-field/anuime-field";
import { AnuimeHoverCard } from "../../../registry/items/components/anuime-hover-card/anuime-hover-card";
import { AnuimeInputGroup } from "../../../registry/items/components/anuime-input-group/anuime-input-group";
import { AnuimeInputOtp } from "../../../registry/items/components/anuime-input-otp/anuime-input-otp";
import { AnuimeInput } from "../../../registry/items/components/anuime-input/anuime-input";
import {
  AnuimeKbd,
  AnuimeShortcutHint,
} from "../../../registry/items/components/anuime-kbd/anuime-kbd";
import { AnuimeMenubar } from "../../../registry/items/components/anuime-menubar/anuime-menubar";
import { AnuimeNavigationMenu } from "../../../registry/items/components/anuime-navigation-menu/anuime-navigation-menu";
import { AnuimePagination } from "../../../registry/items/components/anuime-pagination/anuime-pagination";
import { AnuimePopover } from "../../../registry/items/components/anuime-popover/anuime-popover";
import { AnuimeProgress } from "../../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeRadioGroup } from "../../../registry/items/components/anuime-radio-group/anuime-radio-group";
import { AnuimeScrollArea } from "../../../registry/items/components/anuime-scroll-area/anuime-scroll-area";
import { AnuimeSelect } from "../../../registry/items/components/anuime-select/anuime-select";
import { AnuimeSeparator } from "../../../registry/items/components/anuime-separator/anuime-separator";
import { AnuimeSheet } from "../../../registry/items/components/anuime-sheet/anuime-sheet";
import { AnuimeSidebar } from "../../../registry/items/components/anuime-sidebar/anuime-sidebar";
import { AnuimeSkeleton } from "../../../registry/items/components/anuime-skeleton/anuime-skeleton";
import {
  AnuimeRangeSlider,
  AnuimeSlider,
} from "../../../registry/items/components/anuime-slider/anuime-slider";
import { AnuimeSpinner } from "../../../registry/items/components/anuime-spinner/anuime-spinner";
import { AnuimeSwitch } from "../../../registry/items/components/anuime-switch/anuime-switch";
import {
  AnuimeTable,
  AnuimeTableBody,
  AnuimeTableCell,
  AnuimeTableHead,
  AnuimeTableHeader,
  AnuimeTableRow,
} from "../../../registry/items/components/anuime-table/anuime-table";
import { AnuimeTabs } from "../../../registry/items/components/anuime-tabs/anuime-tabs";
import { AnuimeTextarea } from "../../../registry/items/components/anuime-textarea/anuime-textarea";
import { AnuimeToast } from "../../../registry/items/components/anuime-toast/anuime-toast";
import {
  AnuimeToggle,
  AnuimeToggleGroup,
} from "../../../registry/items/components/anuime-toggle/anuime-toggle";
import {
  AnuimeToolbar,
  AnuimeToolbarButton,
} from "../../../registry/items/components/anuime-toolbar/anuime-toolbar";
import { AnuimeTooltip } from "../../../registry/items/components/anuime-tooltip/anuime-tooltip";
import {
  AnuimeCode,
  AnuimeHeading,
  AnuimeText,
} from "../../../registry/items/components/anuime-typography/anuime-typography";

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
    case "alert":
      return (
        <AnuimeAlert
          recipe={recipe}
          tone={
            previewState === "success" || previewState === "warning" || previewState === "error"
              ? previewState
              : "info"
          }
          title={`${previewState} transmission`}
        />
      );
    case "alert-dialog":
      return <AnuimeAlertDialog recipe={recipe} destructive={previewState === "destructive"} />;
    case "avatar":
      return previewState === "group" ? (
        <AnuimeAvatarGroup>
          <AnuimeAvatar recipe={recipe} fallback="KI" />
          <AnuimeAvatar recipe={recipe} fallback="MO" />
          <AnuimeAvatar recipe={recipe} fallback="AT" />
        </AnuimeAvatarGroup>
      ) : (
        <AnuimeAvatar
          recipe={recipe}
          size="lg"
          fallback="AN"
          status={previewState === "online" || previewState === "busy" ? previewState : undefined}
        />
      );
    case "badge":
      return previewState === "neutral" ? (
        <AnuimeBadge recipe={recipe}>Component</AnuimeBadge>
      ) : (
        <AnuimeStatusIndicator
          recipe={recipe}
          tone={previewState === "warning" || previewState === "danger" ? previewState : "success"}
          label={previewState}
        />
      );
    case "breadcrumb":
      return <AnuimeBreadcrumb recipe={recipe} />;
    case "button-group":
      return previewState === "split" ? (
        <AnuimeSplitButton recipe={recipe}>Deploy</AnuimeSplitButton>
      ) : (
        <AnuimeButtonGroup recipe={recipe}>
          <AnuimeButtonGroupItem recipe={recipe}>Preview</AnuimeButtonGroupItem>
          <AnuimeButtonGroupItem recipe={recipe}>Code</AnuimeButtonGroupItem>
          <AnuimeButtonGroupItem recipe={recipe}>Install</AnuimeButtonGroupItem>
        </AnuimeButtonGroup>
      );
    case "calendar":
      return (
        <AnuimeCalendar
          recipe={recipe}
          mode={previewState === "range" ? "range" : "single"}
          disabled={previewState === "disabled"}
        />
      );
    case "collapsible":
      return <AnuimeCollapsible recipe={recipe} open={previewState === "open"} />;
    case "context-menu":
      return <AnuimeContextMenu recipe={recipe} />;
    case "dropdown-menu":
      return <AnuimeDropdownMenu recipe={recipe} />;
    case "drawer":
      return (
        <AnuimeDrawer
          recipe={recipe}
          placement={previewState === "left" || previewState === "right" ? previewState : "bottom"}
        >
          <p className="text-sm">Secondary workflow content.</p>
        </AnuimeDrawer>
      );
    case "empty-state":
      return (
        <AnuimeEmptyState
          recipe={recipe}
          action={
            previewState === "action" ? (
              <AnuimeButton recipe={recipe}>Create first project</AnuimeButton>
            ) : undefined
          }
        />
      );
    case "field":
      return previewState === "fieldset" ? (
        <AnuimeFieldset recipe={recipe}>
          <AnuimeField recipe={recipe} label="Call sign">
            <input className="rounded border bg-transparent px-3 py-2" />
          </AnuimeField>
        </AnuimeFieldset>
      ) : (
        <AnuimeField
          recipe={recipe}
          label="Call sign"
          error={previewState === "error" ? "Call sign is required." : undefined}
        >
          <input className="rounded border bg-transparent px-3 py-2" />
        </AnuimeField>
      );
    case "hover-card":
      return <AnuimeHoverCard recipe={recipe} />;
    case "input-group":
      return (
        <AnuimeInputGroup
          recipe={recipe}
          placeholder="Search the registry…"
          disabled={previewState === "disabled"}
          trailing={<AnuimeKbd recipe={recipe}>⌘K</AnuimeKbd>}
        />
      );
    case "input-otp":
      return <AnuimeInputOtp recipe={recipe} disabled={previewState === "disabled"} />;
    case "kbd":
      return previewState === "shortcut" ? (
        <AnuimeShortcutHint recipe={recipe} />
      ) : (
        <AnuimeKbd recipe={recipe}>Enter</AnuimeKbd>
      );
    case "menubar":
      return <AnuimeMenubar recipe={recipe} />;
    case "scroll-area":
      return (
        <AnuimeScrollArea
          recipe={recipe}
          maxHeight={previewState === "compact" ? "9rem" : "16rem"}
        />
      );
    case "separator":
      return (
        <div
          className={
            previewState === "vertical" ? "flex h-24 items-center gap-4" : "grid w-full gap-4"
          }
        >
          <span>Before</span>
          <AnuimeSeparator
            recipe={recipe}
            decorative={false}
            orientation={previewState === "vertical" ? "vertical" : "horizontal"}
          />
          <span>After</span>
        </div>
      );
    case "sheet":
      return (
        <AnuimeSheet recipe={recipe} side={previewState === "left" ? "left" : "right"}>
          <p className="text-sm">Inspectable system properties.</p>
        </AnuimeSheet>
      );
    case "sidebar":
      return <AnuimeSidebar recipe={recipe} collapsed={previewState === "collapsed"} />;
    case "slider":
      return previewState === "range" ? (
        <AnuimeRangeSlider recipe={recipe} />
      ) : (
        <AnuimeSlider recipe={recipe} disabled={previewState === "disabled"} output="68%" />
      );
    case "spinner":
      return (
        <AnuimeSpinner
          recipe={recipe}
          size={previewState === "small" ? "sm" : previewState === "large" ? "lg" : "md"}
        />
      );
    case "toggle":
      return previewState === "group" ? (
        <AnuimeToggleGroup recipe={recipe} />
      ) : (
        <AnuimeToggle recipe={recipe} pressed={previewState === "on"}>
          Overdrive
        </AnuimeToggle>
      );
    case "toolbar":
      return (
        <AnuimeToolbar recipe={recipe}>
          <AnuimeToolbarButton recipe={recipe}>Undo</AnuimeToolbarButton>
          <AnuimeToolbarButton recipe={recipe}>Redo</AnuimeToolbarButton>
          <AnuimeToolbarButton recipe={recipe}>Share</AnuimeToolbarButton>
        </AnuimeToolbar>
      );
    case "typography":
      return (
        <div className="grid max-w-lg gap-3">
          <AnuimeHeading recipe={recipe}>Every system has a story.</AnuimeHeading>
          <AnuimeText>Typography preserves hierarchy across every character recipe.</AnuimeText>
          <AnuimeCode recipe={recipe}>anuime init</AnuimeCode>
        </div>
      );
    case "aspect-ratio":
      return (
        <AnuimeAspectRatio
          recipe={recipe}
          ratio={previewState === "square" ? 1 : previewState === "portrait" ? 3 / 4 : 16 / 9}
          className="max-w-lg"
        />
      );
    case "table":
      return (
        <AnuimeTable recipe={recipe}>
          <AnuimeTableHeader>
            <AnuimeTableRow>
              <AnuimeTableHead>System</AnuimeTableHead>
              <AnuimeTableHead>Status</AnuimeTableHead>
            </AnuimeTableRow>
          </AnuimeTableHeader>
          <AnuimeTableBody>
            {previewState === "empty" ? null : (
              <>
                <AnuimeTableRow>
                  <AnuimeTableCell>Kira</AnuimeTableCell>
                  <AnuimeTableCell>Ready</AnuimeTableCell>
                </AnuimeTableRow>
                <AnuimeTableRow>
                  <AnuimeTableCell>Atlas</AnuimeTableCell>
                  <AnuimeTableCell>Review</AnuimeTableCell>
                </AnuimeTableRow>
              </>
            )}
          </AnuimeTableBody>
        </AnuimeTable>
      );
    default:
      return null;
  }
}
