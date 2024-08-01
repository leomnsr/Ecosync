import { Elysia } from "elysia";
import { electricityEndpoints } from "./electricity/electricity";
import { gasEndpoints } from "./gas/gas";
import { syncEndpoint } from "./sync/sync";

const endpoints = new Elysia({ prefix: "/api/calculation" })
  .use(electricityEndpoints)
  .use(gasEndpoints)
  .use(syncEndpoint);

export { endpoints };
