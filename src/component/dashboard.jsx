import { useEffect, useState } from "react";
import { useAuth } from "../store/tracker-store";
import { db } from "../firebaseConfig/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import SummaryCards from "../component/summary-cards";
import TransactionForm from "../component/transaction-form";
import TransactionList from "../component/transaction-list";
import Charts from "../component/charts";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("date", "desc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setTransactions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>

      <SummaryCards transactions={transactions} />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TransactionForm editTx={editTx} clearEdit={() => setEditTx(null)} />
        <TransactionList transactions={transactions} onEdit={setEditTx} />
      </div>
      <Charts transactions={transactions} />
    </div>
  );
};

export default Dashboard;
