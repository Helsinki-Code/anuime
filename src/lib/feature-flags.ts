export const featureFlags = {
  studioV2: import.meta.env.VITE_FEATURE_STUDIO_V2 !== "false",
  illustratedCast: import.meta.env.VITE_FEATURE_ILLUSTRATED_CAST !== "false",
  aiDirector: import.meta.env.VITE_FEATURE_AI_DIRECTOR === "true",
  galleryPublish: import.meta.env.VITE_FEATURE_GALLERY_PUBLISH === "true",
} as const;
