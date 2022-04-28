import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Error: NextPage = (props) => {
      return (
        <div>
          <Head>
            <title>ERROR</title>
            <meta
              name="Error"
              content="Error"
            />
          </Head>
          <h1>Error</h1>
        </div>
      );
};

export default Error;
