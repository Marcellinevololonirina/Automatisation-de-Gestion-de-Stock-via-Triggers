import { useEffect, useState } from "react";
import api from "../api";

export default function ProduitManager() {
    const [produits, setProduits] = useState([]);
    const [design, setDesign] = useState("");

    const fetchData = async () => {
        const res = await api.get("produits/");
        setProduits(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addProduit = async (e) => {
        e.preventDefault();
        await api.post("produits/", { design, stock: 0 });
        setDesign("");
        fetchData();
    };

    const deleteProduit = async (id) => {
        await api.delete(`produits/${id}/`);
        fetchData();
    };

    const editProduit = async (id, currentStock) => {
        const newStock = prompt("Nouvelle quantité:", currentStock);

        if (newStock != null) {
            await api.patch(`produits/${id}/`, {
                stock: parseInt(newStock)
            });
            fetchData();
        }
    };


    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={addProduit} className="flex gap-2 mb-4">
                <input
                    value={design}
                    onChange={(e) => setDesign(e.target.value)}
                    placeholder="Produit"
                    className="border p-2"
                />
                <button className="bg-green-600 text-white px-3">Ajouter</button>
            </form>

            <h2 className="text-xl font-bold mb-4 text-indigo-700">Liste de produits</h2>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200 uppercase text-xs">
                        <th className="p-3">id</th>
                        <th className="p-3">Design</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Modifier</th>
                        <th className="p-3">Supprimer</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {produits.map((p) => (
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-3">{p.numero}</td>
                            <td className="p-3">{p.design}</td>
                            <td className="p-3"> {p.stock}</td>
                            <td className="p-3"> <button onClick={() => editProduit(p.numero, p.stock)} className="text-blue-500">
                                Modifier
                            </button></td>
                            <td className="p-3">
                                <button onClick={() => {
                                    if (window.confirm("Voulez-vous supprimer ce produit ?")) {
                                        deleteProduit(p.numero)
                                    }
                                }}
                                    className="text-red-500">
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