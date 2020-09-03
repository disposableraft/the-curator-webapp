import fetch from "isomorphic-unfetch";

describe("api/search", () => {
  it("responds with 200", async () => {
    const reqUrl = new URL("http://localhost:3000/api/search");
    const response = await fetch(reqUrl.href);
    expect(response.status).toBe(200);
  });
});
