import { Elysia } from "elysia";

const electricityEndpoints = new Elysia({ prefix: "/water" })
  .get(
    "/average",
    () => {
      let mean = getFrenchElectricityAverage();
      return { electricityAverageKgCO2e: mean };
    },
    { detail: { tags: ["Water"] } },
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
      body: electricityInputShema,
      detail: { tags: ["Water"] },
    },
  )
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return { message: "Not found" };
  });

export { electricityEndpoints };
