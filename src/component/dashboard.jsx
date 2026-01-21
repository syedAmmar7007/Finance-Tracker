import { useEffect, useState } from "react";
import { useAuth } from "../store/tracker-store";
import { db } from "../firebaseConfig/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import SummaryCards from "../component/summary-cards";
import TransactionForm from "../component/transaction-form";
import TransactionList from "../component/transaction-list";
import Charts from "../component/charts";
import CategoryForm from "./category-form";
import BudgetList from "./budget-list";
import Profile from "./profile";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [categories, setCategories] = useState([]);

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
    useEffect(() => {
      if (!user) return;

      const q = collection(db, "users", user.uid, "categories");
      return onSnapshot(q, (snap) => {
        setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      });
    }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#0F172A] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-linear-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </div>

      <SummaryCards transactions={transactions} />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <TransactionForm editTx={editTx} clearEdit={() => setEditTx(null)} />
        <TransactionList transactions={transactions} onEdit={setEditTx}  />
      </div>

      <Charts transactions={transactions} />
      <Profile transactions={transactions} />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <CategoryForm />
        <BudgetList categories={categories} transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
