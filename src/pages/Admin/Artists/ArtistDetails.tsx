import { Music, User, Calendar, Tag, CreditCard, Download } from "lucide-react";

export default function ArtistDetailsUI() {
  // Placeholder artist details
  const artistDetails = {
    name: "King Promise",
    genre: "Afrobeat",
    registrationDate: "2022-07-10",
    recordLabel: "Legacy Life Entertainment",
  };

  // Placeholder recent payments
  const recentPayments = [
    { id: "PAY-KP001", period: "Jan 2025", amount: "Ghc 2,800", status: "Paid", report: "Download" },
    { id: "PAY-KP002", period: "Feb 2025", amount: "Ghc 3,150", status: "Paid", report: "Download" },
    { id: "PAY-KP003", period: "Mar 2025", amount: "Ghc 2,900", status: "Pending", report: "Download" },
  ];

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center mb-2">
          <User className="w-6 h-6 mr-2" /> {artistDetails.name}
        </h2>
        <p className="text-gray-500 flex items-center">
          <Music className="w-4 h-4 mr-1" /> {artistDetails.genre}
        </p>
        <p className="text-gray-500 flex items-center">
          <Calendar className="w-4 h-4 mr-1" /> Registered on {artistDetails.registrationDate}
        </p>
        {artistDetails.recordLabel && (
          <p className="text-gray-500 flex items-center">
            <Tag className="w-4 h-4 mr-1" /> Record Label: {artistDetails.recordLabel}
          </p>
        )}
        {/* Add more static artist details here */}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Payments</h3>
        <div className="bg-indigo-950 rounded-md shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-800">
                <th className="text-left py-3 px-4 font-medium">Payment ID</th>
                <th className="text-left py-3 px-4 font-medium">Period</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Report</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-indigo-800 hover:bg-indigo-900/20"
                >
                  <td className="py-3 px-4">{payment.id}</td>
                  <td className="py-3 px-4">{payment.period}</td>
                  <td className="py-3 px-4">{payment.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        payment.status === "Paid" ? "bg-green" : "bg-gray text-gray-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="flex items-center text-gray-300 hover:text-white">
                      <Download className="w-4 h-4 mr-1" /> {payment.report}
                    </button>
                  </td>
                </tr>
              ))}
              {recentPayments.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                    No recent payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Tracks and Royalties</h3>
        <div className="bg-indigo-950 rounded-md shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-800">
                <th className="text-left py-3 px-4 font-medium">Track Title</th>
                <th className="text-left py-3 px-4 font-medium">Total Plays</th>
                <th className="text-left py-3 px-4 font-medium">Royalty Earned</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder track data */}
              {[
                { title: "Adoley", plays: 125000, royalty: "Ghc 1,250" },
                { title: "Selfish", plays: 98000, royalty: "Ghc 980" },
                { title: "CCTV", plays: 150000, royalty: "Ghc 1,500" },
              ].map((track, index) => (
                <tr
                  key={index}
                  className="border-b border-indigo-800 hover:bg-indigo-900/20"
                >
                  <td className="py-3 px-4">{track.title}</td>
                  <td className="py-3 px-4">{track.plays.toLocaleString()}</td>
                  <td className="py-3 px-4">{track.royalty}</td>
                </tr>
              ))}
              {/* Add more track data here */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add more UI sections as needed, e.g., Performance Metrics, Bank Details */}
    </div>
  );
}