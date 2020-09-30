import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import style from "../../styles/Home.module.css";
import names from "../../lib/names.json";
import { getCollection } from "../../lib/get-collection";

type ExhibitionProps = {
  artists: string[];
  name: string;
};

const Exhibitions = ({ artists, name }: ExhibitionProps) => {
  const router = useRouter();
  const [isModalVisible, toggleModal] = useState<boolean>(false);

  const handleReset = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>{Boolean(name) && `${name} : `}Exhibition AutoComplete</title>
      </Head>
      {isModalVisible && (
        <div className={style.dialog} role="dialog">
          <h3>Artists similar to {name}</h3>
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
        {artists.length === 0 || (
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
        )}

        {artists.length === 0 || (
          <main>
            <div data-testid="test-grid" className={style.grid}>
              {artists.map((artist) => {
                return <Card key={artist.replace(/\s/g, "")} artist={artist} />;
              })}
            </div>
          </main>
        )}
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
  console.log(`params ${params?.slug}`);
  if (params?.slug === undefined || typeof params.slug !== "string") {
    throw new Error("Slug is undefined or not a string");
  }
  const name = params?.slug.replace(/_/g, " ");
  const exhibition = getCollection(name);
  return { props: exhibition };
};

export default Exhibitions;
