import { useEffect, useState } from "react";
import api from "../api";

export default function FournisseurManager() {
    const [data, setData] = useState([]);
    const [nom, setNom] = useState("");

    const fetchData = async () => {
        const res = await api.get("fournisseurs/");
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        await api.post("fournisseurs/", { nom });
        setNom("");
        fetchData();
    };

    const remove = async (id) => { 
        await api.delete(`fournisseurs/${id}/`);
        fetchData();
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">

            <form onSubmit={add} className="flex gap-2 mb-4">
                <input value={nom} onChange={(e) => setNom(e.target.value)}
                    className="border p-2"
                    placeholder="Fournisseur"
                />
                <button className="bg-green-600 text-white px-3">Ajouter</button>
            </form>

            <h2 className="text-xl font-bold mb-4 text-indigo-700">Liste de fournisseurs</h2>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200 uppercase text-xs">
                        <th className="p-3">id</th>
                        <th className="p-3">nom</th>
                        <th className="p-3">Modifier</th>
                        <th className="p-3">Supprimer</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((f) => (
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3">{f.numero}</td>
                            <td className="p-3">{f.nom}</td>
                            <td className="p-3"> <button onClick={() => edit(p.numero)} className="text-blue-500">
                                Modifier
                            </button></td>
                            <td className="p-3">
                                <button onClick={() => {
                                    if (window.confirm("Voulez-vous supprimer cette fournisseur ?")) {
                                        remove(f.numero)
                                    }
                                }}
                                    className="text-red-500"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}