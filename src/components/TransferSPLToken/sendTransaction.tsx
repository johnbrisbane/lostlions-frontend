// sendTransaction.tsx
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from './createTransferInstructions'
import { notify } from "../../utils/notifications";
import { FC } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios';
import { AppBurn } from '../AppBurn';

// Docs: https://github.com/solana-labs/solana-program-library/pull/2539/files
// https://github.com/solana-labs/wallet-adapter/issues/189
// repo: https://github.com/solana-labs/example-token/blob/v1.1/src/client/token.js
// creating a token for testing: https://learn.figment.io/tutorials/sol-mint-token

type Props = {
    mintaddress: string;
    toPubkey: string;
  };

  export const SendTransaction: FC<Props> = ({
    toPubkey,
    mintaddress
    }) => {          
            if (!toPubkey ) return

            const toastId = toast.loading('Processing transaction...')

            const { connection } = useConnection()
            const { publicKey, signTransaction, sendTransaction } = useWallet()
            const router = useRouter();
            const userPub = publicKey?.toBase58()
            const toPublicKey = new PublicKey(toPubkey)

            const onClick = useCallback(async () => {
                console.log(mintaddress)

            try {
                const mintroar = new PublicKey('ES6xz8FR8a5fP31ePeeKGR7HcgtzjQAQdHfGmcR3Uer7')

                const fromTokenAccountroar = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mintroar,
                    publicKey,
                    signTransaction
                )

                const toTokenAccountroar = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mintroar,
                    toPublicKey,
                    signTransaction
                )

                //transfer ROAR
                const transactionroar = new Transaction().add(
                    createTransferInstruction(
                        fromTokenAccountroar.address, // source
                        toTokenAccountroar.address, // dest
                        publicKey,
                        420000000000,
                        [],
                        TOKEN_PROGRAM_ID
                    )
                )

                const blockHashroar = await connection.getRecentBlockhash()
                transactionroar.feePayer = await publicKey
                transactionroar.recentBlockhash = await blockHashroar.blockhash
                const signedroar = await signTransaction(transactionroar)

                await connection.sendRawTransaction(signedroar.serialize())
                    
            } catch {
                return

            }

                

            try {
                if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
                const mint = new PublicKey(mintaddress)

                const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    publicKey,
                    signTransaction
                )

                const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    toPublicKey,
                    signTransaction
                )

                const transaction = new Transaction().add(
                    createTransferInstruction(
                        fromTokenAccount.address, // source
                        toTokenAccount.address, // dest
                        publicKey,
                        1,
                        [],
                        TOKEN_PROGRAM_ID
                    )
                )

                const blockHash = await connection.getRecentBlockhash()
                transaction.feePayer = await publicKey
                transaction.recentBlockhash = await blockHash.blockhash
                const signed = await signTransaction(transaction)

                await connection.sendRawTransaction(signed.serialize())

                toast.success('Transaction sent', {
                    id: toastId,
                })

                //get random result from database
                //update entry and return result
                getData(userPub, mintaddress)
                .then(
                    function(res) {
                        if (res == 0) {
                            AppBurn(mintaddress, connection);
                            router.push('/play');
                        }
                        else if (res == 1) {
                            //SendBackToken(mintaddress, publicKey);
                            router.push('/play');
                        }
                        else {
                            router.push('/error')
                        }
                    }
                );

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(`Transaction failed: ${error.message}`, {
                    id: toastId,
                })
            }
        }, [publicKey, connection]);
    

        return (
            <div>
            <button
                className="btn m-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick} disabled={!publicKey} id="send"
            >
                <span> Send Lion and Play </span>
            </button>
        </div>
        );
}

async function getData(userpubkey: string, mintaddress: string) {
    try {
      const res = await axios.put('api/v1/updateRecord', { wallet_id: userpubkey, mint_address: mintaddress});
  
      return res.data.result; 
        // Don't forget to return something   
    }
    catch (err) {
        console.error(err);
    }
  }