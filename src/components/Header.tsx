import { Link } from 'react-router-dom';
import { School, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync class on every dark state change, and on mount to clear any stale class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // On mount: forcibly reconcile the class with localStorage in case it drifted
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const shouldBeDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setDark(shouldBeDark);
  }, []);

  return (
    <header className="border-b-2 border-black dark:border-neutral-600 bg-white dark:bg-neutral-900 sticky top-0 z-50 transition-colors duration-200">
      <div className="bg-yellow-300 dark:bg-yellow-500 border-b-2 border-black dark:border-neutral-600 py-1 px-4 text-center">
        <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-tight text-black">
           Note: some games might be broken. This means that it might or might not be fixed.  Speak to the creators if you want a game to be added.
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-black dark:bg-white p-1 transition-transform group-hover:rotate-12">
            <School className="text-white dark:text-black w-6 h-6" />
          </div>
          <span className="font-mono font-black text-xl tracking-tighter uppercase text-black dark:text-white">
            Classroom
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-mono text-sm font-bold hover:underline underline-offset-4 tracking-tighter text-black dark:text-neutral-200"
          >
            This is a collaborative website made by TM and Granddia2.
          </Link>
        </nav>
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
          className="ml-4 brutalist-button p-2 flex items-center justify-center"
        >
          {dark ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-800" />
          )}
        </button>
      </div>
    </header>
  );
}
