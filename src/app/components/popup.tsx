import React, { useState, useEffect } from 'react';

interface PopupProps {
  tokens: number;
  onClose: () => void;
  closePopup: () => void;
}

function Popup({ tokens, closePopup }: PopupProps): JSX.Element {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center">
      {showPopup && (
        <div className="fixed inset-0 bg-black h-screen w-screen bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-indigo-900 rounded-3xl p-10 h-[50vh] w-[50vw] text-center overflow-hidden shadow-2xl flex justify-center flex-col items-center">
            {/* Orbits */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 border-2 border-dashed border-white border-opacity-20 rounded-full animate-spin"></div>
              <div className="absolute w-48 h-48 border-2 border-dashed border-white border-opacity-20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-24 h-24 border-2 border-dashed border-white border-opacity-20 rounded-full animate-spin-slower"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">Congrats!</h2>
              <p className="text-2xl text-white">
                You got <span className="font-bold text-yellow-400">{tokens}</span> tokens
              </p>
            </div>
            
            {/* Coins */}
            {[...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className={`absolute w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-2xl text-indigo-900`}
                style={{
                  animation: `orbit${index % 3 + 1} ${8 + index * 1.5}s linear infinite`,
                  transformOrigin: '50% 50%',
                  left: 'calc(50% - 24px)',
                  top: 'calc(50% - 24px)',
                }}
              >
                <div className="animate-flip">₿</div>
              </div>
            ))}
            
            <button 
              onClick={closePopup}
              className="mt-6 px-4 py-2 bg-yellow-400 z-50 relative text-indigo-900 rounded hover:bg-yellow-300 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
