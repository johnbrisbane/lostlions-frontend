import type { NextPage } from "next";
import Head from "next/head";
import Scene from "../components/Scene";
import { BasicsView } from "../views";
import { GalleryView } from "../views";


const Home: NextPage = (props) => {
      return (
        <div>
          <Head>
            <title>LostLions</title>
            <meta
              name="description"
              content="Solana Scaffold"
            />
          </Head>
          <BasicsView />
          <GalleryView />
        </div>
      );
};

export default Home;
