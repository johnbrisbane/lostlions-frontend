import type { NextPage } from "next";
import Head from "next/head";
import { ClaimPrize } from "../views";

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
          <ClaimPrize />
        </div>
      );
};

export default Rules;
