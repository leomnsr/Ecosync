import { Elysia } from "elysia";
import { GasInput, gasInputSchema } from "../../models/gas-input";
import { computeGasConsumption, getFrenchGasAverage } from "../../libs/gas";

const gasEndpoints = new Elysia({ prefix: "/gas" })
  .get(
    "/average",
    () => {
      return { gasAverageKgCO2e: getFrenchGasAverage("network") };
    },
    { detail: { tags: ["Gas"] } },
  )
  .post(
    "/compute",
    (context) => {
      return {
        gasConsumptionKgCO2e: computeGasConsumption(context.body as GasInput),
      };
    },
    {
      body: gasInputSchema,
      detail: { tags: ["Gas"] },
    },
  )
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return { message: "Not found" };
  });

export { gasEndpoints };
