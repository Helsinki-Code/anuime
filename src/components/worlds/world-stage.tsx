import { Component, lazy, Suspense, useCallback, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { worlds, worldCssVariables } from "@/lib/anuime/worlds";
import type { WorldId, WorldTheme } from "@/lib/anuime/worlds";

import { useExperience } from "./experience-provider";

const WorldCanvas = lazy(() => import("./world-canvas"));

class GraphicsBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** One stage owns one lazy canvas; all task content remains ordinary HTML. */
export function WorldStage({
  worldId,
  theme = "dark",
  children,
  className = "",
}: {
  worldId: WorldId;
  theme?: WorldTheme;
  children: ReactNode;
  className?: string;
}) {
  const world = worlds[worldId];
  const { resolved, reportSlowGraphics } = useExperience();
  const [graphicsFailed, setGraphicsFailed] = useState(false);
  const onFailure = useCallback(() => setGraphicsFailed(true), []);
  return (
    <section
      className={`world-stage ${className}`}
      data-world={worldId}
      data-world-theme={theme}
      style={worldCssVariables(world, theme) as CSSProperties}
    >
      <div className="world-stage-scenery" aria-hidden="true">
        <div className="world-stage-horizon" />
        {resolved.render3d && !graphicsFailed && (
          <GraphicsBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <WorldCanvas
                worldId={worldId}
                theme={theme}
                animate={resolved.animate}
                quality={resolved.quality}
                onFailure={onFailure}
                onSlow={reportSlowGraphics}
              />
            </Suspense>
          </GraphicsBoundary>
        )}
        {resolved.characterVisible && (
          <img
            className="world-stage-character"
            src={world.assets.fallback.src}
            alt=""
            width="1024"
            height="1536"
          />
        )}
        <div className="world-stage-scrim" />
      </div>
      <div className="world-stage-content">{children}</div>
      {graphicsFailed && (
        <p className="world-stage-notice" role="status">
          Graphics are unavailable. Illustrated mode is active; all controls still work.
        </p>
      )}
    </section>
  );
}
