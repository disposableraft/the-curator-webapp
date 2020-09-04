import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { getCachedResult, setCachedResult } from "../../lib/cached-results";

type Params = {
  [propName: string]: string;
};

export const search = async (
  term: string,
  serverRuntimeConfig: Params
): Promise<any> => {
  const url = new URL(serverRuntimeConfig.googleSearchUrl);
  const params: Params = {
    q: term,
    searchType: "image",
    key: serverRuntimeConfig.googleSearchKey,
    cx: serverRuntimeConfig.googleSearchCx,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  console.debug("CSE request for: ", term);
  const response = await fetch(url.href);
  if (!response.ok) {
    console.error(`api/search ${response.statusText}`);
  }
  return response.json();
};

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { serverRuntimeConfig } = getConfig();
  const name = req.query.name as string;

  getCachedResult(name, (err, cache) => {
    if (err) {
      console.debug(`No cache for ${name}`);
      search(name, serverRuntimeConfig)
        .then((data) => {
          if (data.error) {
            console.error(data.error.message);
            res.json(data);
          } else {
            setCachedResult(name, data);
            res.json(data.items[0]);
          }
        })
        .catch((err) => {
          console.debug(err);
          res.json({ error: err });
        });
    } else {
      console.debug(`Using cache for ${name}`);
      res.json(JSON.parse(cache).items[0]);
    }
  });
};

export default handler;
