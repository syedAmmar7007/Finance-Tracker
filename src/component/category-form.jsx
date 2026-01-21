import { useForm } from "react-hook-form";
import { db } from "../firebaseConfig/firebase-config";
import { useAuth } from "../store/tracker-store";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const CategoryForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await addDoc(collection(db, "users", user.uid, "categories"), {
      name: data.name,
      budget: Number(data.budget),
      createdAt: Timestamp.now(),
    });
    reset();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
      <h2 className="text-lg font-semibold text-green-600 mb-4">
        Add Category
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("name", { required: true })}
          placeholder="Category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          {...register("budget", { required: true })}
          type="number"
          placeholder="Monthly budget"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold mt-2 transition"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
