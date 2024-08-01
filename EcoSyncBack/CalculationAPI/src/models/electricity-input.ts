import { t } from "elysia";

type ElectricityInput = {
  consumption_kwh: number | undefined;
  aproximate_expenses_eur: number | undefined;
};

const electricityInputSchema = t.Partial(
  t.Object({
    consumption_kwh: t.Number(),
    aproximate_expenses_eur: t.Number(),
  }),
);

export { electricityInputSchema, ElectricityInput };
