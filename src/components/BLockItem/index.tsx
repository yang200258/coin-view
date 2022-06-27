import React, { useCallback, useEffect, useState } from 'react';
import CoinLogo from '../CoinLogo';
import CardBg from '../CardBg';
import { sleep, transformPrice } from '../../utils';
import { fakeFetchCoinPrice, fakeFetchCoinLogo } from '../../services/fakeFetch';
import { CoinItem } from '../../interface';
import styles from './index.module.scss';


const BlockItem: React.FC<CoinItem & { clickItemIdx: undefined | number; setClickIdx: (idx: number) => void; idx: number }> = ({
  symbol,
  status,
  setClickIdx,
  clickItemIdx,
  idx,
  subscriptionId,
  createdTimestamp,
  leaseEnd,
  blockNumber,
}) => {
  const statusColorMap = ['#76FCB3', '#FF007A', '#FFE500',]
  const statusMap = ['Active', 'Terminated', 'Suspended'];
  const [isMounseEnter, setIsMouseEnter] = useState<boolean>(false);
  const [coinPrice, setCoinPrice] = useState<string>('');
  const [expireDate, setExpireDate] = useState<string>('');
  const [coinLogo, setCoinLogo] = useState<string | SVGAElement>('');

  const calExpireDate = useCallback(() => {
    const dateLs = new Date(new Date(createdTimestamp).getTime() + 3 * 1000 * (leaseEnd - blockNumber)).toUTCString().split(' ');
    return `${dateLs[1]}/${dateLs[2]}/${dateLs[3]} ${dateLs[4].split(':')[0]}:${dateLs[4].split(':')[1]}`
  }, [blockNumber, createdTimestamp, leaseEnd]);
  
  useEffect(() => {
    setExpireDate(calExpireDate())
  }, [calExpireDate]);

  useEffect(() => {
    const getCoinPrice = async (subscriptionId: number) => {
      sleep(1000);
      const price = await fakeFetchCoinPrice(subscriptionId);
      setCoinPrice(transformPrice(price));
    }
  
    const getCoinLogo = async (subscriptionId: number) => {
      sleep(1000);
      const logo = await fakeFetchCoinLogo(subscriptionId);
      setCoinLogo(logo);
    }
    
    getCoinPrice(subscriptionId);
    getCoinLogo(subscriptionId);
  }, [subscriptionId]);

  return (
    <div
      className={`${styles.blockItem} grid-col-lg-6 grid-col-md-8 grid-col-sm-12 grid-col-xs-24`}
    >
    <div
      className={styles.box}
      onMouseEnter={e => setIsMouseEnter(true)}
      onMouseLeave={e => setIsMouseEnter(false)}
      onClick={e => setClickIdx(idx)}
    >
      <CardBg isMounseEnter={isMounseEnter} clickItemIdx={clickItemIdx} idx={idx} />
    </div>
    <div className={styles.content}>
      <header className={styles.header}>
        <span>{symbol.toUpperCase()}</span>
        <div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="6.5" stroke={statusColorMap[status]} />
            <circle opacity="0.5" cx="9" cy="9" r="8.75" stroke={statusColorMap[status]} strokeWidth="0.5"/>
            <circle cx="9" cy="9" r="4" fill={statusColorMap[status]} />
          </svg>
          <span
            className={styles.status}
            style={{
              color: statusColorMap[status]
            }}
          >{statusMap[status]}</span>
        </div>
      </header>
      <section>
        <div className={styles.coinLogo}>
          <CoinLogo>
            {(coinLogo && typeof(coinLogo) === 'string') ? <img src={coinLogo} alt="" /> : (
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30.9999" cy="31.0002" r="29.2464" fill="white" stroke="black" strokeWidth="2.57111"/>
              <circle cx="31.3208" cy="30.6784" r="24.4255" stroke="black" strokeWidth="1.92833" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.02 2.92"/>
              <path d="M21.3697 40.6802C19.9754 40.5656 18.839 40.3555 17.9604 40.0499C17.1009 39.7252 16.4611 39.4578 16.0409 39.2477L17.2728 35.953C17.9413 36.2777 18.7339 36.5738 19.6507 36.8411C20.5866 37.1085 21.5702 37.2422 22.6016 37.2422C23.7667 37.2422 24.5593 37.0894 24.9795 36.7838C25.4188 36.4592 25.6384 36.0103 25.6384 35.4373C25.6384 35.0744 25.5525 34.7688 25.3806 34.5205C25.2087 34.2531 24.9604 34.0144 24.6357 33.8043C24.311 33.5942 23.9004 33.3937 23.4038 33.2027C22.9072 32.9926 22.3342 32.7729 21.6848 32.5437C21.0545 32.3145 20.4338 32.0662 19.8226 31.7988C19.2305 31.5123 18.6862 31.1685 18.1896 30.7675C17.7121 30.3664 17.3205 29.8793 17.0149 29.3063C16.7284 28.7142 16.5852 28.0076 16.5852 27.1863C16.5852 26.556 16.6711 25.9543 16.843 25.3813C17.034 24.7893 17.3205 24.2545 17.7025 23.777C18.0845 23.2995 18.5811 22.8984 19.1923 22.5737C19.8035 22.2299 20.5293 21.9816 21.3697 21.8288V18.7347H24.9795V21.7142C25.9727 21.8097 26.8226 21.953 27.5293 22.144C28.2551 22.335 28.8281 22.5259 29.2483 22.7169L28.3601 26.1549C27.7299 25.8875 26.9945 25.6583 26.1541 25.4673C25.3328 25.2763 24.4638 25.1808 23.547 25.1808C22.6302 25.1808 21.9713 25.3336 21.5702 25.6392C21.1691 25.9448 20.9686 26.3459 20.9686 26.8425C20.9686 27.1481 21.0259 27.4155 21.1405 27.6447C21.2742 27.8548 21.4747 28.0458 21.7421 28.2176C22.0095 28.3895 22.3342 28.5614 22.7162 28.7333C23.1173 28.8861 23.5948 29.058 24.1487 29.249C24.9891 29.5546 25.7626 29.8889 26.4693 30.2518C27.1951 30.6147 27.8158 31.0348 28.3315 31.5123C28.8663 31.9707 29.2769 32.5151 29.5634 33.1454C29.869 33.7757 30.0218 34.511 30.0218 35.3514C30.0218 35.9244 29.9359 36.4974 29.764 37.0703C29.5921 37.6242 29.3056 38.1399 28.9045 38.6174C28.5034 39.0949 27.9782 39.5056 27.3288 39.8493C26.6985 40.1931 25.9154 40.4414 24.9795 40.5942V44.0895H21.3697V40.6802ZM37.6529 40.6802C36.2586 40.5656 35.1222 40.3555 34.2436 40.0499C33.3841 39.7252 32.7443 39.4578 32.3241 39.2477L33.556 35.953C34.2245 36.2777 35.0171 36.5738 35.9339 36.8411C36.8698 37.1085 37.8534 37.2422 38.8848 37.2422C40.0499 37.2422 40.8425 37.0894 41.2627 36.7838C41.702 36.4592 41.9217 36.0103 41.9217 35.4373C41.9217 35.0744 41.8357 34.7688 41.6638 34.5205C41.4919 34.2531 41.2436 34.0144 40.9189 33.8043C40.5942 33.5942 40.1836 33.3937 39.687 33.2027C39.1904 32.9926 38.6174 32.7729 37.968 32.5437C37.3377 32.3145 36.717 32.0662 36.1058 31.7988C35.5137 31.5123 34.9694 31.1685 34.4728 30.7675C33.9953 30.3664 33.6037 29.8793 33.2982 29.3063C33.0117 28.7142 32.8684 28.0076 32.8684 27.1863C32.8684 26.556 32.9544 25.9543 33.1263 25.3813C33.3173 24.7893 33.6037 24.2545 33.9857 23.777C34.3677 23.2995 34.8643 22.8984 35.4755 22.5737C36.0867 22.2299 36.8125 21.9816 37.6529 21.8288V18.7347H41.2627V21.7142C42.2559 21.8097 43.1058 21.953 43.8125 22.144C44.5383 22.335 45.1113 22.5259 45.5315 22.7169L44.6434 26.1549C44.0131 25.8875 43.2777 25.6583 42.4373 25.4673C41.6161 25.2763 40.747 25.1808 39.8302 25.1808C38.9135 25.1808 38.2545 25.3336 37.8534 25.6392C37.4523 25.9448 37.2518 26.3459 37.2518 26.8425C37.2518 27.1481 37.3091 27.4155 37.4237 27.6447C37.5574 27.8548 37.7579 28.0458 38.0253 28.2176C38.2927 28.3895 38.6174 28.5614 38.9994 28.7333C39.4005 28.8861 39.878 29.058 40.4319 29.249C41.2723 29.5546 42.0458 29.8889 42.7525 30.2518C43.4783 30.6147 44.099 31.0348 44.6147 31.5123C45.1495 31.9707 45.5601 32.5151 45.8466 33.1454C46.1522 33.7757 46.305 34.511 46.305 35.3514C46.305 35.9244 46.2191 36.4974 46.0472 37.0703C45.8753 37.6242 45.5888 38.1399 45.1877 38.6174C44.7866 39.0949 44.2614 39.5056 43.612 39.8493C42.9817 40.1931 42.1986 40.4414 41.2627 40.5942V44.0895H37.6529V40.6802Z" fill="black"/>
            </svg>
            )}
          </CoinLogo>
        </div>
        <div className={styles.coinContent}>
          <span className={styles.coinPrice}>{coinPrice}</span>
          <span className={styles.expireDate}>End:{expireDate}</span>
        </div>
      </section>
    </div>
    </div>
  )
}

export default BlockItem;
