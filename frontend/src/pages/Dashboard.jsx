import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import AuditView from '../components/AuditView.jsx';
import ProduitManager from '../components/Produit.jsx';
import FournisseurManager from '../components/Fournisseur.jsx';
import ApprovisionnementManager from '../components/Approvisionnement.jsx';
import Profil from '../components/Profil.jsx';



export default function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-indigo-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Gestion Stock</h2>
        <ul className="space-y-4">
          {user.role === 'USER' && (
            <>
              <li><Link to="/dashboard/profil">📦 Profil</Link></li>
              <li><Link to="/dashboard/produits">📦 Produits</Link></li>
              <li><Link to="/dashboard/fournisseurs">🚚 Fournisseurs</Link></li>
              <li><Link to="/dashboard/flux">🔄 Approvisionnements</Link></li>
            </>
          )}
          {user.role === 'ADMIN' && (
            <>
              <li><Link to="/dashboard/profil">📦 Profil</Link></li>
              <li><Link to="/dashboard/audit" className="hover:text-indigo-300">🛡️ Audit Système</Link></li>
            </>

          )}
        </ul>
        <button onClick={handleLogout} className="mt-auto pt-10 text-red-400 font-bold italic">Déconnexion</button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Bienvenue, {user.username}</h1>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold">
            Rôle: {user.role}
          </span>
        </header>

        <Routes>
          {user.role === 'USER' && (
            <>
              <Route path="profil" element={<Profil />} />
              <Route path="produits" element={<ProduitManager />} />
              <Route path="fournisseurs" element={<FournisseurManager />} />
              <Route path="flux" element={<ApprovisionnementManager />} />
            </>
          )}
          {user.role === "ADMIN" && (
            <>
              <Route path="profil" element={<Profil />} />
              <Route path="audit" element={<AuditView />} />
            </>

          )}
        </Routes>

      </main>
    </div>
  );
}