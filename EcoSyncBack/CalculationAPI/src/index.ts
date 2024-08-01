import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { endpoints } from "./controllers";

const app = new Elysia()
  .use(
    swagger({
      autoDarkMode: false,
      path: "/api/calculation",
      // temp fix because of bug ub elysiajs/swagger: see https://github.com/elysiajs/elysia-swagger/issues/97
      swaggerOptions: {
        url: "/api/calculation/json",
      },
      exclude: ["/api/calculation/json", "/api/calculation"],
      provider: "swagger-ui",
      documentation: {
        components: {
          securitySchemes: {
            bearer: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
        security: [
          {
            bearer: [],
          },
        ],
        info: {
          title: "Consumption API",
          version: "1.0.0",
        },
        tags: [
          { name: "Electricity", description: "Electricity related endpoints" },
          { name: "Gas", description: "Gas related endpoints" },
        ],
      },
    }),
  )
  .use(endpoints)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
