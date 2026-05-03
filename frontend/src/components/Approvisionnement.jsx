import { useEffect, useState } from "react";
import api from "../api";

export default function ApprovisionnementManager() {
  const [data, setData] = useState([]);
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);

  const [form, setForm] = useState({
    produit: "",
    fournisseur: "",
    qteentree: "",
  });

  const fetchAll = async () => {
    const [a, p, f] = await Promise.all([
      api.get("approvisionnements/"),
      api.get("produits/"),
      api.get("fournisseurs/"),
    ]);
    setData(a.data);
    setProduits(p.data);
    setFournisseurs(f.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await api.post("approvisionnements/", form);
    fetchAll();
  };

  const remove = async (id) => {
    await api.delete(`approvisionnements/${id}/`);
    fetchAll();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={add} className="flex gap-2 mb-4">
        <select onChange={(e) => setForm({ ...form, produit: e.target.value })} className="border p-2">
          <option>Produit</option>
          {produits.map((p) => (
            <option key={p.numero} value={p.numero}>{p.design}</option>
          ))}
        </select>

        <select onChange={(e) => setForm({ ...form, fournisseur: e.target.value })} className="border p-2">
          <option>Fournisseur</option>
          {fournisseurs.map((f) => (
            <option key={f.numero} value={f.numero}>{f.nom}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantité"
          className="border p-2"
          onChange={(e) => setForm({ ...form, qteentree: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-3">Ajouter</button>
      </form>

      <h2 className="text-xl font-bold mb-4 text-indigo-700">Liste des approvicionnements</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 uppercase text-xs">
            <th className="p-3">id</th>
            <th className="p-3">Design produit</th>
            <th className="p-3">Fournisseur</th>
            <th className="p-3">Qte entrée</th>
            <th className="p-3">Modifier</th>
            <th className="p-3">Supprimer</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((a) => (
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">{a.id}</td>
              <td className="p-3">{a.produit}</td>
              <td className="p-3">{a.fournisseur}</td>
              <td className="p-3">{a.qteentree}</td>
              <td className="p-3"> <button onClick={() => edit(a.id)} className="text-blue-500">
                Modifier
              </button></td>
              <td className="p-3">
                <button onClick={() => {
                  if (window.confirm("Voulez-vous supprimer cet approvisionnement ?")) {
                    remove(a.id)
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