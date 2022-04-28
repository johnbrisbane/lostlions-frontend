import * as web3 from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import * as bs58 from "bs58";

// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const WALLET_SECRET_KEY = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;

export async function SendBackToken(mintAddress: string, userWallet: web3.PublicKey, connection: web3.Connection){
  // Connect to cluster
  // Construct wallet keypairs
  var fromWallet = web3.Keypair.fromSecretKey(
    bs58.decode(WALLET_SECRET_KEY)
  );
  var toWallet = userWallet;
  // Construct my token class

  var myMint = new web3.PublicKey(mintAddress);
  var myToken = new splToken.Token(
    connection,
    myMint,
    splToken.TOKEN_PROGRAM_ID,
    fromWallet
  );
  
  // Create associated token accounts for my token if they don't exist yet
  var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )
  var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    toWallet
  )
  // Add token transfer instructions to transaction
  var transaction = new web3.Transaction()
    .add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        1
      )
    );

  // Sign transaction, broadcast, and confirm

    var signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    );
  console.log("SIGNATURE", signature);
  console.log("SUCCESS");

  return signature;
};