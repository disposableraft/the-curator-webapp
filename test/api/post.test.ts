import http from "http";
import fetch from "isomorphic-unfetch";
import { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import handler from "../../pages/api/post";
import listen from "test-listen";

let server: http.Server;
let url: string;

describe("api/post", () => {
  beforeEach(async () => {
    const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
      return apiResolver(
        req,
        res,
        undefined,
        handler,
        {
          previewModeId: "",
          previewModeEncryptionKey: "",
          previewModeSigningKey: "",
        },
        false
      );
    };
    server = http.createServer(requestHandler);
    url = await listen(server);
  });

  afterEach(() => {
    server.close();
  });

  it("responds with 200", async () => {
    const response = await fetch(url);
    expect(response.status).toBe(200);
  });

  it("responds with expected JSON from server", async () => {
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
  });
});
