import { FC } from 'react';
import Link from "next/link";
import { useWallet } from '@solana/wallet-adapter-react';

export const ContentContainer: FC = props => {
  const { publicKey } = useWallet();

  return (
    <div className="flex-1 drawer h-52">
      <input id="my-drawer" type="checkbox" className="grow drawer-toggle" />
      <div className="flex flex-col items-center  drawer-content">
        {props.children}
      </div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
          <li>
            <h1>Menu</h1>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {publicKey ? (
              <>
              <li>
                <Link href="/game">
                  <a>Plinko</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a>Gallery</a>
                </Link>
              </li>
              </>
              ) : null}
        </ul>
      </div>
    </div>
  );
};
