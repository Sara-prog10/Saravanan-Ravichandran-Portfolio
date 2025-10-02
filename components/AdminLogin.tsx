import React, { useState } from 'react';

interface AdminLoginProps {
    onLogin: (username: string, password: string) => void;
    loginError: string | null;
    onNavigateToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, loginError, onNavigateToPortfolio }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-subtle dark:bg-dark-surface-subtle">
            <div className="max-w-md w-full bg-surface dark:bg-dark-surface p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-text dark:text-dark-text mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface dark:focus:ring-offset-dark-surface"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                     <button onClick={onNavigateToPortfolio} className="text-sm text-primary hover:underline bg-transparent border-none p-0 cursor-pointer">Back to Portfolio</button>
                </div>
            </div>
        </div>
    );
};