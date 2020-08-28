import Home from "../../pages/index";
import { render, fireEvent } from "@testing-library/react";

describe("Home without form input", () => {
  it("includes an autocomplete", () => {
    const { container, getByTestId } = render(<Home />);
    const suggestions = getByTestId("autocomplete-artist");
    expect(suggestions).toBeInTheDocument();
  });
});

describe("Home with form input", () => {
  it("renders ten divs with data-testid=test-card", async () => {
    const { container, getByRole, findAllByTestId } = render(<Home />);
    const field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    const cards = await findAllByTestId("test-card");
    expect(cards).toHaveLength(10);
  });
});
