import Elysia from "elysia";
import { security } from "../../plugins/security";
import { authorize } from "../../hooks/authorize";
import { sync } from "../../libs/sync";

export const syncEndpoint = new Elysia({ prefix: "/sync" }).use(security).get(
  "/",
  async ({ store: { userId } }) => {
    let historyEntry = await sync(userId);
    if (historyEntry === null) {
      return { message: "Could not sync data" };
    }
    return historyEntry;
  },
  {
    ...authorize(),
  },
);
