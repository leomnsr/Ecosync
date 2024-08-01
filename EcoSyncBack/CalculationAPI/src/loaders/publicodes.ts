import rules from "@incubateur-ademe/nosgestesclimat";
import Engine from "publicodes";

const engine = new Engine(rules);

export const getEngine = (): Engine => {
  return engine.shallowCopy();
};
