import React from 'react';
import Header from './Header';

import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center p-10 pt-0">
      <Header />
      <div className="mt-4 w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};

export default MainContent;