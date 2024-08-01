import { getEngine } from "../loaders/publicodes";
import { ElectricityInput } from "../models/electricity-input";

function getFrenchElectricityAverage(): Number {
  const engine = getEngine();

  engine.setSituation({ "logement . habitants": 1 });

  return engine.evaluate("logement . électricité").nodeValue as Number;
}

function computeElectricityConsumption(input: ElectricityInput): Number {
  const engine = getEngine();

  engine.setSituation({ "logement . habitants": 1 });

  let consumption = input.consumption_kwh;
  if (
    input.aproximate_expenses_eur !== undefined &&
    consumption === undefined
  ) {
    // TODO: Implement this
  }

  engine.setSituation({ "logement . électricité . consommation": consumption });

  return engine.evaluate("logement . électricité").nodeValue as Number;
}

export { getFrenchElectricityAverage, computeElectricityConsumption };
