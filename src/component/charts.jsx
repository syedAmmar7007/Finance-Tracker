import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const Charts = ({ transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");

  const byCategory = expenses.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
      },
    ],
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = expenses.reduce((a, b) => a + b.amount, 0);

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6 text-lg">
      <div className="bg-zinc-900 p-4 rounded-xl">
        <Pie data={pieData} />
      </div>
      <div className="bg-zinc-900 p-4 rounded-xl">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
