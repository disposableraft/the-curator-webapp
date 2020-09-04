import { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import { exec } from "child_process";
import names from "../../lib/names.json";

const execPromise = util.promisify(exec);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = req.body.name;
  try {
    if (names.indexOf(input) < 0) {
      throw new Error(`${input} not in names`);
    }
    const { stdout, stderr } = await execPromise(
      `python python/resolver.py "${input}"`
    );
    if (stderr) {
      res.json({ error: stderr });
    } else {
      res.json(stdout);
    }
  } catch (error) {
    res.json({ error: error });
  }
};

export default handler;
