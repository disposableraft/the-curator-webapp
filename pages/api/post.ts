import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("api/post", res);
  console.log(req.body);
  const result = { name: req.body.name, artists: ["anm1", "name", "name2"] };
  res.json(result);
};

export default handler;
