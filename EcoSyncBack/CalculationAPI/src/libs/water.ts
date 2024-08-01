import { getEngine } from "../loaders/publicodes";

let occupants = 1;

// Surface area of the house, must find the mean value for France
let surface = 60;

let waterConsumption = 80 * 365;

const engine = getEngine();

// Get the water consumption of a house
function getWaterConsumption(waterConsuption: number): number {
  const waterFactor: number = engine.evaluate(
    "logement . eau . impact par litre froid",
  ).nodeValue as number;
  return waterFactor * waterConsuption;
}

// Get the water consumption per person
function getWaterConsumptionByOccupants(
  numberOfOccupants: number,
  waterConsumption: number,
): number {
  occupants = numberOfOccupants;
  return getWaterConsumption(waterConsumption) / occupants;
}

// Display the water consumption of a house
function waterToString() {
  console.log(
    "Water consumption is " +
      getWaterConsumption(waterConsumption) +
      " kgCO2e per year for a house of " +
      surface +
      " m² and " +
      occupants +
      " occupants",
  );

  console.log(
    "So the water consumption per personn is " +
      getWaterConsumptionByOccupants(occupants, waterConsumption) +
      " kgCO2e per year",
  );
}

export { getWaterConsumption, getWaterConsumptionByOccupants, waterToString };
