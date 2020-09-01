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

  const fetchData = async (term: string): Promise<SearchResult> => {
    const url = new URL("http://localhost:3000/api/artist");
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
    <div data-testid="test-card" className={style.card}>
      <p>
        <img
          src={data && data.image.thumbnailLink}
          width="100%"
          height="120px"
          alt={data && data.title}
        />
      </p>
      <h3>{artist}</h3>
    </div>
  );
};

export default Card;
