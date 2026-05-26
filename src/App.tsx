import { FormEvent, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import GamePlayer from './components/GamePlayer';
import { motion, AnimatePresence } from 'motion/react';

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE ?? '4321';

export default function App() {
  const [enteredCode, setEnteredCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('accessCodeAuthorized');
    setIsAuthorized(stored === 'true');
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (enteredCode.trim() === ACCESS_CODE) {
      localStorage.setItem('accessCodeAuthorized', 'true');
      setIsAuthorized(true);
      return;
    }

    alert('Invalid access code. Please try again.');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/90 p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-center">Enter Access Code</h1>
          <p className="text-sm text-slate-400 mb-6 text-center">
            You need the access code to enter the site.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-200">
              Access code
              <input
                type="password"
                value={enteredCode}
                onChange={(event) => setEnteredCode(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                placeholder="Enter code"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[#00FF00] selection:text-black">
        <Header />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/play/:id" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GamePlayer />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}
