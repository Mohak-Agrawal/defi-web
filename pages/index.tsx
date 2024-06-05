import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-indigo-800 min-h-screen flex flex-col items-center justify-center overflow-y-auto">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1490/1490900.png"
        className="h-36 w-36 mb-4 animate-bounce"
        alt="DeFi Application Logo"
      />
      <h1 className="text-4xl font-bold text-white mb-8 animate-fadeIn">
        Welcome to DeFi Application
      </h1>
      <div className="flex space-x-8">
        <Link href="/crypto-prices">
          <div className="bg-white rounded-md shadow-lg p-12 hover:bg-gray-100 transition duration-300 cursor-pointer transform hover:scale-110">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733300.png"
                className="h-16 w-16 mr-2 animate-fadeIn"
                alt="Crypto Prices Icon"
              />
              <h2 className="text-xl font-semibold text-gray-800 animate-fadeIn">
                Crypto Prices
              </h2>
            </div>
            <p className="text-gray-600 animate-fadeIn">
              Check live cryptocurrency prices
            </p>
          </div>
        </Link>
        <Link href="/crypto-swapping">
          <div className="bg-white rounded-md shadow-lg p-12 hover:bg-gray-100 transition duration-300 cursor-pointer transform hover:scale-110">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7051/7051977.png"
                className="h-16 w-16 mr-2 animate-fadeIn"
                alt="Crypto Swap Icon"
              />
              <h2 className="text-xl font-semibold text-gray-800 animate-fadeIn">
                Crypto Swap
              </h2>
            </div>
            <p className="text-gray-600 animate-fadeIn">
              Swap your cryptocurrencies
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
