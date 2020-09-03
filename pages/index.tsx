import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import AutoComplete from "../components/autocomplete";
import Card from "../components/card";
import style from "../styles/Home.module.css";
import names from "../lib/names.json";
import { fetchCollection } from "../lib/fetch-collection";

const Home: React.FC = () => {
  const [collection, setCollection] = useState<string[]>(Array());
  const [subject, setSubject] = useState<string>("");

  const onSubmit = async (value: string | null) => {
    const data = await fetchCollection(value);
    setCollection(data.artists);
    setSubject(data.name);
  };

  const handleReset = () => {
    setCollection(Array());
    setSubject("");
  };

  return (
    <Layout>
      <Head>
        <title>
          {Boolean(subject) && `${subject} : `}Exhibition AutoComplete
        </title>
      </Head>
      <div className={style.container}>
        {collection.length === 0 || (
          <button
            onClick={handleReset}
            className={style.resetButton}
            name="reset"
            title="Reset"
          >
            X
          </button>
        )}
        {collection.length > 0 || (
          <main>
            <AutoComplete
              className={style.autocomplete}
              onSubmitCallback={(value) => onSubmit(value)}
              allSuggestions={names}
            />
          </main>
        )}

        {collection.length === 0 || (
          <main>
            <div data-testid="test-grid" className={style.grid}>
              {collection.map((artist) => {
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
