import AutoComplete from "../../components/autocomplete";
import {
  screen,
  render,
  fireEvent,
  findByTestId,
} from "@testing-library/react";

const suggestions = [
  "Helen Frankenthaler",
  "Pablo Picasso",
  "John Cage",
  "Lee Krasner",
  "George Washington",
];

describe("AutoComplete", () => {
  it("renders", () => {
    render(<AutoComplete suggestions={suggestions} />);
  });

  it("inputs key strokes", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete suggestions={suggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const form = await findByTestId("autocomplete-artist");
    expect(form).toHaveFormValues({ artistName: "Helen" });
  });

  it("a list of suggestions is not present initially", () => {
    const { container, queryByTestId } = render(
      <AutoComplete suggestions={suggestions} />
    );
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("a list of suggestions is present when a value is entered", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete suggestions={suggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const list = await findByTestId("autosuggestion-list");
    expect(list).not.toBeEmptyDOMElement();
  });

  it("'active-suggestion' className is present when a value is selected", async () => {
    const { container, getByRole } = render(
      <AutoComplete suggestions={suggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen Frankenthaler" } });
    const activeLi = container.getElementsByClassName("active-suggestion");
    expect(activeLi.length).toEqual(1);
  });
});
