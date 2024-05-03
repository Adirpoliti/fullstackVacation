type AppConfigType = {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

export const appConfig: AppConfigType = {
  host: "localhost",
  user: "root",
  password: "",
  database: "books_store",
  port: 3001
}