import { coefType, coeficients } from "../consts/gradeCoeficients";
import { getEngine } from "../loaders/publicodes";
import { ConsumptionsModel } from "../models/db_models/consumptions";
import { HistoryModel } from "../models/db_models/history";
import { HousesModel } from "../models/db_models/houses";
import { history } from "../models/history";

function computeGrade(impact: number, type: coefType): number {
  return Math.floor(coeficients[type] * impact + 100);
}

function createSituation(house: HousesModel, consumption: ConsumptionsModel) {
  let situation = {
    "logement . habitants": house.inhabitants,
    "logement . surface": house.housearea,
    "logement . électricité . consommation": consumption.electricity,
    "logement . chauffage . gaz . présent": "non",
    "logement . chauffage . gaz . consommation": 0,
    "logement . chauffage . bouteille gaz . présent": "non",
    "logement . chauffage . bouteille gaz . consommation": 0,
    "logement . chauffage . bouteille gaz . capacité": 0,
    "logement . chauffage . citerne propane . présent": "non",
    "logement . chauffage . citerne propane . consommation": 0,
  };

  if (consumption.citygas !== 0) {
    situation["logement . chauffage . gaz . présent"] = "oui";
    situation["logement . chauffage . gaz . consommation"] =
      consumption.citygas;
  }

  if (consumption.bottlegas !== 0) {
    situation["logement . chauffage . bouteille gaz . présent"] = "oui";
    situation["logement . chauffage . bouteille gaz . consommation"] =
      consumption.bottlegas;
    situation["logement . chauffage . bouteille gaz . capacité"] =
      consumption.bottlequantity;
  }

  if (consumption.propanegas !== 0) {
    situation["logement . chauffage . citerne propane . présent"] = "oui";
    situation["logement . chauffage . citerne propane . consommation"] =
      consumption.propanegas;
  }

  return situation;
}

export async function sync(userId: number): Promise<history | null> {
  const engine = getEngine();

  const house = await HousesModel.findOne({ where: { userid: userId } });
  const consumption = await ConsumptionsModel.findOne({
    where: { userid: userId },
  });

  if (house === null || consumption === null) {
    return null;
  }

  let situation = createSituation(house, consumption);
  engine.setSituation(situation);

  let electricityImpact = engine.evaluate("logement . électricité")
    .nodeValue as number;
  let gasImpact = engine.evaluate("logement . chauffage").nodeValue as number;
  let electricityGrade = computeGrade(electricityImpact, "electricity");
  let gasGrade = computeGrade(gasImpact, "gas");
  let waterGrade = computeGrade(consumption.water, "water");
  console.log(electricityGrade, gasGrade, waterGrade);

  let grade = Math.floor((electricityGrade + gasGrade + waterGrade) / 3);

  let historyEntry: history = {
    userid: userId,
    electricityimpact: electricityImpact,
    electricitygrade: electricityGrade,
    waterimpact: consumption.water,
    watergrade: waterGrade,
    gasimpact: gasImpact,
    gasgrade: gasGrade,
    grade: grade,
    readingdate: new Date(),
  };

  await HistoryModel.create(historyEntry);

  return historyEntry;
}
