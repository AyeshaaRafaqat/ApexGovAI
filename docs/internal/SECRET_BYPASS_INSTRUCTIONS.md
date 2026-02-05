// Add this to ImageUploader component to add a secret reset button

import { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Shield, AlertCircle, RotateCcw } from 'lucide-react';

// Inside component, add this state:
const [showResetButton, setShowResetButton] = useState(false);

// Add this function:
const handleSecretReset = () => {
  rateLimiter.reset();
  alert('Rate limit reset! You have 999 uploads again.');
  window.location.reload();
};

// Add this to your JSX (at the bottom of the error message div):
{error && (
  <div>
    {/* existing error display */}
    
    {/* SECRET BYPASS: Triple-click error to show reset button */}
    <div 
      onClick={(e) => {
        if (e.detail === 3) { // Triple-click
          setShowResetButton(true);
        }
      }}
      className="mt-2"
    >
      {showResetButton && (
        <button
          onClick={handleSecretReset}
          className="text-xs text-yellow-400 underline flex items-center gap-1 mx-auto"
        >
          <RotateCcw size={12} />
          Reset Limit (Dev Mode)
        </button>
      )}
    </div>
  </div>
)}
