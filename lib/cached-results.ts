import fs from "fs";
import path from "path";

const getHandle = (searchTerm: string): string => {
  const pwd = process.env.PWD as string;
  const cacheDir = path.resolve(pwd, "search-results-cache");
  const filename = `${searchTerm.replace(/\s/g, "")}.json`;
  return path.join(cacheDir, filename);
};

export const getCachedResult = (
  searchTerm: string,
  callback: (err: NodeJS.ErrnoException | null, json: string) => void
) => {
  const handle = getHandle(searchTerm);
  fs.readFile(handle, "utf8", (err, json) => {
    callback(err, json);
    console.log(`Using cache ${searchTerm}.`);
  });
};

export const setCachedResult = (searchTerm: string, data: string) => {
  const handle = getHandle(searchTerm);
  fs.writeFile(handle, JSON.stringify(data), "utf8", (err) => {
    if (err) throw err;
    console.log(`Cache for ${searchTerm} updated.`);
  });
};
