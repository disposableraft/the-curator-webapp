import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Layout from "../components/layout";
import AutoComplete from "../components/autocomplete";
import style from "../styles/Home.module.css";
import names from "../lib/names.json";

const Home: React.FC = () => {
  const [exhibition, setExhibition] = useState<string[]>(Array());

  const onSubmit = async (value: string | null) => {
    const response = await fetch("http://localhost:3000/api/post", {
      method: "post",
      body: JSON.stringify({ name: value }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setExhibition(data.artists);
  };

  return (
    <Layout>
      <Head>
        <title>The Curator Web Interface</title>
      </Head>
      <div className={style.container}>
        <div className={style.main}>
          <AutoComplete
            className={style.autocomplete}
            onSubmitCallback={(value) => onSubmit(value)}
            allSuggestions={names}
          />
          <div className={style.description}>
            Enter an artist or select one by{" "}
            <a
              href="#"
              onClick={(e) => {
                alert("Selecting random artist");
              }}
            >
              random
            </a>
          </div>
          <div className={style.grid}>
            {exhibition.map((artist) => {
              return (
                <div
                  data-testid="test-card"
                  className={style.card}
                  key={artist.replace(/\s/g, "")}
                >
                  <h3>{artist}</h3>
                  <p>
                    <img width="100%" height="120px" />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
