import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface RefreshSuggestionProps {
  suggestion: string | null;
  onClose: () => void;
}

export default function RefreshSuggestion({ suggestion, onClose }: RefreshSuggestionProps) {
  //5sec after quit
  useEffect(() => {
    if (suggestion) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000)
      return () => clearTimeout(timer)
    }

  }, [suggestion, onClose]);

  return <AnimatePresence>
    {suggestion && (
      <motion.div>
        <button>
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
};





