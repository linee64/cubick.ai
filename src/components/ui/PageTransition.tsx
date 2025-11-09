import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

// Lightweight page enter animation wrapper: applies a class on mount
const PageTransition: React.FC<Props> = ({ className = "", children }) => {
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    // trigger enter on mount
    const t = setTimeout(() => setEnter(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${className} ${enter ? "motion-enter" : ""}`}>{children}</div>
  );
};

export default PageTransition;