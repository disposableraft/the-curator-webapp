import { render, fireEvent, screen } from "@testing-library/react";
import { Exhibition } from "../../../lib/get-exhibition";
import Exhibitions from "../../../pages/exhibitions/[slug]";
import mockResult from "../../data/search-result.json";

const exhibitionsProps: Exhibition = {
  artists: ["card0", "card1", "card2", "card3", "card4"].map((name) => {
    return { name: name, searchResult: mockResult };
  }),
  subject: "Helen Testenthaler",
};

describe("Exhibitions component default settings", () => {
  it("renders without crashing", () => {
    render(<Exhibitions {...exhibitionsProps} />);
  });

  it("a modal is not displayed", () => {
    render(<Exhibitions {...exhibitionsProps} />);
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });

  it("renders 5 Cards", async () => {
    render(<Exhibitions {...exhibitionsProps} />);
    const cards = await screen.findAllByTestId("test-card");
    // currently rendering 5 missing.jpg cards ...
    expect(cards).toHaveLength(5);
  });

  it("a reset button is displayed", async () => {
    render(<Exhibitions {...exhibitionsProps} />);
    const reset = await screen.findByRole("button", { name: /reset/i });
    expect(reset).toBeInTheDocument();
  });

  it("a help button is displayed", async () => {
    render(<Exhibitions {...exhibitionsProps} />);
    const help = await screen.findByRole("button", { name: /help/i });
    expect(help).toBeInTheDocument();
  });

  it("clicking the help button toggles a dialog", async () => {
    render(<Exhibitions {...exhibitionsProps} />);
    const help = await screen.findByRole("button", { name: /help/i });
    fireEvent.click(help);
    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(/Helen/gi);
    fireEvent.click(help);
    const hiddenModal = screen.queryByRole("dialog");
    expect(hiddenModal).not.toBeInTheDocument();
  });
});
