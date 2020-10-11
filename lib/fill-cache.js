const fs = require("fs");
const path = require("path");
const util = require("util");
const fetch = require("isomorphic-unfetch");
const allNames = require("../data/names.json");

const env = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const readdir = util.promisify(fs.readdir);

const pwd = process.env.PWD;
const cacheDir = path.resolve(pwd, "search-results-cache");

/**
 * Get the search term from a saved cache file
 */
const getSearchTerm = (handle) => {
  try {
    const content = fs.readFileSync(handle, "utf8");
    const data = JSON.parse(content);
    return data.queries.request[0].searchTerms;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

/**
 * Returns a list of search results that have already been saved
 */
const getExistingNames = async (dirpath) => {
  let files;
  try {
    files = await readdir(dirpath);
  } catch (error) {
    throw new Error(`Error reading directory: ${error}`);
  }
  return files.map((file) => {
    const handle = path.resolve(dirpath, file);
    return getSearchTerm(handle);
  });
};

/**
 * Filter artist names that do not exist in cacheDir
 */
const symmetricDifference = (names1, names2) => {
  return names2.filter((name) => names1.indexOf(name) < 0);
};

/**
 * Fetch search result from CSE
 */
const fetchResult = async (term) => {
  const url = new URL(process.env.GOOGLE_SEARCH_URL);
  const params = {
    q: term,
    searchType: "image",
    key: process.env.GOOGLE_SEARCH_KEY,
    cx: process.env.GOOGLE_SEARCH_CX,
  };
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  let response;

  try {
    response = await fetch(url.href);
  } catch (error) {
    throw new Error(error);
  }

  if (!response.ok) {
    throw new Error(`Response not OK: "${response.statusText}"`);
  }

  return await response.json();
};

/**
 * Save the search result
 */
const setCachedResult = (searchTerm, data) => {
  let filename = `${searchTerm.replace(/\s/g, "")}.json`;
  filename = path.join(cacheDir, filename);

  fs.writeFile(filename, JSON.stringify(data), "utf8", (err) => {
    if (err) throw err;
    console.log(`Cache for ${searchTerm} saved.`);
  });
};

/**
 * Download a search result each second
 */
const downloadResults = async () => {
  let existingNames;

  try {
    existingNames = await getExistingNames(cacheDir);
  } catch (error) {
    throw new Error(error);
  }

  const namesToFetch = symmetricDifference(existingNames, allNames);
  console.log(`Names to fetch: ${namesToFetch.length}`);
  let index = 0;
  let newSearchResult;

  setInterval(async () => {
    try {
      console.log(`fetching ${index}.) ${namesToFetch[index]}`);
      newSearchResult = await fetchResult(namesToFetch[index]);
    } catch (error) {
      throw new Error(error);
    }

    setCachedResult(namesToFetch[index], newSearchResult);
    index += 1;
  }, 1500);
};

downloadResults();
