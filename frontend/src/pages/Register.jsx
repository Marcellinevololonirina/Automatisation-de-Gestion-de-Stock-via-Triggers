import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "USER",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("register/", form);
        alert("Compte créé !");
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
                <h2 className="text-xl mb-4">Inscription</h2>

                <input
                    placeholder="Username"
                    className="w-full mb-3 p-2 border"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <select
                    className="w-full mb-3 p-2 border"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="USER">Utilisateur</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button className="bg-indigo-600 text-white w-full p-2">
                    S'inscrire
                </button>
                <p className="text-center mt-3">
                    Vous avez déjà un compte ? <a href="/login" className="text-blue-600">Se connecter</a>
                </p>
            </form>
        </div>
    );
}