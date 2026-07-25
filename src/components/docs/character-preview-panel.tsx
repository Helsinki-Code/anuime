"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { useState, type CSSProperties } from "react";

import {
  isRegistryPreviewItem,
  registryPreviewCharacters,
  registryPreviewConstruction,
  type RegistryPreviewCharacter,
  type RegistryPreviewItem,
} from "@/lib/anuime/registry-preview-pilot";

import { Preview as AccordionPreview } from "../../../registry/items/components/anuime-accordion/_preview";
import { Preview as AlertDialogPreview } from "../../../registry/items/components/anuime-alert-dialog/_preview";
import { Preview as AlertPreview } from "../../../registry/items/components/anuime-alert/_preview";
import { Preview as AspectRatioPreview } from "../../../registry/items/components/anuime-aspect-ratio/_preview";
import { Preview as AvatarPreview } from "../../../registry/items/components/anuime-avatar/_preview";
import { Preview as BadgePreview } from "../../../registry/items/components/anuime-badge/_preview";
import { Preview as BreadcrumbPreview } from "../../../registry/items/components/anuime-breadcrumb/_preview";
import { Preview as ButtonGroupPreview } from "../../../registry/items/components/anuime-button-group/_preview";
import { Preview as ButtonPreview } from "../../../registry/items/components/anuime-button/_preview";
import { Preview as CalendarPreview } from "../../../registry/items/components/anuime-calendar/_preview";
import { Preview as CardPreview } from "../../../registry/items/components/anuime-card/_preview";
import { Preview as CheckboxPreview } from "../../../registry/items/components/anuime-checkbox/_preview";
import { Preview as CollapsiblePreview } from "../../../registry/items/components/anuime-collapsible/_preview";
import { Preview as ComboboxPreview } from "../../../registry/items/components/anuime-combobox/_preview";
import { Preview as CommandPalettePreview } from "../../../registry/items/components/anuime-command-palette/_preview";
import { Preview as ContextMenuPreview } from "../../../registry/items/components/anuime-context-menu/_preview";
import { Preview as DataTablePreview } from "../../../registry/items/components/anuime-data-table/_preview";
import { Preview as DateControlPreview } from "../../../registry/items/components/anuime-date-control/_preview";
import { Preview as DialogPreview } from "../../../registry/items/components/anuime-dialog/_preview";
import { Preview as DrawerPreview } from "../../../registry/items/components/anuime-drawer/_preview";
import { Preview as DropdownMenuPreview } from "../../../registry/items/components/anuime-dropdown-menu/_preview";
import { Preview as EmptyStatePreview } from "../../../registry/items/components/anuime-empty-state/_preview";
import { Preview as FieldPreview } from "../../../registry/items/components/anuime-field/_preview";
import { Preview as HoverCardPreview } from "../../../registry/items/components/anuime-hover-card/_preview";
import { Preview as InputGroupPreview } from "../../../registry/items/components/anuime-input-group/_preview";
import { Preview as InputOtpPreview } from "../../../registry/items/components/anuime-input-otp/_preview";
import { Preview as InputPreview } from "../../../registry/items/components/anuime-input/_preview";
import { Preview as KbdPreview } from "../../../registry/items/components/anuime-kbd/_preview";
import { Preview as MenubarPreview } from "../../../registry/items/components/anuime-menubar/_preview";
import { Preview as NavigationMenuPreview } from "../../../registry/items/components/anuime-navigation-menu/_preview";
import { Preview as PaginationPreview } from "../../../registry/items/components/anuime-pagination/_preview";
import { Preview as PopoverPreview } from "../../../registry/items/components/anuime-popover/_preview";
import { Preview as ProgressPreview } from "../../../registry/items/components/anuime-progress/_preview";
import { Preview as RadioGroupPreview } from "../../../registry/items/components/anuime-radio-group/_preview";
import { Preview as ScrollAreaPreview } from "../../../registry/items/components/anuime-scroll-area/_preview";
import { Preview as SelectPreview } from "../../../registry/items/components/anuime-select/_preview";
import { Preview as SeparatorPreview } from "../../../registry/items/components/anuime-separator/_preview";
import { Preview as SheetPreview } from "../../../registry/items/components/anuime-sheet/_preview";
import { Preview as SidebarPreview } from "../../../registry/items/components/anuime-sidebar/_preview";
import { Preview as SkeletonPreview } from "../../../registry/items/components/anuime-skeleton/_preview";
import { Preview as SliderPreview } from "../../../registry/items/components/anuime-slider/_preview";
import { Preview as SpinnerPreview } from "../../../registry/items/components/anuime-spinner/_preview";
import { Preview as SwitchPreview } from "../../../registry/items/components/anuime-switch/_preview";
import { Preview as TablePreview } from "../../../registry/items/components/anuime-table/_preview";
import { Preview as TabsPreview } from "../../../registry/items/components/anuime-tabs/_preview";
import { Preview as TextareaPreview } from "../../../registry/items/components/anuime-textarea/_preview";
import { Preview as ToastPreview } from "../../../registry/items/components/anuime-toast/_preview";
import { Preview as TogglePreview } from "../../../registry/items/components/anuime-toggle/_preview";
import { Preview as ToolbarPreview } from "../../../registry/items/components/anuime-toolbar/_preview";
import { Preview as TooltipPreview } from "../../../registry/items/components/anuime-tooltip/_preview";
import { Preview as TypographyPreview } from "../../../registry/items/components/anuime-typography/_preview";

