import { motion } from 'motion/react';

interface MindTreeVisualProps {
  growth: number;
}

export function MindTreeVisual({ growth }: MindTreeVisualProps) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soil/Pot */}
      <path d="M60 170 L140 170 L130 190 L70 190 Z" fill="#E8E4DF" stroke="#B0A090" strokeWidth="2" />
      
      {/* Trunk - expands based on growth */}
      <motion.path 
        d="M100 170 C100 140 95 120 100 100" 
        stroke="#8A7663" 
        strokeWidth={4 + growth} 
        strokeLinecap="round" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Branch Left */}
      {growth >= 2 && (
        <motion.path 
          d="M98 120 C80 110 70 95 65 90" 
          stroke="#8A7663" 
          strokeWidth="3" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
      
      {/* Branch Right */}
      {growth >= 3 && (
        <motion.path 
          d="M102 110 C120 100 130 85 135 80" 
          stroke="#8A7663" 
          strokeWidth="3" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}

      {/* Center Branch Top */}
      {growth >= 4 && (
        <motion.path 
          d="M100 100 C100 80 95 65 100 55" 
          stroke="#8A7663" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}

      {/* Leaves - scale and appear based on growth stage */}
      {growth >= 1 && (
        <motion.path 
          d="M100 100 Q90 90 100 80 Q110 90 100 100" 
          fill="#4B8C61" 
          opacity="0.9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
      
      {growth >= 2 && (
        <g>
          <motion.path 
            d="M65 90 Q50 90 55 75 Q70 80 65 90" 
            fill="#5FA074"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <circle cx="58" cy="80" r="3" fill="#A2D68F" />
        </g>
      )}

      {growth >= 3 && (
        <g>
          <motion.path 
            d="M135 80 Q150 80 145 65 Q130 70 135 80" 
            fill="#5FA074"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <circle cx="140" cy="72" r="3" fill="#A2D68F" />
          <circle cx="144" cy="76" r="2.5" fill="#EFA9C1" /> {/* Cute Sakura Blossom */}
        </g>
      )}

      {growth >= 4 && (
        <g>
          <motion.path 
            d="M100 55 Q85 50 90 35 Q115 40 100 55" 
            fill="#2E5C3E" 
            fillOpacity="0.95"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <circle cx="95" cy="42" r="3.5" fill="#FFD166" />
        </g>
      )}

      {growth >= 5 && (
        <g>
          {/* Stunning lotus blossom crowning the tree */}
          <motion.path 
            d="M100 80 Q115 75 110 60 Q95 65 100 80" 
            fill="#EFA9C1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <motion.path 
            d="M100 80 Q85 75 90 60 Q105 65 100 80" 
            fill="#EFA9C1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
          <circle cx="100" cy="70" r="4" fill="#FF6B6B" /> 
          <circle cx="80" cy="50" r="1.5" fill="#FFD166" className="animate-pulse" />
          <circle cx="120" cy="40" r="1.5" fill="#FFD166" className="animate-pulse" />
        </g>
      )}
    </svg>
  );
}
