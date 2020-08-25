import AutoComplete from "../../components/autocomplete";
import { screen, render, fireEvent } from "@testing-library/react";

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
  it("renders without crashing", () => {
    render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
  });

  it("inputs key strokes", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const form = await findByTestId("autocomplete-artist");
    expect(form).toHaveFormValues({ artistName: "Helen" });
  });

  it("a list of suggestions is not present initially", () => {
    const { container, queryByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("a list of suggestions is present when values are entered", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen" } });
    const list = await findByTestId("autosuggestion-list");
    expect(list).not.toBeEmptyDOMElement();
  });

  it("'activeSuggestion' className is present when a value is entered", async () => {
    const { container, getByRole } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Helen Frankenthaler" } });
    const activeLi = container.getElementsByClassName("activeSuggestion");
    expect(activeLi.length).toEqual(1);
  });

  it("returns search suggestions when values are entered", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    const list = await findByTestId("autosuggestion-list");
    const itemsCount = list.childElementCount;
    expect(itemsCount).toBe(3);
  });

  it("searches for suggestions regardless of letter case", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "lee" } });
    const list = await findByTestId("autosuggestion-list");
    const itemsCount = list.childElementCount;
    expect(itemsCount).toBe(3);
  });

  it("doesn't return suggestions until >2 chars are input", () => {
    const { container, getByRole, queryByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Le" } });
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("ArrowDown increments the active suggestion", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
    const ul = await findByTestId("autosuggestion-list");
    expect(ul.childNodes[1]).toHaveClass("activeSuggestion");
  });

  it("ArrowDown updates the active suggestion no further than the end of the list", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
    const ul = await findByTestId("autosuggestion-list");
    expect(ul.childNodes[2]).toHaveClass("activeSuggestion");
  });

  it("ArrowUp decrements the active suggestion", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(field, { key: "ArrowUp", code: "ArrowUp" });
    const ul = await findByTestId("autosuggestion-list");
    expect(ul.childNodes[0]).toHaveClass("activeSuggestion");
  });

  it("ArrowUp doesn't decrement beyond the first item", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(field, { key: "ArrowUp", code: "ArrowUp" });
    const ul = await findByTestId("autosuggestion-list");
    expect(ul.childNodes[0]).toHaveClass("activeSuggestion");
  });

  it("commits a selection to the input on pressing Enter", async () => {
    const { container, getByRole, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    const form = await findByTestId("autocomplete-artist");
    expect(form).toHaveFormValues({ artistName: "Lee Krasner" });
  });

  it("after pressing Enter, the list of suggestions is not be present", async () => {
    const { container, getByRole, queryByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
  });

  it("the onSubmit callback fires when Enter is pressed", () => {
    const onSubmitCallback = jest.fn();
    const { container, getByRole } = render(
      <AutoComplete
        onSubmitCallback={onSubmitCallback}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "Enter", code: "Enter" });
    expect(onSubmitCallback).toHaveBeenCalled();
  });

  it("the onSubmit callback fires when clicking on a name", async () => {
    const onSubmitCallback = jest.fn();
    const { container, getByRole, getAllByRole } = render(
      <AutoComplete
        onSubmitCallback={onSubmitCallback}
        allSuggestions={allSuggestions}
      />
    );
    let input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "Lee" } });
    let option = getAllByRole("option");
    fireEvent.click(option[1]);
    expect(onSubmitCallback).toHaveBeenCalled();
  });

  it('input is cleared when "escape" is pressed', async () => {
    const { container, getByRole, queryByTestId, findByTestId } = render(
      <AutoComplete
        onSubmitCallback={() => {}}
        allSuggestions={allSuggestions}
      />
    );
    let field = getByRole("textbox");
    fireEvent.change(field, { target: { value: "Lee" } });
    fireEvent.keyDown(field, { key: "Escape", code: "Escape" });
    expect(queryByTestId("autosuggestion-list")).not.toBeInTheDocument();
    const form = await findByTestId("autocomplete-artist");
    expect(form).not.toHaveFormValues({ artistName: "Lee" });
  });

  test.todo("typing new input resets the active selection");
});
