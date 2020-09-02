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
        <title>Exhibition AutoComplete</title>
      </Head>
      <div className={style.container}>
        <header className={style.selectedArtist}>
          Exhibition <span className={style.highlight}>Autocomplete</span>{" "}
          {Boolean(subject) && `: ${subject}`}
        </header>
        {exhibition.length > 0 || (
          <main className={style.main}>
            <AutoComplete
              className={style.autocomplete}
              onSubmitCallback={(value) => onSubmit(value)}
              allSuggestions={names}
            />
          </main>
        )}

        {exhibition.length === 0 ? null : (
          <main className={style.main}>
            <div data-testid="test-grid" className={style.grid}>
              {exhibition.map((artist) => {
                return <Card key={artist.replace(/\s/g, "")} artist={artist} />;
              })}
            </div>
          </main>
        )}
      </div>
    </Layout>
  );
};

export default Home;
