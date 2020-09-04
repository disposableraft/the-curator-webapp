import { useState, useEffect } from "react";
import style from "../styles/Card.module.css";
import { fetchImages, SearchResult } from "../lib/fetch-images";

interface CardProps {
  artist: string;
}

const Card: React.FC<CardProps> = ({ artist, ...props }) => {
  const [data, setData] = useState<SearchResult>();
  const id = artist.replace(/\s+/g, "");

  useEffect(() => {
    let isMounted = true;
    fetchImages(artist)
      .then((data) => {
        if (isMounted) {
          setData(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setData(err);
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
      <h1 className={style.text}>{data?.error?.message || artist}</h1>
    </div>
  );
};

export default Card;
