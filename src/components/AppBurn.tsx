import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction, useState } from 'react';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import * as web3 from "@solana/web3.js";
import { sign } from 'crypto';
import { BurnTokenAndCloseAccount } from './BurnTokenAndCloseAccount';

const WALLET_SECRET_KEY = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;

export async function AppBurn(tokenMintAddress: string, connection) {
    try {

        const { setVisible } = useWalletModal();
        const [amount, setAmount] = useState(0);
        const [isburning, setIsburning] = useState(false);

        const mintPublickey = new PublicKey(tokenMintAddress);

        var fromWallet = web3.Keypair.fromSecretKey(
            bs58.decode(WALLET_SECRET_KEY)
          );

            if (fromWallet.publicKey) {

                const associatedAddress = await Token.getAssociatedTokenAddress(
                    ASSOCIATED_TOKEN_PROGRAM_ID,
                    TOKEN_PROGRAM_ID,
                    mintPublickey,
                    fromWallet.publicKey,
                );

                const getbalance = await connection.getTokenAccountBalance(associatedAddress)

                const quantity = getbalance.value.amount;
                setAmount(parseInt(quantity, 10))
            }



        BurnTokenAndCloseAccount(tokenMintAddress, fromWallet.publicKey, fromWallet, connection, amount, setAmount, setIsburning)

        //const confirmed = await connection.confirmTransaction(BurnandCloseSignature, 'processed');

        if (signature) {
            console.log('success');
        }
    } catch (error) {
        console.log('error');
    }

}