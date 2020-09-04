import { rest } from "msw";
import quotaError from "./api/quota-error.json";
import searchResult from "./api/post-mock-data.json";

const exhibitionResult = {
  name: "Pablo",
  artists: ["a", "b", "c", "d", "e"],
};

const handlers = [
  rest.post("http://localhost:3000/api/post", async (req, res, ctx) => {
    const exhibitionResult = await ctx.fetch(req);
    return res(ctx.json(exhibitionResult));
  }),
  rest.get("http://localhost:3000/api/search", (req, res, ctx) => {
    const name = req.url.searchParams.get("name");
    if (name === "quota_error") {
      return res(ctx.json(quotaError));
    } else {
      return res(ctx.json(searchResult.items[0]));
    }
  }),
];

export { handlers };
