
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";
import { useRouter } from 'next/router'
import { SendBackToken } from '../components/AppSendBack'
import axios from 'lib/axios';
import { Loader } from './Loader';
import liongif from '../../public/lion.gif'
import Image from 'next/image';




export const ClaimLionButton: FC = () => {
    
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [graphic, setGraphic] = useState<boolean>(false);


        
    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }
        setLoading(true);

        try {
            hasWon(publicKey?.toBase58())
            .then(
                async function(res) {
                    try {
                        let response = await SendBackToken(res.mint_address, publicKey, connection);
                        await UpdateActive(res.id);
                        await lionReturned(res.mint_address);
                        setLoading(false);
                        setGraphic(true);
                        notify({ type: 'success', message: 'Transaction successful!'});
                    } catch(e) {
                        setLoading(false);
                        setGraphic(true);
                        notify({ type: 'error', message: `Error Sending Back Lion` });
                    }    //Update Payout Here
                }
            )
        } catch (error: any) {
            console.log(error)
            notify({ type: 'error', message: `Unexpected Error` });
            //Display Error HERE
        }

    }, [publicKey, connection]);

    return (
        <div>
            {graphic ? (
                <div className='container justify-center z-2 relative '>
                <Image src={liongif} alt="lion..." />
                </div>
                
            ) : (
                loading ? (
                    <div>
                        <Loader />
                    </div>
                    ) : (
                    <button
                        className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C] hover:from-[#47833C] hover:to-[#FAD836] ..."
                        onClick={onClick} disabled={!publicKey} id={'claim'}>
                        {publicKey ? <span>Claim Lion</span> : <span>Nothing to Claim</span>}
                    </button>
                    )
            )}
        </div>
            );
};

async function UpdateActive(id) {
    try {
      const res = await axios.put(`api/result/${id}`);
  
      return res.data.result; 
        // Don't forget to return something   
    }
    catch (err) {
        console.error(err);
    }
  }


async function hasWon(id: string) {
    try {
      const res = await axios.get(`api/claimPrize/${id}`);
  
      return res.data; 
        // Don't forget to return something   
    }
    catch (err) {
        console.error(err);
    }
  }


async function lionReturned(id: string) {
    try {
      const res = await axios.put(`api/lionReturned/${id}`);
  
      return res.data; 
        // Don't forget to return something   
    }
    catch (err) {
        console.error(err);
    }
  }