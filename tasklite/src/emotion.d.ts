import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      accent: string;
      accentHover: string;
      border: string;
      text: string;
      textMuted: string;
      error: string;
      surface: string;
    };
    spacing: (factor: number) => string; // Судя по использованию spacing(1), это функция
    radius: {
      sm: string;
      md: string;
    };
    font: {
      weight: {
        medium: string | number;
      };
    };
  }
}
