import { NextApiRequest, NextApiResponse } from "next";

// Get around TS `moduleResolution`
const top12Map = require("../../lib/top_12_map.json");
let model: Map<string, string[]>;
model = new Map(Object.entries(top12Map));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const input: string = req.body.name;
  try {
    if (!model.has(input)) {
      throw new Error(`"${input}" not in model`);
    }
    const result = model.get(input);
    res.json({ name: input, artists: result });
  } catch (error) {
    res.json({ error: error });
  }
};

export default handler;
