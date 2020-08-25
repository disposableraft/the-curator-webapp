import style from "../styles/Layout.module.css";

const Layout: React.FC = ({ children }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>The Curator</h1>
      {children}
    </div>
  );
};

export default Layout;
