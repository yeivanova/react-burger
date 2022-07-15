import React from "react";

export type TContextType = {
  isMobile: boolean;
  changeIsMobile: (isMobile: boolean) => void;
};

const initialContext: TContextType = {
  isMobile: false,
  changeIsMobile: (): void => {
    throw new Error("setContext function must be overridden");
  },
};

export const MobileContext = React.createContext<TContextType>(initialContext);
