import React from 'react';
import Header from '@/components/header';
import { ReactNode } from 'react';
import '../app/globals.css';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-primary">
      <Header />
      <div className="w-11/12 lg:w-1/2 flex flex-col items-center p-4 bg-white rounded-lg shadow-md mt-8">
        {children}
      </div>
    </main>
  );
};

export default Main;
