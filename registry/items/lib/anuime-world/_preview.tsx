import { worldIds, worlds } from "./anuime-world";

export function Preview() {
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {worldIds.map((id) => (
        <div key={id} className="rounded-lg border p-4">
          <dt className="font-semibold">
            {worlds[id].character}: {worlds[id].name}
          </dt>
          <dd className="mt-2 text-sm text-muted-foreground">{worlds[id].description}</dd>
        </div>
      ))}
    </dl>
  );
}
