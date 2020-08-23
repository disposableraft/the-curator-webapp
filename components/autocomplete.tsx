import TextInput from "./text-input";
import { useState, ChangeEvent } from "react";

type AutoCompleteProps = {
  allSuggestions: string[];
};

type SearchSuggestion = {
  id: number;
  name: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ allSuggestions }) => {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState(Array());
  const [selected, setSelected] = useState(0);

  const searchSuggestions = (text: string): SearchSuggestion[] => {
    const results = allSuggestions.filter((term) => {
      return term.search(text) >= 0;
    });

    const suggestions = results.map((result, index) => {
      return {
        id: index,
        name: result,
      };
    });

    return suggestions;
  };

  const handleChange = (value: string): void => {
    setName(value);
    const results = searchSuggestions(value);
    setSuggestions(results);
  };

  const handleOnKeyDown = (key: string): void => {
    if (key === "ArrowDown" && selected < suggestions.length - 1) {
      setSelected(selected + 1);
    }

    if (key === "ArrowUp" && selected !== 0) {
      setSelected(selected - 1);
    }

    if (key === "Enter") {
      setName(suggestions[selected].name);
      setSelected(0);
      setSuggestions(Array());
    }
  };

  return (
    <div>
      <form data-testid="autocomplete-artist">
        <input
          autoFocus
          name="artistName"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e.key)}
          type="text"
          value={name}
        />
      </form>
      {Boolean(suggestions.length) && (
        <ul data-testid="autosuggestion-list">
          {suggestions.map((suggestion) => {
            return (
              <li
                key={suggestion.id}
                className={
                  selected === suggestion.id ? "active-suggestion" : undefined
                }
              >
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
