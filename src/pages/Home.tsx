import { useMemo, useState } from 'react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import { motion } from 'motion/react';

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) =>
      g.title.toLowerCase().includes(q) ||
      (g.description || '').toLowerCase().includes(q) ||
      (g.category || '').toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h3>Alt Links:</h3>
            <p>
              <a href="https://classroonn.github.io/">Alt Link 1</a>
            </p>
            <p>
              <h2 className="font-mono font-black text-2xl uppercase tracking-tighter">GAMES</h2>
            </p>
          </div>

          <div className="ml-auto w-full sm:w-1/3">
            <label className="relative block">
              <span className="sr-only">Search games</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-black px-4 py-2 text-sm outline-none"
                placeholder="Search games by title, description or category..."
                aria-label="Search games"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8">
              <h3 className="text-xl font-mono font-black uppercase">No results</h3>
              <p className="text-sm text-neutral-600 mt-2">Try a different search term.</p>
            </div>
          )}

          {/* Skeleton cards for variety */}
          {[1,2].map(i => (
            <div key={i} className="brutalist-card bg-neutral-100 border-neutral-200 shadow-none border-dashed p-4 flex flex-col items-center justify-center opacity-40 grayscale h-[380px]">
               <div className="w-12 h-12 bg-neutral-300 mb-4 animate-pulse" />
               <div className="w-24 h-4 bg-neutral-300 mb-2 animate-pulse" />
               <div className="w-32 h-3 bg-neutral-300 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

