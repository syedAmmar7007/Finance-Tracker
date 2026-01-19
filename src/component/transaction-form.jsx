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
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (editTx) {
      reset({
        amount: editTx.amount,
        type: editTx.type,
        category: editTx.category,
        date: new Date(editTx.date.seconds * 1000).toISOString().split("T")[0],
      });
    }
  }, [editTx, reset]);

  const onSubmit = async (data) => {
    const payload = {
      amount: Number(data.amount),
      type: data.type,
      category: data.category || "General",
      date: data.date
        ? Timestamp.fromDate(new Date(data.date))
        : Timestamp.now(),
    };

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
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">
        {editTx ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("amount", { required: true })}
          type="number"
          placeholder="Amount"
          className="input"
        />

        <select
          {...register("type", { required: true })}
          defaultValue="expense"
          className="input"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          {...register("category")}
          placeholder="Category"
          className="input"
        />

        <input {...register("date")} type="date" className="input" />

        <button className="w-full bg-blue-600 py-2 rounded-lg">
          {editTx ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
