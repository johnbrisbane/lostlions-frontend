import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';



export async function BurnTokenAndCloseAccount(tokenMintAddress: string, owner: PublicKey, wallet, connection: Connection) {
    try {
        const mintPublickey = new PublicKey(tokenMintAddress);

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

        const BurnandCloseSignature = await wallet.sendTransaction(BurnandCloseTransaction, connection);
        console.log('hello');

        const confirmed = await connection.confirmTransaction(BurnandCloseSignature, 'processed');


    } catch (error) {
    }

}