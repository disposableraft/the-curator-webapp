import { useState, useEffect } from "react";
import style from "../styles/Card.module.css";
import { fetchImages, SearchResult, SearchItem } from "../lib/fetch-images";

interface CardProps {
  artist: string;
}

interface SearchError {
  status: string;
  code: string;
  message: string;
}

const Card: React.FC<CardProps> = ({ artist, ...props }) => {
  const [data, setData] = useState<SearchItem>();
  const [error, setError] = useState<SearchError>();
  const id = artist.replace(/\s+/g, "");

  useEffect(() => {
    let isMounted = true;
    fetchImages(artist)
      .then((data) => {
        if (isMounted) {
          if (data?.error) {
            setError(data.error);
          } else {
            setData(data.items[0]);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setError(err);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      data-testid="test-card"
      className={style.card}
      style={{
        backgroundImage: `url(${
          data?.link || "http://example.com/missing.jpg"
        })`,
      }}
    >
      <h1 className={style.text}>{error?.status || artist}</h1>
    </div>
  );
};

export default Card;
