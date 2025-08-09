import { useEffect, useState } from "react";
import { getSalary } from "../api/api";

// Helper to get token from localStorage (adjust if your app uses a different method)
function getToken() {
  return localStorage.getItem("token");
}

export default function Earnings() {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSalary() {
      setLoading(true);
      setError(null);
      try {
        const token = getToken();
        const data = await getSalary(token);
        // If API returns an array, take the first item
        setSalary(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message || "Failed to fetch salary");
      } finally {
        setLoading(false);
      }
    }
    fetchSalary();
  }, []);

  // You can adjust these if your API returns more fields
  const earnings = salary
    ? [
        {
          label: "Total Salary",
          amount: salary.amount ? salary.amount.toLocaleString() : "-",
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          iconColor: "text-blue-500",
        },
        // Add more fields if your API provides them, e.g. basic, deduction, etc.
      ]
    : [];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg lg:text-xl font-bold mb-4 text-gray-800">Earnings</h2>
      {salary && salary.month && (
        <div className="mb-2 text-sm text-gray-500">
          Month: {new Date(salary.month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      )}
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-3">
          {earnings.map((item, index) => (
            <div key={index} className={`${item.bgColor} p-4 rounded-lg transition-all hover:shadow-sm`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm lg:text-base text-gray-600 mb-1">{item.label}</p>
                  <p className={`text-lg lg:text-xl font-bold ${item.textColor}`}>₹{item.amount}</p>
                </div>
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full ${item.bgColor} border-2 border-white flex items-center justify-center`}>
                  <span className={`text-lg ${item.iconColor}`}>₹</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
