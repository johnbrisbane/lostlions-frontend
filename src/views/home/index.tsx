// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { PlayGameButton } from '../../components/PlayGameButton';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()


  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (
    

    <>
    <div className="py-12 overflow-y-hidden">
            {/* Code block starts */} 
                <div>
                    <div className="relative rounded-lg container mx-auto flex flex-col items-center z-50">
                    <h1 className="text-5xl pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#FAD836] to-[#47833C]">
                      Lost Lions <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
                    </h1>
                    
                    <h4 className="w-full max-w-md mx-auto text-center text-slate-300">
                      <p>Lost Lions breeding eligability generator</p>
                      Play for a chance to breed.
                    </h4>
                    <div className='pt-12'>
                      <PlayGameButton />

                    </div>
                      
                    </div>
                    <div className="container mx-auto flex justify-center md:-mt-56 -mt-20 sm:-mt-40">
                        <div className="relative w-11/12 brightness-75">
                            <img src="/banner.png" alt="Sample Page" role="img" />
                        </div>
                    </div>
                </div>
            {/* Code block ends */}
        </div>
    <div className="hero mx-auto p-4 min-h-16 py-4">
        <div className="hero-content flex flex-col max-w-lg">
          <h4 className="w-full max-w-md mx-auto text-center text-slate-300">
            <p>Lost Lions breeding eligability generator</p>
            Play for a chance to breed.
          </h4>
          <div className="mockup-code bg-primary m-0 pl-2 pr-16">
            <pre data-prefix=">">
              <code>Breed your Lions  </code>
            </pre>
          </div>
          <div className="text-center">
            {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
            {wallet && <p>Sol Balance: {(balance || 0).toLocaleString()}</p>}
          </div>
        </div>
      </div></>
  );
};
