import { t } from "elysia";

type GasType = "network" | "bottle" | "propane";

type GasInput = {
  source: GasType;
  consumption_kwh: number;
};

const gasInputSchema = t.Partial(
  t.Object({
    source: t.Union([
      t.Literal("network"),
      t.Literal("bottle"),
      t.Literal("propane"),
    ]),

    consumption_kwh: t.Number(),
  }),
);

export { gasInputSchema, GasInput, GasType };
