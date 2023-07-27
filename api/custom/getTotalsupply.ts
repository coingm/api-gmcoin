export default async function totalsupply(
  tokenID: number
): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.trongrid.io/v1/assets/${tokenID}`,
      { method: "GET" }
    );

    if (!response.ok) {
      return null;
    }
    const response_data = await response.json();
    const totalsupply = response_data?.data[0]?.total_supply;
    const totalsupplyF = totalsupply / 10 ** 2;
    return totalsupplyF;
  } catch (_err) {
    console.error(_err);
    return null;
  }
}
