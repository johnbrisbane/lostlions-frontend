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
          <div className="container mx-auto flex justify-center -z-50 brightness-75" style={{backgroundImage: `url(backdrop.jpg)`}}>
          <div className="container mx-auto flex justify-center top-auto">
                        <div className="brightness-75 ">
                          <div className="container mx-auto flex justify-center top-auto w-screen">
                          <Comp />
                          </div>
                        </div>
                    </div>
          </div>
          
          
          </div>
          
      );
};

export default Play;
