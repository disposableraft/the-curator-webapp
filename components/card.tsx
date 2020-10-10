import { useState } from "react";
import style from "../styles/Card.module.css";
import { SearchResult } from "../types";

interface CardProps {
  name: string;
  searchResult: SearchResult;
}

const Card: React.FC<CardProps> = ({ name, searchResult, ...props }) => {
  const [index, setIndex] = useState<number>(0);

  const handleClick = (): void => {
    const limit = searchResult.items.length - 1;
    if (index === limit) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div
      onClick={handleClick}
      data-testid="test-card"
      className={style.card}
      title="Click for new image"
      style={{
        backgroundImage: `url(${
          searchResult?.items[index].link || "http://example.com/missing.jpg"
        })`,
      }}
    >
      <h1 className={style.text}>{name}</h1>
    </div>
  );
};

export default Card;
