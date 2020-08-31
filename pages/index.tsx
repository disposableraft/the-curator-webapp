import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Layout from "../components/layout";
import AutoComplete from "../components/autocomplete";
import Card from "../components/card";
import style from "../styles/Home.module.css";
import names from "../lib/names.json";

const Home: React.FC = () => {
  const [exhibition, setExhibition] = useState<string[]>(Array());
  const [subject, setSubject] = useState<string>("");

  const onSubmit = async (value: string | null) => {
    const response = await fetch("http://localhost:3000/api/post", {
      method: "post",
      body: JSON.stringify({ name: value }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setExhibition(data.artists);
    setSubject(data.name);
  };

  return (
    <Layout>
      <Head>
        <title>The Curator Web Interface</title>
      </Head>
      <div className={style.container}>
        {exhibition.length > 0 || (
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
          </div>
        )}

        {Boolean(subject.length) && (
          <h2 className={style.selectedArtist}>{subject}</h2>
        )}

        <div className={style.main}>
          <div data-testid="test-grid" className={style.grid}>
            {Boolean(exhibition.length) &&
              exhibition.map((artist) => {
                return <Card key={artist.replace(/\s/g, "")} artist={artist} />;
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
