import { rest } from "msw";
import quotaError from "./api/quota-error.json";
import searchResult from "./api/post-mock-data.json";

/**
 * Respond to requests by defining handlers that match specific requests
 */
const handlers = [
  rest.get("http://localhost:3000/api/search", (req, res, ctx) => {
    const name = req.url.searchParams.get("name");
    // Define name as quota_error to test for this response.
    if (name === "quota_error") {
      return res(ctx.json(quotaError));
    } else {
      return res(ctx.json(searchResult.items[0]));
    }
  }),
];

export { handlers };
