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
  const [error, setError] = useState<SearchError>();
  const [data, setData] = useState<SearchResult>();
  const [index, setIndex] = useState<number>(0);
  const id = artist.replace(/\s+/g, "");

  useEffect(() => {
    let isMounted = true;
    fetchImages(artist)
      .then((data: SearchResult) => {
        if (isMounted) {
          if (data?.error) {
            setError(data.error);
          } else {
            setData(data);
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

  const handleClick = (): void => {
    setIndex(index + 1);
  };

  return (
    <div
      onClick={handleClick}
      data-testid="test-card"
      className={style.card}
      title="Click for new image"
      style={{
        backgroundImage: `url(${
          data?.items[index].link || "http://example.com/missing.jpg"
        })`,
      }}
    >
      <h1 className={style.text}>{error?.status || artist}</h1>
    </div>
  );
};

export default Card;
