import React, { useEffect, useState } from 'react';

interface cardBgProps {
  isMounseEnter?: boolean;
  clickItemIdx?: number;
  idx?: number;
}

const CardBg: React.FC<cardBgProps> = ({
  isMounseEnter,
  clickItemIdx,
  idx,
}) => {
  const [pathStyle, setPathStyle] = useState<any>(null);
  useEffect(() => {
    if (!isMounseEnter && !clickItemIdx && !idx) {
      setPathStyle(null);
    } else {
      setPathStyle({
        stroke: (isMounseEnter || clickItemIdx === idx) ? 'rgba(27, 208, 205)' : '',
        strokeWidth: (isMounseEnter || clickItemIdx === idx) ? 2 : 0,
      })
    }
  }, [clickItemIdx, idx, isMounseEnter]);

  return (
    <svg width="290" height="138" viewBox="0 0 290 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path style={pathStyle} fillRule="evenodd" clipRule="evenodd" d="M119.232 5.68785C117.571 2.21242 114.062 0 110.21 0H10C4.47715 0 0 4.47715 0 10V32.6565V128C0 133.523 4.47716 138 10 138H280C285.523 138 290 133.523 290 128V42.6565C290 37.1336 285.523 32.6565 280 32.6565H138.426C134.574 32.6565 131.064 30.4441 129.403 26.9686L119.232 5.68785Z" fill="url(#paint0_linear_2_162)" fillOpacity="0.1"/>
      <defs>
        <linearGradient id="paint0_linear_2_162" x1="290" y1="127.662" x2="-5.80454" y2="38.4867" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2A6D"/>
          <stop offset="0.516647" stopColor="#A07EFF"/>
          <stop offset="1" stopColor="#3DFFFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CardBg;
