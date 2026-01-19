import { useForm } from "react-hook-form";
import { useAuth } from "../store/tracker-store";
import { db } from "../firebaseConfig/firebase-config";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const TransactionForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await addDoc(collection(db, "users", user.uid, "transactions"), {
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      date: Timestamp.fromDate(new Date(data.date)),
      createdAt: Timestamp.now(),
    });
    reset();
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("amount", { required: true })}
          placeholder="Amount"
          type="number"
          className="input"
        />

        <select {...register("type", { required: true })} className="input">
          <option value="income">
            Income
          </option>
          <option value="expense">
            Expense
          </option>
        </select>

        <input
          {...register("category")}
          placeholder="Category (Food, Travel...)"
          className="input"
        />

        <input {...register("date")} type="date" className="input" />

        <button className="w-full bg-blue-600 py-2 rounded-lg">Add</button>
      </form>
    </div>
  );
};

export default TransactionForm;
