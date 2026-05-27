import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Game } from '../data/games';
import { motion } from 'motion/react';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="brutalist-card flex flex-col group h-full"
    >
      <div className="relative aspect-video overflow-hidden border-b-2 border-black dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-black dark:bg-neutral-100 text-white dark:text-black text-[10px] font-mono font-bold px-2 py-0.5 uppercase">
            {game.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link 
            to={`/play/${game.id}`}
            className="bg-[#00FF00] dark:bg-[#39FF14] border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00E600] dark:hover:bg-[#2DE610] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <Play className="w-6 h-6 fill-black" />
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-mono font-black text-lg uppercase mb-1 leading-none text-black dark:text-white">
          {game.title}
        </h3>
        {game.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-snug">
            {game.description}
          </p>
        )}
        <div className="mt-auto">
          <Link 
            to={`/play/${game.id}`}
            className="inline-block w-full text-center brutalist-button text-sm uppercase"
          >
            Launch_Game
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
