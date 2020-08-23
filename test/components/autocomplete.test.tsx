import AutoComplete from "../../components/autocomplete";
import {
  screen,
  render,
  fireEvent,
  findByTestId,
} from "@testing-library/react";

const allSuggestions = [
  "Denise Debuvier",
  "Dennis Oppenheimer",
  "George Washington",
  "Helenor Georgiovanie",
  "Helen Frankenthaler",
  "John Cage",
  "John Donne",
  "Lee Krasner",
  "Lee Simpson",
  "Pablo Picasso",
  "Wiles Lee Coyote",
];

describe("AutoComplete", () => {
  it("renders", () => {
    render(<AutoComplete allSuggestions={allSuggestions} />);
  });

  it("inputs key strokes", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete allSuggestions={allSuggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const form = await findByTestId("autocomplete-artist");
    expect(form).toHaveFormValues({ artistName: "Helen" });
  });

  it("a list of suggestions is not present initially", () => {
    const { container, queryByTestId } = render(
      <AutoComplete allSuggestions={allSuggestions} />
    );
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("a list of suggestions is present when a value is entered", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete allSuggestions={allSuggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const list = await findByTestId("autosuggestion-list");
    expect(list).not.toBeEmptyDOMElement();
  });

  it("'active-suggestion' className is present when a value is selected", async () => {
    const { container, getByRole } = render(
      <AutoComplete allSuggestions={allSuggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen Frankenthaler" } });
    const activeLi = container.getElementsByClassName("active-suggestion");
    expect(activeLi.length).toEqual(1);
  });

  it("searches for values", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete allSuggestions={allSuggestions} />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    const list = await findByTestId("autosuggestion-list");
    const itemsCount = list.childElementCount;
    // TODO ideally, count should be 3 to match "Wiles Lee Coyote"
    expect(itemsCount).toBe(2);
  });
});
