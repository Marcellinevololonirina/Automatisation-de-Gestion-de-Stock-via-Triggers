import { useEffect, useState } from 'react';
import api from '../api';

export default function AuditView() {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        api.get('audits/').then(res => setAudits(res.data));
    }, []);

    const stats = audits.reduce((acc, curr) => {
        acc[curr.action] = (acc[curr.action] || 0) + 1;
        return acc;
    }, { INSERT: 0, UPDATE: 0, DELETE: 0 });

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Historique des Audits</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200 uppercase text-xs">
                        <th className="p-3">Action</th>
                        <th className="p-3">Utilisateur</th>
                        <th className="p-3">Produit</th>
                        <th className="p-3">Ancien</th>
                        <th className="p-3">Nouveau</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {audits.map(log => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                            <td className={`p-3 font-bold ${log.action === 'INSERT' ? 'text-green-600' : 'text-blue-600'}`}>{log.action}</td>
                            <td className="p-3">{log.utilisateur}</td>
                            <td className="p-3">{log.produit_design}</td>
                            <td className="p-3">{log.qteentree_ancien ?? '-'}</td>
                            <td className="p-3">{log.qteentree_nouv}</td>
                            <td className="p-3">{new Date(log.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Résumé des statistiques en bas */}
            <div className="mt-6 flex gap-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <div className="font-semibold text-green-700">Insertions: {stats.INSERT}</div>
                <div className="font-semibold text-blue-700">Modifications: {stats.UPDATE}</div>
                <div className="font-semibold text-red-700">Suppressions: {stats.DELETE}</div>
            </div>
        </div>
    );
}