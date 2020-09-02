import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import style from "../styles/Card.module.css";

interface CardProps {
  artist: string;
}

interface SearchResult {
  title: string;
  link: string;
  image: {
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

const Card: React.FC<CardProps> = ({ artist, ...props }) => {
  const [data, setData] = useState<SearchResult>();
  const id = artist.replace(/\s+/g, "");

  const fetchData = async (term: string): Promise<SearchResult> => {
    const url = new URL("http://localhost:3000/api/search");
    url.searchParams.append("name", artist);
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchData(artist)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
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
      <h1 className={style.text}>{artist}</h1>
    </div>
  );
};

export default Card;
