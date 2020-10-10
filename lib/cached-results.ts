import fs from "fs";
import path from "path";

const getHandle = (searchTerm: string): string => {
  const pwd = process.env.PWD as string;
  const cacheDir = path.resolve(pwd, "search-results-cache");
  const filename = `${searchTerm.replace(/\s/g, "")}.json`;
  return path.join(cacheDir, filename);
};

export const getCachedResult = (searchTerm: string) => {
  const handle = getHandle(searchTerm);
  return fs.readFileSync(handle, "utf8");
};

export const setCachedResult = (searchTerm: string, data: string) => {
  const handle = getHandle(searchTerm);
  fs.writeFile(handle, JSON.stringify(data), "utf8", (err) => {
    if (err) throw err;
    console.log(`Cache for ${searchTerm} updated.`);
  });
};
