// Language system types
export type LanguageCode = "en" | "vi" | "zh" | "hi";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Translation {
  [key: string]: string;
}
