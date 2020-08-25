import { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import { exec } from "child_process";

const execPromise = util.promisify(exec);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stdout, stderr } = await execPromise("python python/resolver.py");
  res.json(stdout);
};

export default handler;
