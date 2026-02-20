import { useState, useRef } from 'react';
import { Gamepad2, ArrowLeft, Maximize, Info } from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const iframeRef = useRef(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveGame(null)}
          >
            <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
              <Gamepad2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Unblocked<span className="text-indigo-400">Hub</span>
            </h1>
          </div>
          
          {activeGame && (
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeGame ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-2">Popular Games</h2>
              <p className="text-gray-400">Select a game to play instantly in your browser.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gamesData.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className="group bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gray-800 relative">
                    <img 
                      src={game.thumbnailUrl} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback for broken images
                        e.target.src = 'https://picsum.photos/seed/' + game.id + '/640/360?blur=2';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                        PLAY
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{activeGame.title}</h2>
              <div className="flex gap-3">
                <button 
                  onClick={handleFullscreen}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Maximize className="w-4 h-4" />
                  Fullscreen
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative group">
              <iframe
                ref={iframeRef}
                src={activeGame.iframeUrl}
                title={activeGame.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
              ></iframe>
              
              {/* Overlay hint that fades out */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur text-gray-300 text-xs px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Info className="w-4 h-4 text-indigo-400" />
                Some games may take a moment to load or require clicking inside to start.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
