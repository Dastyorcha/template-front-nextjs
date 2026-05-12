export const LANGUAGES = ["uz", "ru", "en"] as const;

export type FirmLanguage = (typeof LANGUAGES)[number];
