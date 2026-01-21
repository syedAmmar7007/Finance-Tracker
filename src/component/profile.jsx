import { useAuth } from "../store/tracker-store";

const Profile = ({ transactions }) => {
const { profile } = useAuth();
console.log("PROFILE DATA:", profile);

  if (!profile) return null;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount || 0), 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
      <p className="text-gray-600">{profile.email}</p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-100 p-3 rounded">Income: {income}</div>
        <div className="bg-red-100 p-3 rounded">Expense: {expense}</div>
        <div className="bg-blue-100 p-3 rounded">
          Budget: {profile.monthlyBudget}
        </div>
      </div>
    </div>
  );
};

export default Profile;
