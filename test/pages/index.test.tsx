import { render, fireEvent, screen, waitFor } from "@testing-library/react";
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
    const reset = screen.queryByRole("button", { name: /reset/i });
    expect(reset).not.toBeInTheDocument();
  });

  it("a help button is not displayed", () => {
    render(<Home />);
    const help = screen.queryByRole("button", { name: /help/i });
    expect(help).not.toBeInTheDocument();
  });

  it("a modal is not displayed", () => {
    render(<Home />);
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
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

  it("does not display the autocomplete", async () => {
    const autocomplete = screen.queryByTestId("autocomplete-artist");
    expect(autocomplete).not.toBeInTheDocument();
  });

  it("a reset button is displayed", async () => {
    const reset = await screen.findByRole("button", { name: /reset/i });
    expect(reset).toBeInTheDocument();
  });

  it("clicking the reset button restores the page to default state", async () => {
    const reset = await screen.findByRole("button", { name: /reset/i });
    fireEvent.click(reset);
    const cards = screen.queryAllByTestId("test-card");
    expect(cards).toHaveLength(0);
  });

  it("a help button is displayed", async () => {
    const help = await screen.findByRole("button", { name: /help/i });
    expect(help).toBeInTheDocument();
  });

  it("clicking the help button toggles a dialog", async () => {
    const help = await screen.findByRole("button", { name: /help/i });
    fireEvent.click(help);
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(/Helen/gi);
    fireEvent.click(help);
    const hiddenModal = screen.queryByRole("dialog");
    expect(hiddenModal).not.toBeInTheDocument();
  });

  it("clicking the help button, then the reset button removes the dialog", async () => {
    const help = await screen.findByRole("button", { name: /help/i });
    fireEvent.click(help);
    const reset = await screen.findByRole("button", { name: /reset/i });
    fireEvent.click(reset);
    const hiddenModal = screen.queryByRole("dialog");
    expect(hiddenModal).not.toBeInTheDocument();
  });
});
