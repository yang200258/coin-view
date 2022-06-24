import React, { ReactNode } from "react";
import styles from './index.module.scss';

interface CoinIcon {
  children: ReactNode;
}

const CoinLogo: React.FC<CoinIcon> = ({children}) => {
  return (
    <div className={styles.logoContainer}>
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.8" cx="35" cy="35.0002" r="35" fill="url(#paint0_linear_2_84)"/>
        <defs>
          <linearGradient id="paint0_linear_2_84" x1="70" y1="64.7562" x2="-6.31952" y2="53.8077" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2A6D"/>
            <stop offset="0.516647" stopColor="#A07EFF"/>
            <stop offset="1" stopColor="#3DFFFF"/>
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.logoContent}>
        {children}
      </div>
    </div>
  );
};

export default CoinLogo;
