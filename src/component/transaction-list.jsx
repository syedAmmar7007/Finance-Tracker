import { db } from "../firebaseConfig/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../store/tracker-store";

const TransactionList = ({ transactions }) => {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;

    await deleteDoc(doc(db, "users", user.uid, "transactions", id));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      <div className="space-y-3 max-h-100 overflow-y-auto">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{t.category}</p>
              <p className="text-xs text-zinc-400">
                {new Date(t.date.seconds * 1000).toDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p
                className={
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }
              >
                {t.type === "income" ? "+" : "-"} PKR {t.amount}
              </p>

              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
