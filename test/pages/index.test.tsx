import Home from "../../pages/index";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const exhibitionResult = {
  name: "Pablo",
  artists: ["a", "b", "c", "d", "e"],
};

const searchResult = {
  link: "http://example.com/image.jpg?sha=1234",
  title: "An alt title of staggering beauty",
};

const server = setupServer(
  rest.post("http://localhost:3000/api/post", (req, res, ctx) => {
    return res(ctx.json(exhibitionResult));
  }),
  rest.get("http://localhost:3000/api/search", (req, res, ctx) => {
    return res(ctx.json(searchResult));
  })
);

describe("Home without form input", () => {
  it("displays the autocomplete", () => {
    const { getByTestId } = render(<Home />);
    const suggestions = getByTestId("autocomplete-artist");
    expect(suggestions).toBeInTheDocument();
  });

  it("doesn't display the grid", () => {
    const { queryAllByTestId } = render(<Home />);
    const cards = queryAllByTestId("test-card");
    expect(cards).toHaveLength(0);
  });
});

describe("Home with form input", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders N divs with data-testid=test-card", async () => {
    render(<Home />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Pablo" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    await waitFor(() => {
      screen.getAllByTestId("test-card");
    });
    const cards = await screen.findAllByTestId("test-card");
    expect(cards).toHaveLength(5);
  });

  it("renders the name that the user selected", async () => {
    render(<Home />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Pablo" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    await waitFor(() => {
      screen.getAllByTestId("test-card");
    });
    const heading = await screen.findByRole("banner");
    expect(heading).toHaveTextContent(/Pablo/g);
  });

  xit("does not display the autocomplete", async () => {
    render(<Home />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Pablo" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    await waitForElementToBeRemoved(field);
  });
});
