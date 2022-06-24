/**
 * make time sleep.
 * @param  {number} time
 */
export const sleep = async (time: number) => {
  return new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * generate random id form index.
 * @param  {number} idx
 * @returns number
 */
export const getRandomId = (idx: number): number => {
  let id;
  const coinIds = JSON.parse(window.sessionStorage.getItem('coinIds') || '[]') || [];
  id = Math.floor(Math.random() * 100000 * ++idx + new Date().getTime() / 1000000);
  if (coinIds.includes(id)) {
    id = getRandomId(idx);
  }
  window.localStorage.setItem('coinIds', JSON.stringify(coinIds.push(id)));
  return id;
}

/**
 * generate timestamp for index and first timestamp(optional).
 * @param  {number} idx
 * @param  {string} createdTimestamp?
 * @returns string
 */
export const getRandomTime = (idx: number, createdTimestamp?: string): string => {
  if (createdTimestamp) {
    return new Date(new Date(createdTimestamp).getTime()+ (idx + 1) * Math.random() * 100000000).toISOString();
  }
  const nowTime = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * idx * 10000)
  return new Date(nowTime - randomNumber).toISOString();
}

/**
 * format price.
 * @param  {number} price
 * @returns string
 */
export const transformPrice = (price: number): string => {
  const intPart = String(price).split('.')[0];
  const floatPart = String(price).split('.')[1];
  return '$' + String(intPart)
  .split('')
  .reverse()
  .reduce((prev, next, index) => {
    return (index % 3 ? next : next + ',') + prev;
  }) + (floatPart ? `.${floatPart}` : '');
}