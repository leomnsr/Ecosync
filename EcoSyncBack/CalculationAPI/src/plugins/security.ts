import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const security = new Elysia()
  .state("userId", 0)
  .use(bearer())
  .use(
    jwt({
      secret: process.env.JWT_SECRET as string,
      iss: process.env.JWT_ISSUER as string,
      aud: process.env.JWT_AUDIENCE as string,
    }),
  )
  .decorate("authorize", async ({ bearer, jwt, set, store }) => {
    let sub = await jwt.verify(bearer);
    if (!bearer || !sub) {
      set.status = 401;
      set.headers["WWW-Authenticate"] = "Bearer";
      return { message: "Unauthorized" };
    }
    store.userId = Number(sub.unique_name);
  });
