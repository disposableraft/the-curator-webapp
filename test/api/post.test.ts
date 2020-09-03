import http from "http";
import fetch from "isomorphic-unfetch";

let server: http.Server;
let url: string;

describe("api/post", () => {
  it("responds with 200", async () => {
    const response = await fetch(url);
    expect(response.status).toBe(200);
  });

  it("responds with expected JSON from server", async () => {
    const payload = { name: "Pablo Picasso" };
    const response = await fetch("http://localhost:3000/api/post", {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    expect(results["name"]).toBe("Pablo Picasso");
    expect(results["artists"].length).toEqual(12);
  });

  it("sanitizes user input and responds with status ok and an error object", async () => {
    const payload = { name: "&& \\& evil command" };
    const response = await fetch("http://localhost:3000/api/post", {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toHaveProperty("error");
  });

  it("responds with an error when name is undefined", async () => {
    const payload = { name: undefined };
    const response = await fetch("http://localhost:3000/api/post", {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok).toBe(true);
    expect(await response.json()).toHaveProperty("error");
  });
});
