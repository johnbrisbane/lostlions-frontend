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

                    <ClaimLionButton />

        </>
  );
};