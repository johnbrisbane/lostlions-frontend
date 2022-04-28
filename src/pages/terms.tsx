import type { NextPage } from "next";
import Head from "next/head";

const Terms: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>LostLions</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <div className="hero mx-auto p-4 min-h-16">
      <div className="hero-content flex flex-col max-w-lg">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#FAD836] to-[#47833C]">
          Terms Of Play
        </h1>
        <p>
            By participating & using this website, user agrees they have acknowledged, read & accept the entirety of this Disclaimer, 
            and waived all rights to enforce legal actions/proceedings against anyone affiliated with Lost Lions.  “Lost Lions” is 
            described as the immediate team members/leaders, marketers, moderators, or those contracted by Lost Lions.  Although best 
            efforts are made to ensure that all information is accurate and up to date, occasionally unintended errors or misprints may occur.  
        </p>
        <p>
            Lost Lions, and all of its team members are not held responsible, nor liable, for finance, betting, gaming related materials, 
            investments/choices made by the user, or anyone who access's this website.  This website is intended for entertainment purposes only.  
            This includes, but not limited to, the use of the Lost Lions gaming website, and any opinions listed in any/all channels located within 
            Lost Lions Discord sever and/or direct messages from a Lost Lions previous or current member.
        </p>
        <p>
            By participating in this application, you are agreeing to the Terms of Play.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Terms;

