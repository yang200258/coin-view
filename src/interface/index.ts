export interface OracleInterface {

}

export type clientType = { clientType: number; connectionInfo: { contractAddress: string; networkId: number; } };

export interface CoinItem {
  id: number;
  blockNumber: number;
  transactionIndex: number;
  sources: number[];
  symbol: string;
  slug: string;
  leaseEnd: number;
  aggregationStrategy: number;
  reportingStrategy: number;
  status: number;
  subscriptionId: number;
  networkId: number;
  client: clientType;
  createdTimestamp: string;
  updatedTimestamp: string;
  display: boolean;
}
