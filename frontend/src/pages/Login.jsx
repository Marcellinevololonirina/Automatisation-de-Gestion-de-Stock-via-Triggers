import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('token/', { username, password });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('user', JSON.stringify({
                username: username,
                role: res.data.role
            }));
            setUser(JSON.parse(localStorage.getItem('user')));
            navigate('/dashboard');
        } catch (err) {
            setError('Identifiants incorrects. Veuillez réessayez');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96 space-y-4">

                <h2 className="text-2xl font-bold mb-6 text-center">Connexion Stock</h2>

                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg'>
                        {error}
                    </div>
                )}

                <input
                    type="text" placeholder="Nom d'utilisateur"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" placeholder="Mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors">
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>

                <p className="text-center text-sm text-gray-500">
                    Pas de compte ? {' '}
                    <a href="/register" className="text-indigo-600 font-medium hover:underline">
                        S'inscrire
                    </a>
                </p>
            </form>
        </div>
    );
}