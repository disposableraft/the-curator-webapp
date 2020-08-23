import AutoComplete from "../../components/autocomplete";
import {
  screen,
  render,
  fireEvent,
  findByTestId,
} from "@testing-library/react";

describe("AutoComplete", () => {
  it("renders", () => {
    render(<AutoComplete />);
  });

  it("inputs key strokes", async () => {
    const { container, getByRole, findByTestId } = render(<AutoComplete />);
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const form = await findByTestId("autocomplete-artist");
    expect(form).toHaveFormValues({ artistName: "Helen" });
  });

  it("a list of suggestions is not present initially", () => {
    const { container, queryByTestId } = render(<AutoComplete />);
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("a list of suggestions is present when a value is entered", async () => {
    const { container, getByRole, findByTestId } = render(<AutoComplete />);
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const list = await findByTestId("autosuggestion-list");
    expect(list).not.toBeEmptyDOMElement();
  });
});
