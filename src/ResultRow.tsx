import { useEffect, useState, useRef } from "react";

interface BitcoinPriceResponse {
  price: string;
  symbol: string;
}

interface ETHcoinPriceResponse {
  ethereum: {
    usd: number;
  };
  symbol: string;
}

export default function ResultRow() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const loading = true;
  const [error, setError] = useState<string | null>(null);
  const [BTCsymbol, setBTCsymbol] = useState<string>("");

  // Use refs to keep track of old prices
  const prevBtcPrice = useRef<number | null>(null);
  const prevEthPrice = useRef<number | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: BitcoinPriceResponse = await response.json();
        setBtcPrice(parseFloat(data.price));
        setBTCsymbol(data.symbol);
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

  // Update refs with the latest prices
  useEffect(() => {
    prevBtcPrice.current = btcPrice;
    prevEthPrice.current = ethPrice;
  }, [btcPrice, ethPrice]);

  return (
    <div className="relative border min-h-12 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-4 overflow-hidden h-80">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="grow">{BTCsymbol || "BTC"}</div>
          <div className="flex gap-2">
            <span
              className={`text-xl ${
                prevBtcPrice.current !== null && btcPrice !== null
                  ? btcPrice > prevBtcPrice.current
                    ? "text-green-200/95"
                    : "text-red-200/95"
                  : ""
              }`}
            >
              {btcPrice !== null ? `$${btcPrice}` : "N/A"}
            </span>
            <span className="text-xl text-purple-300/50">BTC</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="grow">ETH</div>
          <div className="flex gap-2">
            <span
              className={`text-xl ${
                prevEthPrice.current !== null && ethPrice !== null
                  ? ethPrice > prevEthPrice.current
                    ? "text-green-200/95"
                    : "text-red-200/95"
                  : ""
              }`}
            >
              {ethPrice !== null ? `$${ethPrice}` : "N/A"}
            </span>
            <span className="text-xl text-purple-300/50">ETH</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation rounded-lg inset-0 absolute" />
      )}
      {error && (
        <div className="text-red-500 mt-2">
          Error: {error}
        </div>
      )}
    </div>
  );
}
