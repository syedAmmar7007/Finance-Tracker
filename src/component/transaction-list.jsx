import { db } from "../firebaseConfig/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../store/tracker-store";

const TransactionList = ({ transactions,onEdit,selectedDate }) => {
  const { user } = useAuth();
const filteredTransactions = transactions
  .filter((t) =>
    selectedDate
      ? new Date(t.date.seconds * 1000).toDateString() === selectedDate
      : true,
  );

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;

    await deleteDoc(doc(db, "users", user.uid, "transactions", id));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
      <h2 className="text-lg font-semibold text-green-600 mb-4">
        Transactions
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{t.category}</p>
              <p className="text-xs text-gray-500">
                {new Date(t.date.seconds * 1000).toDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p
                className={
                  t.type === "income"
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {t.type === "income" ? "+" : "-"} PKR {t.amount}
              </p>

              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(t)}
                className="text-blue-500 text-sm hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
