import { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import { exec } from "child_process";

const execPromise = util.promisify(exec);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = req.body.name;
  if (input === undefined) {
    res.json({ error: "Name is undefined" });
    return;
  }
  // Replace all non-letter-or-number chars with space, and trim.
  const name = input.replace(/\W/g, " ").trim();
  try {
    const { stdout, stderr } = await execPromise(
      `python python/resolver.py "${name}"`
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
