import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "USER",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post("register/", form);
            navigate("/login");
        }
        catch {
            setError("Erreur lors de la céation du compte.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-4 w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>


                <input
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white w-full p-2">
                    {loading ? 'Création...' : "S'inscrire"}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Vous avez déjà un compte ? {' '}
                    <a href="/login" className="text-indigo-600 font-medium hover:underline">
                        Se connecter
                    </a>
                </p>
            </form>
        </div>
    );
}