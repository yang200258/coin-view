import React, { useEffect, useState } from 'react';
import BlockItem from '../../components/BLockItem';
import Skeleton from '../../components/Skeleton';
import CardBg from '../../components/CardBg';
import { getRandomList } from '../../services/fakeFetch';
import { OracleInterface, CoinItem } from '../../interface';
import { sleep } from '../../utils';
import styles from './index.module.scss';



const Oracle: React.FC<OracleInterface> = () => {
  const [clickItemIdx, setClickItemIdx] = useState<number | undefined>(undefined);
  const [coinList, setCoinList] = useState<CoinItem[]>([]);
  useEffect(() => {
    fakeFetchCoinList();
  }, []);

  const fakeFetchCoinList = async () => {
    await sleep(2500);
    const list = await getRandomList(20);
    setCoinList(list);
  }

  return (
    <div className={styles.oracleContainer}>
      <article className={styles.coinContainer}>
        <div className={styles.iconTitle}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3685 6.35969C14.9878 6.55066 15.5355 6.97525 15.8613 7.58761C16.3607 8.5262 16.1984 9.64524 15.5456 10.4118L17.5838 13.7628C18.3224 13.5571 19.1055 13.712 19.718 14.1436L21.3759 12.7589L22.2482 13.8048L20.5746 15.2057C21.0798 16.394 20.6108 17.8069 19.4512 18.4238C18.2264 19.0755 16.6871 18.6014 16.0355 17.3767C15.5191 16.4062 15.7152 15.2464 16.4247 14.4795L14.411 11.1687C13.8223 11.3592 13.1999 11.316 12.6498 11.0845L9.55375 14.8206C9.61203 14.9038 9.67444 14.9824 9.72328 15.0741C10.3749 16.2988 9.90353 17.8431 8.67876 18.4947C7.454 19.1464 5.9147 18.6722 5.26305 17.4475C4.89557 16.7569 4.89542 15.9712 5.17537 15.2966L3.03717 13.5057L3.91129 12.4651L6.01753 14.2274C6.11067 14.1599 6.2013 14.0889 6.3057 14.0333C7.00958 13.6588 7.81386 13.6642 8.49809 13.9603L11.584 10.2351C11.5203 10.1461 11.4537 10.0604 11.401 9.96116C10.7494 8.73644 11.2208 7.19218 12.4456 6.54053C13.0579 6.21467 13.749 6.16957 14.3685 6.35969Z" fill="#00D7D7"/>
            <circle cx="13" cy="13" r="12.35" stroke="#00D7D7" strokeWidth="1.3"/>
          </svg>
          <span>Oracle</span>
        </div>
        {coinList.length > 0 && (
          <div className={`grid ${styles.coinContent}`}>
            {coinList.map((item: CoinItem, idx: number) => (
            
              <BlockItem
                key={`coinList-${item.id}`}
                {...item}
                idx={idx}
                clickItemIdx={clickItemIdx}
                setClickIdx={(idx: number) => setClickItemIdx(idx)}
              />
            
          ))}
        </div>
        )}
         {coinList.length === 0 && (
          <div className={`grid ${styles.coinContent}`}>
            {new Array(20).fill(0).map((_item, idx) => (
              <Skeleton isVisible={true} key={`Skeleton-${idx}`}>
                <div className={`${styles.skeleton} grid-col-lg-6 grid-col-md-8 grid-col-sm-12 grid-col-xs-24`}>
                  <CardBg />
                </div>
              </Skeleton>
            ))}
          </div>
         )}
      </article>
    </div>

  )
}

export default Oracle;
