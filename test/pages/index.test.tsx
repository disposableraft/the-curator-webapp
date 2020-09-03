import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../../pages/index";
import { fetchCollection } from "../../lib/fetch-collection";

jest.mock("../../lib/fetch-collection");

describe("Home without form input", () => {
  it("displays the autocomplete", () => {
    render(<Home />);
    const autocomplete = screen.getByTestId("autocomplete-artist");
    expect(autocomplete).toBeInTheDocument();
  });

  it("doesn't display the grid", () => {
    render(<Home />);
    const cards = screen.queryAllByTestId("test-card");
    expect(cards).toHaveLength(0);
  });

  it("a reset button is not displayed", () => {
    render(<Home />);
    const reset = screen.queryByRole("button", { name: /x/i });
    expect(reset).not.toBeInTheDocument();
  });
});

describe("Home with form input", () => {
  beforeEach(async () => {
    fetchCollection.mockImplementation(() => {
      return Promise.resolve({
        name: "Helen Pablo",
        artists: ["card0", "card1", "card2", "card3", "card4"],
      });
    });
    render(<Home />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Pablo" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    await waitFor(() => {
      screen.getAllByTestId("test-card");
    });
  });

  it("renders 5 Cards", async () => {
    const cards = await screen.findAllByTestId("test-card");
    expect(cards).toHaveLength(5);
  });

  it("renders the name that the user selected", async () => {
    const heading = await screen.findByRole("banner");
    expect(heading).toHaveTextContent(/Pablo/g);
  });

  it("does not display the autocomplete", async () => {
    const autocomplete = screen.queryByTestId("autocomplete-artist");
    expect(autocomplete).not.toBeInTheDocument();
  });

  it("a reset button is displayed", async () => {
    const reset = await screen.findByRole("button", { name: /x/i });
    expect(reset).toBeInTheDocument();
  });

  it("a reset button restores the page to default state", async () => {
    const reset = await screen.findByRole("button", { name: /x/i });
    fireEvent.click(reset);
    const cards = screen.queryAllByTestId("test-card");
    expect(cards).toHaveLength(0);
  });
});
