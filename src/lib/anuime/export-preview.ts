export async function exportPreviewAsPng(element: HTMLElement, filename: string) {
  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const clonedNode = element.cloneNode(true);
  if (!(clonedNode instanceof HTMLElement)) throw new Error("The preview could not be cloned.");
  const clone = clonedNode;
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;
  const imageUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas export is unavailable in this browser.");
    context.scale(2, 2);
    context.drawImage(image, 0, 0, width, height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (value) => (value ? resolve(value) : reject(new Error("PNG export failed."))),
        "image/png",
      );
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener(
      "error",
      () => reject(new Error("The preview could not be rendered as an image.")),
      { once: true },
    );
    image.src = source;
  });
}
