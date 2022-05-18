import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader } from "../../components/Loader";
import { LionsLogo } from "../../components/LionsLogo";
import lionhashes from '../../utils/Lost-Lions-Hash.json';

import { NftCard } from "./NftCard";
import styles from "./index.module.css";
import axios from "lib/axios";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();
  const publicKeyString = publicKey?.toBase58();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKeyString,
    connection,
  });

  return (
    <div className="container mx-auto max-w-6xl 2xl:px-0">
      <div className={styles.container}>
        <div className="text-center">
          <div className="hero min-h-16 p-0">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-1 text-5xl">
                  LostLions NFT Gallery <LionsLogo />
                </h1>

                <div className="w-full min-w-full">
                  <div>
                    <div className="form-control mt-8">
                      <label className="input-group input-group-vertical input-group-lg">
                        <div >

                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <LionList nfts={nfts} publicKey={publicKeyString} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
  publicKey: string;
};

const LionList = ({ nfts, publicKey, error }: NftListProps) => {
  if (error) {
    return null;
  }
  const lions = [];
  const winningLions = [];
  const mintaddresswin = [];

  const [data, setData] = useState([]);
    // make the fetch the first time your component mounts
    useEffect(() => {
      async function getWalletResults() {
        const request = await axios.get(`api/getAllResultsForWallet/${publicKey}`);
        setData(request.data);
        return request;
      }      
      getWalletResults()
    }, []);  

    data.forEach(element => {
      mintaddresswin?.push(element?.mint_address)
    });

    nfts?.forEach(nft => {   
      
      if (lionhashes.includes(nft?.mint)){
        if (mintaddresswin?.includes(nft?.mint)) {
          winningLions?.push(nft);
        }
        else {
          lions?.push(nft);
        }  
      }                   
    });




  if (!lions?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No eligable LostLions found in this wallet
      </div>
    );
  }

  


  return (
    
    <>
    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr pt-10 pb-10 from-[#FAD836] to-[#47833C]">
      Winners <span className='text-sm font-normal align-top text-slate-700'></span>
    </h1>


    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {winningLions?.map((nft) => (     
        <NftCard winner={false} key={nft.mint} details={nft} onSelect={() => {}} /> 
      ))}
    </div>


    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr pt-10 pb-10 from-[#FAD836] to-[#47833C]">
      {lions?.length ? <>Lions to Wager</> : <>No Lions Left to Wager</>} <span className='text-sm font-normal align-top text-slate-700'></span>
    </h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {lions?.map((nft) => (     
        <NftCard winner={true} key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
</>
  );
};

