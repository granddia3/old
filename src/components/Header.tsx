import { Link } from 'react-router-dom';
import { School } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="bg-yellow-300 border-b-2 border-black py-1 px-4 text-center">
        <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-tight">
           Note: some games might be broken. This means that it might or might not be fixed.  Speak to the creators if you want a game to be added.
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-black p-1 transition-transform group-hover:rotate-12">
            <School className="text-white w-6 h-6" />
          </div>
          <span className="font-mono font-black text-xl tracking-tighter uppercase">
            Classroom
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-mono text-sm font-bold hover:underline underline-offset-4 tracking-tighter">This is a collaborative website made by TM and Granddia2.</Link>
        </nav>
      </div>
    </header>
  );
}
