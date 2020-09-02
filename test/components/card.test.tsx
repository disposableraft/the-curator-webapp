import { render, screen, waitFor } from "@testing-library/react";
import Card from "../../components/card";
import { rest } from "msw";
import { setupServer } from "msw/node";

const searchResult = {
  title: "A beautiful title on a sunny day, 1900",
  link: "http://example.com/link",
};

const server = setupServer(
  rest.get("http://localhost:3000/api/search", (req, res, ctx) => {
    return res(ctx.json(searchResult));
  })
);

describe("Card", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders a card", async () => {
    render(<Card artist="foo name" />);
    await waitFor(() => {
      screen.findByTestId("test-card");
    });
    const card = await screen.findByTestId("test-card");
    expect(card).toHaveTextContent("foo name");
  });
});
