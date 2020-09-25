import { useState } from "react";
import style from "../styles/autocomplete.module.css";

interface AutoCompleteProps {
  allSuggestions: string[];
  onSubmitCallback: (value: string | null) => void;
  placeholder: string;
}

interface SearchSuggestion {
  id: number;
  name: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  allSuggestions,
  onSubmitCallback,
  placeholder,
  ...props
}) => {
  const [name, setName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>(
    Array<SearchSuggestion>()
  );
  const [selected, setSelected] = useState(0);

  const searchSuggestions = (text: string): SearchSuggestion[] => {
    const results = allSuggestions.filter((term) => {
      return term.toLowerCase().search(text.toLowerCase()) >= 0;
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
    if (value.length > 2) {
      const results = searchSuggestions(value);
      setSuggestions(results);
    }
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
      onSubmitCallback(suggestions[selected].name);
    }

    if (key === "Escape") {
      setName("");
      setSelected(0);
      setSuggestions(Array());
    }
  };

  return (
    <div className={style.autocomplete}>
      <form
        onSubmit={(e) => e.preventDefault()}
        data-testid="autocomplete-artist"
      >
        <input
          className={style.textbox}
          placeholder={placeholder}
          autoComplete="off"
          autoFocus
          name="artistName"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleOnKeyDown(e.key)}
          type="text"
          value={name}
        />
        {Boolean(suggestions.length) && (
          <ul
            data-testid="autosuggestion-list"
            role="listbox"
            className={style.suggestions}
          >
            {suggestions.map((suggestion) => {
              return (
                <li
                  role="option"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitCallback(e.currentTarget.textContent);
                  }}
                  aria-selected={Boolean(selected === suggestion.id)}
                  key={suggestion.id}
                  className={
                    selected === suggestion.id
                      ? style.activeSuggestion
                      : style.suggestion
                  }
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
};

export default AutoComplete;
