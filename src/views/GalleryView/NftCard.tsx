import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";
import { SendBackToken } from "components/AppSendBack";

import { fetcher } from "utils/fetcher";

import { SendTransaction } from "../../components/TransferSPLToken/sendTransaction"
import axios from "lib/axios";
import { SystemInstruction } from "@solana/web3.js";

const AppWallet = process.env.NEXT_PUBLIC_WALLET_PUBLIC_KEY;

type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri } = details?.data ?? {};
  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  hasWon(details?.mint)
      .then( 
          function(res) {
              if (res !== undefined) {
                console.log(details)
                document.getElementById(details?.mint).style.display = 'none';
                document.getElementById(name).style.display = 'block';
              }
          }
      );

  return (
    <div className={`card bordered max-w-xs compact rounded-md`}>
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            src={image}
            onError={onImageError}
            className="bg-gray-800 object-cover"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className="card-body" id={details?.mint}>
        <h2 className="card-title text-sm text-left">{name}</h2>
        <SendTransaction toPubkey={AppWallet} mintaddress={details?.mint} />
      </div>
      <div id={name} style={{display: 'none' }}>
          <h1>WINNER</h1>
      </div>
    </div>
  );
};

async function hasWon(mintaddress: string) {
  try {
    const res = await axios.get(`api/winningLion/${mintaddress}`);

    return res.data.mint_address; 
      // Don't forget to return something   
  }
  catch (err) {
      console.error(err);
  }
}