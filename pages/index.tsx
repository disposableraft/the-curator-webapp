import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import AutoComplete from "../components/autocomplete";
import style from "../styles/Home.module.css";
import names from "../data/names.json";

const Home: React.FC = () => {
  const router = useRouter();

  const onSubmit = async (value: string | null) => {
    // Route to ->  /exhibitions/artist_name
    router.push(`/exhibitions/${value?.replace(/\s/g, "_")}`);
  };

  return (
    <Layout>
      <Head>
        <title>Exhibition AutoComplete</title>
      </Head>
      <div className={style.container}>
        <main className={style.autocompleteWrapper}>
          <AutoComplete
            placeholder="Artist name"
            onSubmitCallback={(value) => onSubmit(value)}
            allSuggestions={names}
          />
        </main>
      </div>
    </Layout>
  );
};

export default Home;
