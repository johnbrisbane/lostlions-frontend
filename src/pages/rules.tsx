import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Rules: NextPage = (props) => {
      return (
        <div>
          <Head>
            <title>Rules</title>
            <meta
              name="Rules"
              content="Rules of LostLion Plinko"
            />
          </Head>
          <BasicsView />
        </div>
      );
};

export default Rules;
