import { useEffect, useState } from "react";
import api from "../api";

export default function Profil() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        role: "",
        photo: null
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [password, setPassword] = useState("");

    // Charger profil
    useEffect(() => {
        api.get("profile/").then(res => {
            setUser(res.data);
        });
    }, []);

    //Preview image avant upload
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        if (selected) {
            setPreview(URL.createObjectURL(selected));
        }
    }

    // Modifier profil
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("email", user.email);

            if (file) {
                formData.append("photo", file);
            }

            await api.put("profile/", FormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Profil mis à jour");

            //reload profil
            const res = await api.get("profile/");
            setUser(res.data);
            setPreview(null);

        } catch (err) {
            console.error(err);
            alert("Erreur lors de la mise à jour");
        }
    };

    // Modifier mot de passe
    const handlePassword = async (e) => {
        e.preventDefault();

        try {
            await api.put("change-password/", { password });
            alert("Mot de passe modifié");
            setPassword("");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la mise à jour");
        }
    };

    return (
        <div className="shadow-md rounded-lg p-6 max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-indigo-700"> 👤 Profil</h2>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={
                        preview
                            ? preview
                            : user.photo
                                ? `http://127.0.0.1:8000${user.photo}`
                                : "https://via.placeholder.com/100"
                    }
                    alt="profil"
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-3"
                />
            </div>

            {/* FORM PROFIL */}
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Username"
                />

                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                />

                <div className="text-sm text-gray-600">
                    Rôle : <span className="font-bold text-indigo-600">{user.role}</span>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Modifier profil
                </button>
            </form>

            {/* FORM PASSWORD */}
            <form onSubmit={handlePassword} className="mt-6 space-y-4">

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Nouveau mot de passe"
                />

                <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Changer mot de passe
                </button>
            </form>
        </div>
    );
}