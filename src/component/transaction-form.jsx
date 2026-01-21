import { useForm } from "react-hook-form";
import { useAuth } from "../store/tracker-store";
import { db } from "../firebaseConfig/firebase-config";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";

const TransactionForm = ({ editTx, clearEdit }) => {
  const { user } = useAuth();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      type: "expense",
    },
  });

  useEffect(() => {
    if (!editTx) return;

    setValue("amount", editTx.amount);
    setValue("type", editTx.type);
    setValue("category", editTx.category || "");
    setValue(
      "date",
      editTx.date
        ? new Date(editTx.date.seconds * 1000).toISOString().split("T")[0]
        : "",
    );
  }, [editTx, setValue]);

  const onSubmit = async (data) => {
    const amount = data.amount;

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const payload = {
      amount,
      type: data.type || "expense",
      category: data.category?.trim() || null,
      date: data.date
        ? Timestamp.fromDate(new Date(data.date))
        : Timestamp.now(),
    };

    try {
      if (editTx) {
        await updateDoc(
          doc(db, "users", user.uid, "transactions", editTx.id),
          payload,
        );
        clearEdit();
      } else {
        await addDoc(collection(db, "users", user.uid, "transactions"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
      }

      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
      <h2 className="text-lg font-semibold text-green-600 mb-4">
        {editTx ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", { valueAsNumber: true })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          {...register("type")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          placeholder="Category (Food, Salary, Travel)"
          {...register("category")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="date"
          {...register("date")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-lg">
          {editTx ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
