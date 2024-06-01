// Header.tsx

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-primary py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Product Manager</h1>
        <nav>
          <ul className="flex">
            <li className="mx-4">
              <Link href="/">
                <span className="text-white cursor-pointer hover:underline">Home</span>
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/profile">
                <span className="text-white cursor-pointer hover:underline">Profile</span>
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/products">
                <span className="text-white cursor-pointer hover:underline">Products</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
