"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC } from "react";

const ProgressBarProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
