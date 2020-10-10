import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import style from "../../styles/Home.module.css";
import names from "../../data/names.json";
// TODO: rename file
import { Exhibition, getExhibition } from "../../lib/get-exhibition";

export interface SearchItem {
  title: string;
  link: string;
  image: {
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface SearchResult {
  items: SearchItem[];
  error?: any;
}

const Exhibitions = (exhibition: Exhibition) => {
  const router = useRouter();
  const [isModalVisible, toggleModal] = useState<boolean>(false);

  const handleReset = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>
          {Boolean(exhibition.subject) && `${exhibition.subject} : `}Exhibition
          AutoComplete
        </title>
      </Head>
      {isModalVisible && (
        <div className={style.dialog} role="dialog">
          <h3>Artists similar to {exhibition.subject}</h3>
          <p>
            Exhibition Autcomplete groups artists based on word embeddings
            generated from a{" "}
            <a href="https://github.com/disposableraft/the-curator">
              corpus of exhibitions
            </a>
            .
          </p>
        </div>
      )}
      <div className={style.container}>
        <div>
          <button
            onClick={handleReset}
            className={style.resetButton}
            name="reset"
            title="Reset"
          >
            ↺
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

        <main>
          <div data-testid="test-grid" className={style.grid}>
            {exhibition.artists.map((artist) => {
              return (
                <Card
                  key={artist.name.replace(/\s/g, "")}
                  name={artist.name}
                  searchResult={artist.searchResult}
                />
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = names.map((name) => {
    return { params: { slug: name.replace(/\s/g, "_") } };
  });
  // Setting fallback to false means that requests for pages
  // not in `[paths]` will meet a 404.
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug === undefined || typeof params.slug !== "string") {
    throw new Error("Slug is undefined or not a string");
  }
  const name = params?.slug.replace(/_/g, " ");
  const exhibition = getExhibition(name);

  return { props: exhibition };
};

export default Exhibitions;
