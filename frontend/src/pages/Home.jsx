import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../util';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInuser, setLoggedInuser] = useState("");
    const [products, setProducts] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInuser(localStorage.getItem('loggedinuser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('loggedinuser');
        handleSuccess('Logged out successfully');
        setTimeout(() => {
            navigate('/login')
        }, 500)
    }


    const fetchProducts = async () => {
        try {
            const url = "https://mern-login-ten-chi.vercel.app/product";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('jwtToken')
                }

            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        }
        catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    
    return (
        <div className="min-h-screen bg-black p-4 relative overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse delay-500 group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-6 border-b border-gray-800">
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                        PRODUCT STORE
                    </h1>
                    <p className="text-gray-400 text-sm">Welcome back, {loggedInuser}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="relative group/btn overflow-hidden rounded-lg py-2 px-4 font-bold text-white uppercase tracking-widest text-sm transition duration-500 border border-red-500 hover:border-red-400"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover/btn:opacity-100 transition duration-500"></div>
                    <div className="absolute inset-0 bg-red-700"></div>
                    <span className="relative">
                        LOGOUT
                    </span>
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto py-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                        🛍️ OUR PRODUCTS
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Discover amazing products at great prices
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products && products.length > 0 ? (
                        products.map((item, index) => (
                            <div key={index} className="relative group transform hover:scale-105 transition-all duration-300">
                                {/* Glowing border effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                                {/* Product Card */}
                                <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl text-center">
                                    {/* Product Name */}
                                    <h3 className="text-xl font-bold text-white mb-4">{item.name}</h3>

                                    {/* Price Display */}
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-6">
                                        ${item.price}
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full relative group/btn overflow-hidden rounded-lg py-3 px-4 font-bold text-white uppercase tracking-widest text-sm transition duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition duration-500"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"></div>
                                        <span className="relative flex items-center justify-center gap-2">
                                            <span>🛒</span>
                                            BUY NOW
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75"></div>
                                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
                                    <div className="text-gray-400 text-lg">Loading products...</div>
                                </div>
                            </div>
                        </div>
                    )}
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

export default Home;
