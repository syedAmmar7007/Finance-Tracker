const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Income" value={income} color="green" />
      <Card title="Expense" value={expense} color="red" />
      <Card title="Balance" value={balance} color="teal" />
    </div>
  );
};

const Card = ({ title, value, color }) => {
  const colorClass = {
    green: "text-green-600",
    red: "text-red-500",
    teal: "text-teal-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${colorClass[color]}`}>PKR {value}</h2>
    </div>
  );
};

export default SummaryCards;
