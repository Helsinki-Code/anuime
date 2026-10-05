import { createScene } from "./anuime-scene";
export function Preview() {
  return (
    <pre className="overflow-auto p-4 text-xs">
      {JSON.stringify(createScene("mochi", "example"), null, 2)}
    </pre>
  );
}
