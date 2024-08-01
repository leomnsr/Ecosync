import { Elysia } from "elysia";
import {
  computeElectricityConsumption,
  getFrenchElectricityAverage,
} from "../../libs/elec";
import {
  ElectricityInput,
  electricityInputSchema,
} from "../../models/electricity-input";

const electricityEndpoints = new Elysia({ prefix: "/electricity" })
  .get(
    "/average",
    () => {
      let mean = getFrenchElectricityAverage();
      return { electricityAverageKgCO2e: mean };
    },
    { detail: { tags: ["Electricity"] } },
  )
  .post(
    "/compute",
    (context) => {
      return {
        electricityKgCO2e: computeElectricityConsumption(
          context.body as ElectricityInput,
        ),
      };
    },
    {
      body: electricityInputSchema,
      detail: { tags: ["Electricity"] },
    },
  )
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return { message: "Not found" };
  });

export { electricityEndpoints };
