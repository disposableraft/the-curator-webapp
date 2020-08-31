import style from "../styles/Card.module.css";

interface CardProps {
  artist: string;
}

const Card: React.FC<CardProps> = ({ artist, ...props }) => {
  return (
    <div data-testid="test-card" className={style.card}>
      <p>
        <img width="100%" height="120px" />
      </p>
      <h3>{artist}</h3>
    </div>
  );
};

export default Card;
