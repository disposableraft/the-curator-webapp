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
});

describe("Home with form input", () => {
  beforeEach(() => {
    fetchCollection.mockImplementation(() => {
      return Promise.resolve({
        name: "Helen Pablo",
        artists: ["card0", "card1", "card2", "card3", "card4"],
      });
    });
  });

  it("renders 5 Cards", async () => {
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

  it("does not display the autocomplete", async () => {
    render(<Home />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Pablo" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    waitForElementToBeRemoved(() =>
      screen.queryByTestId("autocomplete-artist")
    );
  });
});
