import { getEngine } from "../loaders/publicodes";
import { GasType, GasInput } from "../models/gas-input";

function getFrenchGasAverage(gasType: GasType): Number {
  const engine = getEngine();

  switch (gasType) {
    case "network":
      engine.setSituation({
        "logement . chauffage . gaz . présent": "oui",
        "logement . habitants": 1,
      });
      break;
    case "bottle":
      engine.setSituation({
        "logement . chauffage . bouteille gaz . présent": "oui",
        "logement . habitants": 1,
      });
      break;
    case "propane":
      engine.setSituation({
        "logement . chauffage . citerne propane . présent": "oui",
        "logement . habitants": 1,
      });
      break;
  }

  return engine.evaluate("logement . chauffage").nodeValue as Number;
}

function computeGasConsumption(input: GasInput): Number {
  const engine = getEngine();

  engine.setSituation({ "logement . habitants": 1 });
  let consumption = input.consumption_kwh;
  switch (input.source) {
    case "network":
      engine.setSituation({
        "logement . chauffage . gaz . présent": "oui",
        "logement . chauffage . gaz . consommation": consumption,
        "logement . habitants": 1,
      });
      break;
    case "bottle":
      engine.setSituation({
        "logement . chauffage . bouteille gaz . présent": "oui",
        "logement . habitants": 1,
      });
      // TODO: Implement this
      break;
    case "propane":
      engine.setSituation({
        "logement . chauffage . citerne propane . présent": "oui",
        "logement . habitants": 1,
      });
      // TODO: Implement this
      break;
  }

  return engine.evaluate("logement . chauffage").nodeValue as Number;
}
export { getFrenchGasAverage, computeGasConsumption };
