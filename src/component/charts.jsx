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
const pieByCategory = transactions
  .filter((t) => Number(t.amount) > 0 && t.category)
  .reduce((acc, cur) => {
    const key = `${cur.category} (${cur.type})`; 
    acc[key] = (acc[key] || 0) + Number(cur.amount);
    return acc;
  }, {});

const pieData = {
  labels: Object.keys(pieByCategory),
  datasets: [
    {
      data: Object.values(pieByCategory),
      backgroundColor: Object.keys(pieByCategory).map(
        (_, i) => `hsl(${i * 60}, 70%, 55%)`,
      ),
    },
  ],
};

  const income = transactions
    .filter((t) => t.type === "income" && Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense" && Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#16A34A", "#DC2626"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
