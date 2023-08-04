export default async function getBalance(
  address: string,
  tokenID: number
): Promise<number> {
  try {
    const response = await fetch(
      `https://apilist.tronscan.org/api/account?address=${address}`,
      { method: "GET", cache: "no-cache" }
    );

    if (!response.ok) {
      return 0;
    }
    const response_data = await response.json();
    const tokenList = response_data?.tokenBalances;

    const foundTokenObj = tokenList.find(
      (o) => o["tokenId"] === tokenID.toString();
    );

    //console.log(foundTokenObj);
    const parseFoundToken = +foundTokenObj?.balance;
    //console.log(parseFoundToken);
    const parseFoundTokenF = parseFoundToken / 10 ** 2;
    //const getTotalcoinsF = await totalsupply(tokenID);
    // if (getTotalcoinsF == null) {
    //   return 0;
    // }
    //const circulatingsupply = getTotalcoinsF - parseFoundTokenF;
    return parseFoundTokenF;
  } catch (_err) {
    console.error(_err);
    return 0;
  }
}
