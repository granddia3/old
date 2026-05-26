import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { games } from '../data/games';
import { useState, useRef } from 'react';

export default function GamePlayer() {
  const { id } = useParams();
  const game = games.find(g => g.id === id);
  const [key, setKey] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-mono font-black uppercase mb-4">404: Game Moved</h1>
        <Link to="/" className="brutalist-button">Return to Mainframe</Link>
      </div>
    );
  }

  const reloadGame = () => setKey(prev => prev + 1);

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      }
    }
  };

  const zoomIn = () => setScale(s => s + 0.1);
  const zoomOut = () => setScale(s => Math.max(s - 0.1, 0.5));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold opacity-60 hover:opacity-100 transition-opacity mb-2">
            <ArrowLeft className="w-4 h-4" /> BACK_TO_DIRECTORY
          </Link>
          <h1 className="text-3xl font-mono font-black uppercase tracking-tight">
            {game.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={reloadGame}
            className="brutalist-button flex items-center gap-2 text-xs"
            title="Reload System"
          >
            <RefreshCw className="w-4 h-4" /> RELOAD
          </button>
          <button 
            onClick={zoomOut}
            className="brutalist-button flex items-center gap-2 text-xs"
            disabled={scale <= 0.5}
          >
            <ZoomOut className="w-4 h-4" /> ZOOM OUT
          </button>
          <span className="font-mono text-sm font-bold w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={zoomIn}
            className="brutalist-button flex items-center gap-2 text-xs"
          >
            <ZoomIn className="w-4 h-4" /> ZOOM IN
          </button>
          <button 
            onClick={toggleFullscreen}
            className="brutalist-button flex items-center gap-2 text-xs"
          >
            <Maximize2 className="w-4 h-4" /> FULLSCREEN
          </button>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="brutalist-card bg-black flex flex-col aspect-[16/9] w-full overflow-hidden relative transition-transform"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        <iframe
          key={key}
          src={game.url}
          className="w-full h-full border-none"
          allowFullScreen
          title={game.title}
        />
      </div>
    </div>
  );
}
