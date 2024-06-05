import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

const CryptoPricesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<any>({});

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              // per_page: 20, // Number of cryptocurrencies to fetch
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoPrices(response.data);
        setLoading(false);
        fetchHistoricalData(response.data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
        setLoading(false);
      }
    };

    const fetchHistoricalData = async (cryptos: CryptoPrice[]) => {
      const historicalDataPromises = cryptos.map((crypto) =>
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: "7", // Last 7 days
            },
          }
        )
      );

      try {
        const historicalDataResponses = await Promise.all(
          historicalDataPromises
        );
        const historicalData = cryptos.reduce((acc, crypto, index) => {
          acc[crypto.id] = historicalDataResponses[index].data.prices;
          return acc;
        }, {});

        setHistoricalData(historicalData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchCryptoPrices();
  }, []);

  const filteredCryptoPrices = cryptoPrices.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto mb-4">
          <input
            type="text"
            placeholder="Search for a cryptocurrency"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="spinner-border text-blue-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCryptoPrices.map((crypto) => (
              <div
                key={crypto.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center">
                  {crypto.name}
                </h2>
                <p className="text-gray-600 text-center">
                  {crypto.symbol.toUpperCase()}
                </p>
                <p className="text-2xl font-bold mt-2 text-center">
                  ${crypto.current_price}
                </p>
                {historicalData[crypto.id] && (
                  <div className="mt-4">
                    <Line
                      data={{
                        labels: historicalData[crypto.id].map((entry: any) =>
                          new Date(entry[0]).toLocaleDateString()
                        ),
                        datasets: [
                          {
                            label: "Price",
                            data: historicalData[crypto.id].map(
                              (entry: any) => entry[1]
                            ),
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: true,
                            text: "Last 7 Days",
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoPricesPage;
