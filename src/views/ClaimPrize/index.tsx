// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { ClaimLionButton } from '../../components/ClaimLionButton';
import axios from 'lib/axios';
import { notify } from 'utils/notifications';



export const ClaimPrize: FC = ({ }) => {
  
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {

  })

  return (
    

    <>
<div>
                    <div className="pt-48 relative rounded-lg container mx-auto flex flex-col items-center z-50">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#FAD836] to-[#47833C]">
                    WINNER <span className='text-sm font-normal align-top text-slate-700'></span>
                    </h1>
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#FAD836] to-[#47833C]">
                    Claim Your New Breedable Lion <span className='text-sm font-normal align-top text-slate-700'></span>
                    </h1>
                    <div className='pt-12'>
                    <ClaimLionButton />

                    </div>
                      
                    </div>

                    <div className="container mx-auto flex justify-center">
                        <div className="relative w-11/12 brightness-50 -mt-96">
                            <img src="/lion1.png" alt="Sample Page" role="img" />
                        </div>
                    </div>
                </div>
        </>
  );
};