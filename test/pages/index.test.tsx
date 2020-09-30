import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home component", () => {
  it("displays the autocomplete", () => {
    render(<Home />);
    const autocomplete = screen.getByTestId("autocomplete-artist");
    expect(autocomplete).toBeInTheDocument();
  });
});
