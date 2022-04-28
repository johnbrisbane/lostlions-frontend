import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader } from "../../components/Loader";
import { LionsLogo } from "../../components/LionsLogo";
import { SelectAndConnectWalletButton } from "../../components/SelectAndConnectWalletButton";
import lionhashes from '../../utils/Lost-Lions-Hash.json';
import axios from '../../lib/axios'

import { NftCard } from "./NftCard";
import styles from "./index.module.css";
const walletPublicKey = "";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const setWalletToParsePublicKey =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey?.toBase58(),
    connection,
  });

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 2xl:px-0">
      <div className={styles.container}>
        <div className="text-center pt-2">
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
                        <div className="my-10">
                          <SelectAndConnectWalletButton
                            onUseWalletClick={onUseWalletClick}
                          />
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
                    <LionList nfts={nfts} />
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
};

const LionList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }
  

  const lions = [];

  nfts?.forEach(nft => {
    if (lionhashes.includes(nft?.mint)){
      lions?.push(nft);
    } 
  });

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No LostLions found in this wallet
      </div>
    );
  }

  return (
    <><h1>LostLions in your wallet</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (     
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} /> //devnet
      ))}
    </div></>
  );
};
