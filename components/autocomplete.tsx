import TextInput from "./text-input";
import { useState } from "react";

type AutoCompleteProps = {
  allSuggestions: string[];
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ allSuggestions }) => {
  const [name, setName] = useState("");
  return (
    <div>
      <form data-testid="autocomplete-artist">
        <input
          autoFocus
          name="artistName"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
        />
      </form>
      {Boolean(name) && (
        <ul data-testid="autosuggestion-list">
          {allSuggestions.map((suggestion) => {
            return (
              <li
                key={suggestion.replace(/\s/, "")}
                className={
                  name === suggestion ? "active-suggestion" : undefined
                }
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
