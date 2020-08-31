import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

type Params = {
  [propName: string]: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { serverRuntimeConfig } = getConfig();
  console.debug(serverRuntimeConfig);
  const url = new URL(serverRuntimeConfig.googleSearchUrl as string);
  const name = req.query.name as string;
  const params: Params = {
    q: name,
    searchType: "image",
    key: serverRuntimeConfig.googleSearchKey as string,
    cx: serverRuntimeConfig.googleSearchCx as string,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const response = await fetch(url.href);
  const data = await response.json();
  res.json({
    title: data.items[0].title,
    link: data.items[0].link,
    thumbnailLink: data.items[0].image.thumbnailLink,
    thumbnailHeight: data.items[0].image.thumbnailHeight,
    thumbnailWidth: data.items[0].image.thumbnailWidth,
  });
};

export default handler;
