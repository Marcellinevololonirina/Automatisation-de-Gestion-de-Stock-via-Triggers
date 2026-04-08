import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            alert("Identifiants incorrects");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-indigo-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
            
                <h2 className="text-2xl font-bold mb-6 text-center">Connexion Stock</h2>
                <input
                    type="text" placeholder="Nom d'utilisateur"
                    className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" placeholder="Mot de passe"
                    className="w-full p-2 mb-6 border rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                    Se connecter
                </button>
                <p className="text-center mt-3">
                    Pas de compte ? <a href="/register" className="text-blue-600">S'inscrire</a>
                </p>
            </form>
        </div>
    );
}