type CharacterPreviewPanelProps = {
  itemName: string;
};

type PreviewMotionStyle = CSSProperties & {
  "--anuime-preview-duration": string;
  "--anuime-preview-timing": string;
};

const characters = ["kira", "mochi", "atlas"] as const;

export function CharacterPreviewPanel({ itemName }: CharacterPreviewPanelProps) {
  const [character, setCharacter] = useState<RegistryPreviewCharacter>("kira");

  if (!isRegistryPreviewItem(itemName)) return null;

  const system = registryPreviewCharacters[character];
  const construction = registryPreviewConstruction[itemName][character];
  const motionStyle: PreviewMotionStyle = {
    "--anuime-preview-duration": `${system.transitionMs}ms`,
    "--anuime-preview-timing": system.transitionTiming,
  };

  return (
    <section
      data-character-preview-panel
      data-preview-character={character}
      data-frame-law={system.frameLaw}
      data-transition-ms={system.transitionMs}
      className="flex flex-col gap-4"
    >
      <div
        role="group"
        aria-label="Preview character"
        className="grid grid-cols-3 overflow-hidden rounded-[var(--anuime-control-radius,6px)] border bg-background sm:inline-grid sm:w-fit"
      >
        {characters.map((candidate) => {
          const candidateSystem = registryPreviewCharacters[candidate];
          const selected = candidate === character;

          return (
            <button
              key={candidate}
              type="button"
              aria-pressed={selected}
              data-preview-character-option={candidate}
              onClick={() => setCharacter(candidate)}
              className="min-h-9 border-r px-4 text-sm font-medium transition-colors last:border-r-0 hover:bg-accent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {candidateSystem.label}
            </button>
          );
        })}
      </div>

      <div
        data-character-preview-frame
        className={`anuime-system anuime-system-${character} relative isolate overflow-hidden border border-[var(--border)] bg-[var(--anuime-surface)] text-foreground shadow-[0_24px_80px_-60px_color-mix(in_oklab,var(--foreground)_60%,transparent)]`}
        style={motionStyle}
      >
        <FrameMotif character={character} />

        <div
          data-character-preview-header
          className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-6 ${
            character === "kira"
              ? "bg-[var(--anuime-surface)] dark:bg-[var(--anuime-elevated)]"
              : "bg-[var(--anuime-surface)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <CharacterMark character={character} />
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase">
              Live component specimen
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            {system.label} · {system.adjective}
          </span>
        </div>

        <div
          key={character}
          data-character-preview-stage
          className="anuime-docs-character-enter relative z-10 grid min-h-72 place-items-center bg-[var(--background)] p-5 sm:p-8"
        >
          <div className="w-full max-w-3xl">
            <CharacterSpecimen itemName={itemName} character={character} />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--anuime-surface)] px-4 py-2.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase sm:px-6">
          <span>{system.frameLabel}</span>
          <span>
            {system.frameLaw} · {system.transitionMs}ms
          </span>
        </div>
      </div>

      <div className={`anuime-system anuime-system-${character}`}>
        <div className="border border-[var(--border)] bg-[var(--anuime-surface)] p-5 text-foreground sm:p-6">
          <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Character construction
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 font-semibold">
            {construction.headline}
          </p>
          <details className="group mt-4 border-t border-[var(--border)] pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-muted-foreground marker:content-none">
              How this is built
              <IconChevronDown
                aria-hidden="true"
                className="size-4 transition-transform group-open:rotate-180"
              />
            </summary>
            <p
              data-construction-provenance
              className="mt-3 max-w-3xl font-mono text-xs leading-6 text-muted-foreground"
            >
              {construction.provenance}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

function CharacterSpecimen({
  itemName,
  character,
}: {
  itemName: RegistryPreviewItem;
  character: RegistryPreviewCharacter;
}) {
  if (itemName === "anuime-accordion") return <AccordionPreview character={character} />;
  if (itemName === "anuime-alert") return <AlertPreview character={character} />;
  if (itemName === "anuime-alert-dialog") {
    return <AlertDialogPreview character={character} />;
  }
  if (itemName === "anuime-aspect-ratio") {
    return <AspectRatioPreview character={character} />;
  }
  if (itemName === "anuime-avatar") return <AvatarPreview character={character} />;
  if (itemName === "anuime-badge") return <BadgePreview character={character} />;
  if (itemName === "anuime-breadcrumb") return <BreadcrumbPreview character={character} />;
  if (itemName === "anuime-button") return <ButtonPreview character={character} />;
  if (itemName === "anuime-button-group") {
    return <ButtonGroupPreview character={character} />;
  }
  if (itemName === "anuime-calendar") return <CalendarPreview character={character} />;
  if (itemName === "anuime-card") return <CardPreview character={character} />;
  if (itemName === "anuime-checkbox") return <CheckboxPreview character={character} />;
  if (itemName === "anuime-collapsible") {
    return <CollapsiblePreview character={character} />;
  }
  if (itemName === "anuime-combobox") return <ComboboxPreview character={character} />;
  if (itemName === "anuime-command-palette") {
    return <CommandPalettePreview character={character} />;
  }
  if (itemName === "anuime-context-menu") {
    return <ContextMenuPreview character={character} />;
  }
  if (itemName === "anuime-data-table") return <DataTablePreview character={character} />;
  if (itemName === "anuime-date-control") {
    return <DateControlPreview character={character} />;
  }
  if (itemName === "anuime-dialog") return <DialogPreview character={character} />;
  if (itemName === "anuime-drawer") return <DrawerPreview character={character} />;
  if (itemName === "anuime-dropdown-menu") return <DropdownMenuPreview character={character} />;
  if (itemName === "anuime-empty-state") {
    return <EmptyStatePreview character={character} />;
  }
  if (itemName === "anuime-field") return <FieldPreview character={character} />;
  if (itemName === "anuime-hover-card") {
    return <HoverCardPreview character={character} />;
  }
  if (itemName === "anuime-input-group") {
    return <InputGroupPreview character={character} />;
  }
  if (itemName === "anuime-input-otp") {
    return <InputOtpPreview character={character} />;
  }
  if (itemName === "anuime-input") return <InputPreview character={character} />;
  if (itemName === "anuime-kbd") return <KbdPreview character={character} />;
  if (itemName === "anuime-menubar") return <MenubarPreview character={character} />;
  if (itemName === "anuime-navigation-menu") {
    return <NavigationMenuPreview character={character} />;
  }
  if (itemName === "anuime-pagination") {
    return <PaginationPreview character={character} />;
  }
  if (itemName === "anuime-popover") return <PopoverPreview character={character} />;
  if (itemName === "anuime-progress") return <ProgressPreview character={character} />;
  if (itemName === "anuime-radio-group") {
    return <RadioGroupPreview character={character} />;
  }
  if (itemName === "anuime-scroll-area") {
    return <ScrollAreaPreview character={character} />;
  }
  if (itemName === "anuime-select") return <SelectPreview character={character} />;
  if (itemName === "anuime-separator") {
    return <SeparatorPreview character={character} />;
  }
  if (itemName === "anuime-sheet") return <SheetPreview character={character} />;
  if (itemName === "anuime-sidebar") return <SidebarPreview character={character} />;
  if (itemName === "anuime-skeleton") return <SkeletonPreview character={character} />;
  if (itemName === "anuime-slider") return <SliderPreview character={character} />;
  if (itemName === "anuime-spinner") return <SpinnerPreview character={character} />;
  if (itemName === "anuime-switch") return <SwitchPreview character={character} />;
  if (itemName === "anuime-table") return <TablePreview character={character} />;
  if (itemName === "anuime-tabs") return <TabsPreview character={character} />;
  if (itemName === "anuime-textarea") return <TextareaPreview character={character} />;
  if (itemName === "anuime-toast") return <ToastPreview character={character} />;
  if (itemName === "anuime-toggle") return <TogglePreview character={character} />;
  if (itemName === "anuime-toolbar") return <ToolbarPreview character={character} />;
  if (itemName === "anuime-tooltip") return <TooltipPreview character={character} />;
  return <TypographyPreview character={character} />;
}

function CharacterMark({ character }: { character: RegistryPreviewCharacter }) {
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className="h-3 w-4 bg-[linear-gradient(114deg,transparent_0_38%,var(--anuime-accent)_38%_45%,transparent_45%_58%,var(--border)_58%_65%,transparent_65%)]"
      />
    );
  }

  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className="size-4 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--anuime-accent)_50%,transparent)_0,transparent_68%)]"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-3 border-t-2 border-l-2 border-[var(--anuime-accent)]"
    />
  );
}

function FrameMotif({ character }: { character: RegistryPreviewCharacter }) {
  if (character === "kira") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(114deg,transparent_0_68%,var(--anuime-accent)_68%_68.5%,transparent_68.5%_73%,var(--border)_73%_73.5%,transparent_73.5%)] bg-[length:9rem_6rem] [background-position:right_top] bg-no-repeat"
      />
    );
  }

  if (character === "mochi") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--anuime-accent)_22%,transparent)_0,transparent_44%)] shadow-[inset_0_1px_var(--anuime-secondary-accent)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-1.5 z-20">
      <Bracket className="top-0 left-0 border-t-2 border-l-2" />
      <Bracket className="top-0 right-0 border-t-2 border-r-2" />
      <Bracket className="bottom-0 left-0 border-b-2 border-l-2" />
      <Bracket className="right-0 bottom-0 border-r-2 border-b-2" />
    </div>
  );
}

function Bracket({ className }: { className: string }) {
  return (
    <span
      className={`absolute size-4 border-[var(--anuime-accent)] ${className}`}
      aria-hidden="true"
    />
  );
}
