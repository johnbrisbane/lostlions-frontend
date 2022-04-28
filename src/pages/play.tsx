import type { NextPage } from "next";
import Head from "next/head";
import Scene from "../components/Scene";
import Comp from "../components/plinko"



const Play: NextPage = (props) => {
      return (
        <div>
          <Head>
            <title>LostLions</title>
            <meta
              name="description"
              content="Solana Scaffold"
            />
          </Head>
          <Comp />
        </div>
      );
};

export default Play;
