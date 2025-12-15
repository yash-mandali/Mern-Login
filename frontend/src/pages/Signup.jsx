import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        // setForm((s) => ({ ...s, [name]: value }));
        console.log(name, value);
        const copyinfo = { ...form };
        copyinfo[name] = value;
        setForm(copyinfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = form;
        if (!name || !email || !password) {
           handleError('All fields are required');
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
           handleError(err);
        } 
            
    }

        // setForm({ name: '', email: '', password: '' });;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse delay-500"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="relative group">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
                        <div className="mb-8">
                            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
                                JOIN THE GAME
                            </h1>
                            <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">Level Up Your Account</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-5">
                            <label className="block relative group/input">
                                <span className="text-cyan-400 text-xs font-bold mb-2 block uppercase tracking-wider">
                                    PLAYER NAME
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover/input:opacity-100 transition blur"></div>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    autoFocus
                                    placeholder="Enter your gamer tag"
                                    className="relative w-full bg-gray-800 border-2 border-gray-700 hover:border-cyan-500 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-300"
                                />
                            </label>

                            <label className="block relative group/input">
                                <span className="text-purple-400 text-xs font-bold mb-2 block uppercase tracking-wider">
                                    EMAIL ID
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover/input:opacity-100 transition blur"></div>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your.email@gaming.com"
                                    className="relative w-full bg-gray-800 border-2 border-gray-700 hover:border-purple-500 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
                                />
                            </label>

                            <label className="block relative group/input">
                                <span className="text-pink-400 text-xs font-bold mb-2 block uppercase tracking-wider">
                                    PASSWORD
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover/input:opacity-100 transition blur"></div>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="relative w-full bg-gray-800 border-2 border-gray-700 hover:border-pink-500 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-300"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full mt-6 relative group/btn overflow-hidden rounded-lg py-3 px-4 font-bold text-white uppercase tracking-widest text-sm transition duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                   SIGN UP
                                </span>
                            </button>

                            <div className="text-center text-xs text-gray-500 mt-4 uppercase tracking-widest">
                                <span>ALREADY HAVE AN ACCOUNT? </span>
                                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition">
                                    LOGIN.
                                </Link>
                            </div>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500 uppercase tracking-widest">
                            ⚡ Powered by BabluTech
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                theme="dark"
                toastClassName={() =>
                    "relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer bg-gray-900 border-2 border-cyan-500"
                }
            />
        </div>
    );
}

export default Signup;