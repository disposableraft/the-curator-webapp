import { render, screen, waitFor } from "@testing-library/react";
import Card from "../../components/card";
import { rest } from "msw";
import { setupServer } from "msw/node";

const payload = {
  title: "A beautiful title on a sunny day, 1900",
  link: "http://example.com/link",
  thumbnailLink: "http://example.com/thumnail-link",
  thumbnailHeight: "100",
  thumbnailWidth: "100",
};

const server = setupServer(
  rest.get("http://localhost:3000/api/artist", (req, res, ctx) => {
    return res(ctx.json(payload));
  })
);

describe("Card", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders a card", async () => {
    render(<Card artist="foo name" />);
    const card = screen.getByTestId("test-card");
    await waitFor(() => {
      screen.getByAltText(payload.title);
    });
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("foo name");
  });
});
