import http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import handler from "../../pages/api/search";
import listen from "test-listen";
import googleImageData from "./post-mock-data.json";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

let server: http.Server;
let url: string;

describe("api/artist", () => {
  beforeEach(async () => {
    fetchMock.resetMocks();

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
    const reqUrl = new URL(url);
    reqUrl.searchParams.append("name", "Helen Frankenthaler");
    const response = await fetch(reqUrl.href);
    expect(response.status).toBe(200);
  });
});
