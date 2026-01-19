import { useForm } from "react-hook-form";
import { db } from "../firebaseConfig/firebaseConfigure";
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Add Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("name", { required: true })}
          placeholder="Category name"
          className="input"
        />

        <input
          {...register("budget", { required: true })}
          type="number"
          placeholder="Monthly budget"
          className="input"
        />

        <button className="w-full bg-green-600 py-2 rounded-lg">
          Save Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
