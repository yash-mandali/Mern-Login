import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Intro() {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto navigate to login after 5 seconds
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleEnter = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse delay-500 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>

            <div className="w-full max-w-lg relative z-10 text-center">
                <div className="relative group">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

                    {/* Main card */}
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-12 backdrop-blur-xl">
                        <div className="mb-8">
                            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                                GAME ON
                            </h1>
                            <p className="text-gray-400 text-lg tracking-widest uppercase font-semibold mb-8">
                                Welcome to the Ultimate Gaming Experience
                            </p>
                            <div className="text-white text-base mb-8">
                                Level up your account and join the adventure.<br />
                                Sign in to access exclusive features and start playing.
                            </div>
                        </div>

                        <button
                            onClick={handleEnter}
                            className="w-full relative group/btn overflow-hidden rounded-lg py-4 px-6 font-bold text-white uppercase tracking-widest text-lg transition duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                ENTER THE GAME
                            </span>
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-500 uppercase tracking-widest">
                            Auto-redirecting in 5 seconds...
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500 uppercase tracking-widest">
                            ⚡ Powered by BabluTech
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;