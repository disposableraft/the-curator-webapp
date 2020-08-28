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
    const payload = { name: "Pablo Picasso" };
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    expect(results["name"]).toBe("Pablo Picasso");
    expect(results["artists"].length).toEqual(10);
  });

  it("sanitizes user input and responds with status ok and an error object", async () => {
    const payload = { name: "&& \\& evil command" };
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toHaveProperty("error");
  });

  it("responds with an error when name is undefined", async () => {
    const payload = { name: undefined };
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toHaveProperty("error");
  });
});
