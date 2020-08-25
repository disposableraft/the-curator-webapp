import http from "http";
import fetch from "isomorphic-unfetch";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import handler from "../../pages/api/post";
import listen from "test-listen";
//
describe("api/post", () => {
  it("responds with 200", async () => {
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, handler, "", undefined);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const response = await fetch(url);
    expect(response.status).toBe(200);
    server.close();
  });

  it("responds with expected JSON from server", async () => {
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, handler, "", undefined);
    };
    const server = http.createServer(requestHandler);
    const url = await listen(server);
    const payload = { name: "pablo" };
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const expected = JSON.parse(
      '{"name": "Helen", "artists": ["foo1", "foo2", "foo3"]}'
    );
    expect(await response.json()).toMatchObject(expected);
    server.close();
  });
});
