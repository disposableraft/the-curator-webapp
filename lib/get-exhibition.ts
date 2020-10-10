import { getCachedResult } from "./cached-results";
import { SearchResult } from "./fetch-images";

// Get around TS `moduleResolution`
const top12Map = require("./top_12_map.json");

export interface Exhibition {
  artists: {
    name: string;
    searchResult: SearchResult;
  }[];
  subject: string;
}

/**
 * Given a subject, get the 12 most similar artists according to the model
 * @param name The name of the subject
 */
const getExhibition = (name: string): Exhibition => {
  let model: Map<string, string[]> = new Map(Object.entries(top12Map));

  const artistNames = model.get(name);

  if (model.has(name) && artistNames !== undefined) {
    const artistData = artistNames.map((name) => {
      const cache = getCachedResult(name);
      const data: SearchResult = JSON.parse(cache);
      return { name: name, searchResult: data };
    });

    return { subject: name, artists: artistData };
  }

  throw new Error(`Error getting Exhibitions for "${name}"`);
};

export { getExhibition };
