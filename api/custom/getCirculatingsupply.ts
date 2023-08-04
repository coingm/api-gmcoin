import totalsupply from "./getTotalsupply";
import getBalance from "./getBalance";

export default async function circulatingsupply(
  address: string[],
  tokenID: number
): Promise<number | null> {
  try {
    if (address.length <= 0) {
      return 0;
    }

    let removableTokens: number[] = [];
    let sum = 0;

    for (let key in address) {
      let tokens = await getBalance(address[key], tokenID);
      console.log(tokens);
      removableTokens.push(tokens);
      await new Promise(f => setTimeout(f, 1000));
    }

    for (let i = 0; i < removableTokens.length; i++) {
      sum += removableTokens[i];
    }

    const tcoins = await totalsupply(tokenID);

    //console.log(tcoins);
    //console.log(sum);
    //console.log(removableTokens);
    //console.log(tcoins - sum);

    if (tcoins == null) {
      return null;
    }

    const ccoins = tcoins - sum;
    return ccoins;
  } catch (_err) {
    console.error(_err);
    return null;
  }
}
