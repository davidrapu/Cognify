import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      text: {
        size: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      mint: {
        100: string;
        200: string;
        300: string;
        400: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      text: {
        size: {
          sm: string;
          md: string;
          lg: string;
        };
      };
      mint: {
        100: string;
        200: string;
        300: string;
        400: string;
      };
    };
  }
}
