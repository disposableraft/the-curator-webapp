import TextInput from "./text-input";
import { useState } from "react";

const AutoComplete: React.FC = () => {
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
          <li>a</li>
          <li>b</li>
          <li>c</li>
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
