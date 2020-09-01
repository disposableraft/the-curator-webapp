import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { getCachedResult, setCachedResult } from "../../lib/cached-results";

type Params = {
  [propName: string]: string;
};

const search = async (term: string, serverRuntimeConfig: Params) => {
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
  const response = await fetch(url.href);
  return response.json();
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { serverRuntimeConfig } = getConfig();
  const name = req.query.name as string;

  getCachedResult(name, (err, cache) => {
    if (err) {
      search(name, serverRuntimeConfig)
        .then((data) => {
          setCachedResult(name, data);
          res.json(data.items[0]);
        })
        .catch((err) => {
          console.debug(err);
        });
    } else {
      res.json(JSON.parse(cache).items[0]);
    }
  });
};

export default handler;
