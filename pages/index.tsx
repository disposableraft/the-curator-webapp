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
  const [isModalVisible, toggleModal] = useState<boolean>(false);

  const onSubmit = async (value: string | null) => {
    const data = await fetchCollection(value);
    setCollection(data.artists);
    setSubject(data.name);
  };

  const handleReset = () => {
    setCollection(Array());
    setSubject("");
    toggleModal(false);
  };

  return (
    <Layout>
      <Head>
        <title>
          {Boolean(subject) && `${subject} : `}Exhibition AutoComplete
        </title>
      </Head>
      {isModalVisible && (
        <div className={style.dialog} role="dialog">
          <h3>Artists similar to {subject}</h3>
          <p>
            Autcomplete Exhibition is a project by{" "}
            <a href="https://github.com/disposableraft/the-curator">
              Lance Wakeling
            </a>{" "}
            that explores grouping artists based on statistical analysis.
          </p>
        </div>
      )}
      <div className={style.container}>
        {collection.length === 0 || (
          <div>
            <button
              onClick={handleReset}
              className={style.resetButton}
              name="reset"
              title="Reset"
            >
              X
            </button>
            <button
              onClick={() => toggleModal(!isModalVisible)}
              className={style.helpButton}
              name="help"
              title="Help"
            >
              ?
            </button>
          </div>
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
