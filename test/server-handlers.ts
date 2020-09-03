import { rest } from "msw";
import post from "../pages/api/post";

const exhibitionResult = {
  name: "Pablo",
  artists: ["a", "b", "c", "d", "e"],
};

const searchResult = {
  link: "http://example.com/image.jpg?sha=1234",
  title: "An alt title of staggering beauty",
};

const handlers = [
  rest.post("http://localhost:3000/api/post", async (req, res, ctx) => {
    const exhibitionResult = await ctx.fetch(req);
    return res(ctx.json(exhibitionResult));
  }),
  rest.get("http://localhost:3000/api/search", (req, res, ctx) => {
    return res(ctx.json(searchResult));
  }),
];

export { handlers };
