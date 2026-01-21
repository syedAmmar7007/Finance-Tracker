const BudgetList = ({ categories, transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
      <h2 className="text-lg font-semibold text-green-600 mb-4">Budgets</h2>

      <div className="space-y-4">
        {categories.map((cat) => {
          const spent = expenses
            .filter((e) => e.category === cat.name)
            .reduce((a, b) => a + Number(b.amount || 0), 0);

          const percent = Math.min(Math.round((spent / cat.budget) * 100), 100);

          return (
            <div key={cat.id}>
              <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
                <span>{cat.name}</span>
                <span>
                  {spent} / {cat.budget} PKR
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    percent > 80
                      ? "bg-red-500"
                      : percent > 50
                        ? "bg-yellow-400"
                        : "bg-green-500"
                  } transition-all duration-300`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetList;
