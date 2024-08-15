import React, { useEffect, useState } from "react";

interface BitcoinPriceResponse {
  price: string;
  symbol: string;
}

interface ETHcoinPriceResponse {
  ethereum: {
    usd: number;
  };
  symbol:string;
}

export default function ResultRow() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const loading: boolean = true;
  const [error, setError] = useState<string | null>(null);
  const [BTCsymbol, setBTCsymbol] = useState("");

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: BitcoinPriceResponse = await response.json();
        setBtcPrice(parseFloat(data.price));
        setBTCsymbol(data.symbol)
        
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ETHcoinPriceResponse = await response.json();
        setEthPrice(data.ethereum.usd);
        
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchBitcoinPrice();
    fetchEthPrice();

    const intervalId = setInterval(() => {
      fetchBitcoinPrice();
      fetchEthPrice();
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);
  let oldBTCprice:number|null = btcPrice;
  let oldETHprice:number|null = ethPrice;
  return (
    <div className="relative border min-h-12 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-4 overflow-hidden h-80">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="grow">{`${BTCsymbol}`}</div>
          <div className="flex gap-2">
          <span
  className={`text-xl ${
    oldBTCprice !== null && btcPrice !== null
      ? btcPrice > oldBTCprice
        ? "text-green-200/95"
        : "text-red-200/95"
      : ""
  }`}
>
  {btcPrice ? `$${btcPrice}` : "N/A"}
</span>
            <span className="text-xl text-purple-300/50">BTC</span>
          </div>
        </div>

        <div className="flex gap-4 py-40">
          <div className="grow">ETHUSDT</div>
          <div className="flex gap-2">
          <span
  className={`text-xl ${
    oldETHprice !== null && btcPrice !== null
      ? btcPrice > oldETHprice
        ? "text-green-200/95"
        : "text-red-200/95"
      : ""
  }`}
>
  {ethPrice ? `$${ethPrice}` : "N/A"}
</span>
            <span className="text-xl text-purple-300/50">ETH</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation rounded-lg inset-0 absolute" />
      )}

      
    </div>
  );
}
