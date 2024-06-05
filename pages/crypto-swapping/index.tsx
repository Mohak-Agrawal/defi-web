import { useState } from "react";
import PriceView from "../Price";
import QuoteView from "../Quote";
import type { PriceResponse } from "../api/types";
import { useAccount } from "wagmi";

export default function Home() {
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [finalize, setFinalize] = useState(false);
  const [price, setPrice] = useState<PriceResponse | undefined>();
  const [quote, setQuote] = useState();
  const { address } = useAccount();

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        {finalize && price ? (
          <QuoteView
            takerAddress={address}
            price={price}
            quote={quote}
            setQuote={setQuote}
          />
        ) : (
          <PriceView
            takerAddress={address}
            price={price}
            setPrice={setPrice}
            setFinalize={setFinalize}
          />
        )}
      </div>
    </main>
  );
}
