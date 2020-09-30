// Get around TS `moduleResolution`
const top12Map = require("./top_12_map.json");

export interface Collection {
  artists: string[];
  name: string;
}

const getCollection = (name: string): Collection => {
  let model: Map<string, string[]>;
  model = new Map(Object.entries(top12Map));

  const artists = model.get(name);

  if (model.has(name) && artists !== undefined) {
    return { name: name, artists: artists };
  }

  throw new Error(`Error getting collections for "${name}"`);
};

export { getCollection };
