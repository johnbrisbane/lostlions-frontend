import { FC } from 'react';
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import { useWallet } from '@solana/wallet-adapter-react';


export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  const { publicKey } = useWallet();

  return (
    <div className="flex-none p-2">

      {/* NavBar / Header */}
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="px-2 mx-2 navbar-start">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <div className="p-2">
          <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
            viewBox="0 0 254 247"
          >
            <defs>
            
          
            <linearGradient
              x1="78.586%"
              y1="39.317%"
              x2="23.358%"
              y2="59.956%"
              id="a"
            >
              <stop stopColor="#FAD836" offset="0%" />
              <stop stopColor="#47833C" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="78.586%"
              y1="39.317%"
              x2="23.358%"
              y2="59.956%"
              id="b"
            >
              <stop stopColor="#47833C" offset="0%" />
              <stop stopColor="#FAD836" offset="100%" />
            </linearGradient>
          </defs>
            <g fill="none">
              <path
                d="M646 1548c-82-249-150-457-152-463-2-5 16-24 39-41s203-151 399-298l358-266 397 297c219 163 397 301 397 307-1 10-294 909-298 913-2 3-420-44-461-52-16-3-86 2-155 10s-163 20-210 25c-47 6-103 13-125 16l-40 4-149-452zm254 412c0-5-11-10-24-10-23 0-68-41-79-72-10-29-16 2-6 33 6 19 12 40 15 47 4 15 94 17 94 2zm875-22c4-18 12-39 17-45 6-7 7-13 2-13s-22 16-37 35c-18 23-36 35-52 35-14 0-25 5-25 10 0 6 20 10 44 10 42 0 45-2 51-32zm-594-16l106-28 109 29c103 27 114 28 194 17 145-19 147-19 160-51 7-16 28-38 46-50 20-12 37-32 40-47s10-44 15-64c7-29 5-47-11-88-23-58-27-47 50-139 45-54 45-54 13-38-37 19-47 21-38 7 3-5 39-91 80-190 73-178 74-180 44-159-17 12-31 20-32 18s-42-64-91-137c-86-128-105-145-106-89 0 9-3 17-7 17s-83-75-174-166l-166-166-13 31c-7 17-15 31-18 31s-25-21-49-47l-43-48-43 48c-24 26-46 47-49 47s-11-14-18-31l-13-31-166 166c-91 91-170 166-174 166s-7-8-7-17c0-10-4-24-9-32-6-10-33 24-98 123-88 135-89 136-111 120-13-9-25-14-27-12s29 86 69 186 70 182 67 182c-18 0-52-34-48-48 2-10-3-30-11-46-7-15-16-40-18-54-3-14-11-34-19-46-8-11-15-26-15-33s-9-32-19-56c-31-70-33-79-14-93 10-7 27-11 39-8 16 4 27-5 52-46 18-28 32-54 32-58 0-3 10-16 22-29 40-43 11-34-58 16-38 28-84 64-103 80l-33 29 22 69c12 37 28 82 35 98 7 17 23 63 36 103 18 56 39 93 87 152l62 79-19 48c-18 45-18 52-3 119 13 64 18 73 47 87 18 9 37 28 45 46 7 17 18 31 24 32 6 0 49 7 96 14 118 18 113 18 231-13zm-461-296c0-8 2-20 5-28 3-7-9-30-26-51-32-39-48-44-31-10 6 10 16 37 23 61 12 40 29 57 29 28zm1163-3c3-10 13-40 21-68l16-50-35 40c-19 22-33 46-30 53 3 8 5 20 5 28 0 20 17 17 23-3zm71-219c4-16 12-37 17-46 5-10 9-27 9-37 0-11 5-23 10-26 6-3 10-15 10-25s9-38 19-63c11-25 21-57 23-73 1-16 7-32 13-37 6-4 2-13-10-23-11-8-35-27-54-42s-44-34-57-42c-12-8-37-26-55-39-34-26-32-18 8 35 13 17 23 35 23 40s13 24 29 43c23 28 31 32 47 23 14-8 23-7 36 5 15 14 15 19-7 76-13 34-41 104-64 156-22 51-38 98-35 103 10 16 29 2 38-28zM925 805c42-41 74-75 71-75-15 0-175 133-171 141 11 17 24 9 100-66zm829 66c6-9-133-121-150-121-10 1 127 130 138 130 4 0 9-4 12-9zm-729-161c3-6-1-7-9-4-18 7-21 14-7 14 6 0 13-4 16-10zm216-125c17-19 38-35 46-35s31 16 50 35c29 29 38 33 50 24 12-11 11-16-9-33-13-12-38-32-55-44l-32-23-33 23c-66 45-78 59-65 74 16 18 13 19 48-21z"
                transform="matrix(.1 0 0 -.1 0 247)"
                fill="url(#a)"
              ></path>
              <path
                d="M760 1757c0-51 1-54 64-116l65-64-26-20c-24-19-24-21-8-33s16-17 1-90c-16-79-21-88-65-136l-25-28h36c34 0 37-2 63-65 21-50 26-73 21-104-6-39-6-39 25-37 30 1 38-8 143-156l111-157 124 2 125 2 111 155c108 149 113 155 144 152l33-2-7 40c-5 32-1 54 21 105 26 62 29 65 61 65h35l-35 41c-27 31-39 59-52 117-17 73-16 76 1 89 18 14 18 15-8 37l-26 23 64 64c63 62 64 65 64 116 0 62 5 60-125 39-66-11-101-11-200 0-183 21-197 15-30-12 86-14 182-23 225-21 74 2 75 2 78-24 2-19-12-41-58-92l-61-67 28-25c21-18 24-24 12-25-15 0-15-8 3-92 12-55 28-102 40-114 18-21 18-22 1-26-21-6-73-127-73-171 0-22-5-27-23-27-19 0-36-19-83-95-32-52-63-94-69-94-5 0-46 14-90 32-71 28-80 36-89 65-12 45 5 74 60 101 39 18 49 30 74 87l30 66-24 31c-13 18-27 49-31 69-6 34-5 38 18 43 14 4 33 5 44 3s38 13 63 35l44 37h-55c-50 0-58-3-92-38-46-47-51-100-13-151l24-32-26-64-27-64-52-7c-29-3-77-3-105 0l-53 7-26 62-26 63 23 34c16 22 24 49 24 75 0 34-6 47-38 78-34 33-43 37-92 37h-54l44-37c25-22 52-37 63-35s30 1 44-3c23-5 24-9 18-43-4-20-18-51-31-69l-24-31 30-66c25-57 35-69 74-87 55-27 72-56 60-101-8-28-19-36-96-69l-86-36-63 98c-50 77-69 99-86 99-18 0-23 6-23 27 0 44-52 165-73 171-17 4-17 5 1 26 11 11 27 55 36 96s19 83 22 93c4 12 0 17-13 17-15 1-13 5 10 25l28 25-60 67c-46 49-61 73-61 95v30l68-7c48-5 111 0 217 15 83 12 155 23 160 26 11 4-96-3-215-15-50-5-103-4-160 5-126 20-120 22-120-39zm37-4c-3-10-5-4-5 12 0 17 2 24 5 18 2-7 2-21 0-30zm318-313c3-5-3-10-14-10s-23 5-26 10c-3 6 3 10 14 10s23-4 26-10zm390 0c-3-5-13-10-21-10s-14 5-14 10c0 6 9 10 21 10 11 0 17-4 14-10zm-205-472c0-7 37-29 81-48s82-38 84-41-12-29-31-57l-35-52h-218l-29 43c-16 23-32 47-36 54-4 8 22 25 79 52 47 22 85 44 85 50s5 11 10 11c6 0 10-6 10-12z"
                transform="matrix(.1 0 0 -.1 0 247)"
                fill="url(#b)"
              ></path>
            </g>
          </svg>
          </div>
        </div>

        {/* Nav Links */}
        <div className="navbar-center lg:flex">
          <div className="flex items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>

            {publicKey ? (
              <>
              <Link href="/game">
                <a className="btn btn-ghost btn-sm rounded-btn">Lions</a>
              </Link>
              <Link href="/gamble">
                <a className="btn btn-ghost btn-sm rounded-btn">ROAR</a>
              </Link>
              <Link href="/gamble">
                <a className="btn btn-ghost btn-sm rounded-btn">Solana</a>
              </Link>
              </>
              ) : null}
          </div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end bordered">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <WalletMultiButton className="btn btn-ghost mr-2" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
