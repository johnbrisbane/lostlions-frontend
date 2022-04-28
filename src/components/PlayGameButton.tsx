import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { useRouter } from 'next/router'



export const PlayGameButton: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const router = useRouter();
        
    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }

        try {
            router.push('/game');

        } catch (error: any) {
            
        }

    }, [publicKey, connection]);

    return (
        <div>
            <button
                className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C] hover:from-[#47833C] hover:to-[#FAD836] ..."
                onClick={onClick} disabled={!publicKey}
            >
                {publicKey ? <span>Play Plinko Game</span> : <span>Connect Wallet</span>}
            </button>
        </div>
    );
};

