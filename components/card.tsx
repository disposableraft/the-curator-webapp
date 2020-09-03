import { useState, useEffect } from "react";
import style from "../styles/Card.module.css";
import { fetchImages, SearchResult } from "../lib/fetch-images";

interface CardProps {
  artist: string;
}

const Card: React.FC<CardProps> = ({ artist, ...props }) => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<SearchResult>();
  const id = artist.replace(/\s+/g, "");

  useEffect(() => {
    fetchImages(artist)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  return (
    <div
      data-testid="test-card"
      className={style.card}
      style={{
        backgroundImage: `url(${data?.link})`,
      }}
    >
      <h1 className={style.text}>{error || artist}</h1>
    </div>
  );
};

export default Card;
