import { CoinItem } from "../interface";
import { getRandomTime, getRandomId } from '../utils/index';
/**
 * generate random card list.
 * @param  {number} itemNumber
 * @returns Promise<CoinItem[]>
 */
export const getRandomList = async (itemNumber: number): Promise<CoinItem[]> => {
  let itemList = [];
  for (let i = 0; i < itemNumber; i++) {
    // get the create time for updatetime
    const createdTimestamp = getRandomTime(i);
    itemList.push({
      id: getRandomId(i),
      blockNumber: 12297450,
      transactionIndex: 6,
      sources: [0, 1, 2, 3],
      symbol: "eth",
      slug: "ethereum",
      leaseEnd: 12499050,
      subscriptionId: 7,
      networkId: 0,
      aggregationStrategy: 1,
      reportingStrategy: 0,
      status: Math.floor(Math.random() * 10) % 2,
      client: {
        clientType: 0,
        connectionInfo: {
          contractAddress: "0x0F9dfd6043965B02e74D01188c13936fBE71D688",
          networkId: 0,
        },
      },
      createdTimestamp,
      updatedTimestamp: getRandomTime(i, createdTimestamp),
      display: true
    })
  }
  return itemList;
}
/**
 * generate each coin price.
 * @param  {number} subscriptionId
 * @returns Promise
 */
export const fakeFetchCoinPrice = async (subscriptionId: number): Promise<number> => {
  return 3412025.12;
}

/**
 * generate each coin logo.
 * @param  {number} subscriptionId
 * @returns Promise
 */
 export const fakeFetchCoinLogo = async (subscriptionId: number): Promise<string | SVGAElement> => {
  return '';
}
