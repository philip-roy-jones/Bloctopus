import React from 'react';
import Header from './Header';

import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center p-10 pt-0 w-full">
      <Header />
      <div className="mt-4 w-full">
        {children}
      </div>
    </div>
  );
};

export default MainContent;