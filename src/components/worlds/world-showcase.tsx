import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { worldIds, worlds } from "@/lib/anuime/worlds";
import type { WorldId, WorldTheme } from "@/lib/anuime/worlds";

import { ExperienceControls } from "./experience-provider";
import { WorldStage } from "./world-stage";

export function WorldShowcase() {
  const [worldId, setWorldId] = useState<WorldId>("kira");
  const [theme, setTheme] = useState<WorldTheme>("dark");
  const [complete, setComplete] = useState<Record<WorldId, boolean>>({
    kira: false,
    mochi: false,
    atlas: false,
  });
  const world = worlds[worldId];
  return (
    <WorldStage worldId={worldId} theme={theme}>
      <div className="world-showcase-top">
        <div className="world-selector" role="group" aria-label="Choose a character world">
          {worldIds.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={worldId === id}
              onClick={() => setWorldId(id)}
            >
              <span>{worlds[id].character}</span>
              <small>{worlds[id].name}</small>
            </button>
          ))}
        </div>
        <button
          className="world-theme-button"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Day lighting" : "Night lighting"}
        </button>
      </div>
      <div className="world-showcase-body">
        <div className="world-showcase-copy">
          <p className="world-eyebrow">React components. Three character worlds.</p>
          <h1>
            Build something
            <br />
            <em>with character.</em>
          </h1>
          <p className="world-showcase-description">
            {world.description} Explore expressive interfaces, shape your own scene, and take the
            source with you.
          </p>
          <div className="world-showcase-actions">
            <Link to="/studio" className="world-primary-action">
              Open Studio <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/$section"
              params={{ section: "components" }}
              className="world-secondary-action"
            >
              Browse components
            </Link>
          </div>
          <div className="world-task-panel">
            <div className="world-task-heading">
              <span className="world-eyebrow">{world.flagship.name}</span>
              <span>Live sample</span>
            </div>
            <h2>
              {worldId === "kira"
                ? "A new signal is ready."
                : worldId === "mochi"
                  ? "Your next idea starts here."
                  : "Keep the system moving."}
            </h2>
            <p>{world.flagship.task}</p>
            <div className="world-task-status">
              <span>
                {worldId === "kira"
                  ? "Release 02.4"
                  : worldId === "mochi"
                    ? "Moonlight collection"
                    : "Task AT-104"}
              </span>
              <span>{complete[worldId] ? "Complete" : "Ready for review"}</span>
            </div>
            <button
              type="button"
              disabled={complete[worldId]}
              onClick={() => setComplete((previous) => ({ ...previous, [worldId]: true }))}
            >
              {complete[worldId] ? "Completed" : world.flagship.action}
            </button>
            <p className="world-task-result" role="status">
              {complete[worldId]
                ? world.flagship.confirmation
                : "Try the interaction. This sample stays on your device."}
            </p>
            {complete[worldId] && (
              <button
                type="button"
                className="world-task-reset"
                onClick={() => setComplete((previous) => ({ ...previous, [worldId]: false }))}
              >
                Reset sample
              </button>
            )}
          </div>
        </div>
        <div className="world-location" aria-hidden="true">
          <span>0{worldIds.indexOf(worldId) + 1} / WORLD</span>
          <strong>{world.name}</strong>
          <span>{world.location}</span>
        </div>
      </div>
      <ExperienceControls />
    </WorldStage>
  );
}
