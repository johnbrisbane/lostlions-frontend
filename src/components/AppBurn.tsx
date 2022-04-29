import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction } from 'react';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import * as web3 from "@solana/web3.js";
import { sign } from 'crypto';

const WALLET_SECRET_KEY = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;

export async function AppBurn(tokenMintAddress: string, connection) {
    try {
        // Construct wallet keypairs
        var fromWallet = web3.Keypair.fromSecretKey(
            bs58.decode(WALLET_SECRET_KEY)
        );
        const mintPublickey = new PublicKey(tokenMintAddress);
        
        var owner = fromWallet.publicKey;

        const associatedAddress = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            owner,
        );

        const burnInstruction = await Token.createBurnInstruction(
            TOKEN_PROGRAM_ID,
            mintPublickey,
            associatedAddress,
            owner,
            [],
            1
        );

        const closeInstruction = await Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            associatedAddress,
            owner,
            owner,
            []
        );

        const BurnandCloseTransaction = new Transaction().add(burnInstruction, closeInstruction);

        //const BurnandCloseSignature = await wallet.sendTransaction(BurnandCloseTransaction, connection);

        var signature = await web3.sendAndConfirmTransaction(
            connection,
            BurnandCloseTransaction,
            [fromWallet]
          );

        //const confirmed = await connection.confirmTransaction(BurnandCloseSignature, 'processed');

        if (signature) {
            console.log('success');
        }
    } catch (error) {
        console.log('error');
    }

}