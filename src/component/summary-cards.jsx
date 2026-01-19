const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Income" value={income} color="green" />
      <Card title="Expense" value={expense} color="red" />
      <Card title="Balance" value={balance} color="blue" />
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
    <p className="text-zinc-400 text-sm">{title}</p>
    <h2 className={`text-2xl font-bold text-${color}-400`}>PKR {value}</h2>
  </div>
);

export default SummaryCards;
