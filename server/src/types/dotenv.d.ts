declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test" | "local" | "staging";
    PORT: string;
    ALLOWED_ORIGIN: string;
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
  }
}
