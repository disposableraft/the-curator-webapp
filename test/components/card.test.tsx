import { render, screen } from "@testing-library/react";
import Card from "../../components/card";

describe("Card", () => {
  it("renders a card", () => {
    render(<Card artist="foo name" />);
    const card = screen.getByTestId("test-card");
    expect(card).toHaveClass("card");
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("foo name");
  });
});
