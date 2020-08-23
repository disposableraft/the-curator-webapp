import style from "../styles/Layout.module.css";

const Layout: React.FC = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Layout;
