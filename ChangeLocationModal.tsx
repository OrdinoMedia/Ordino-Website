import { motion } from 'motion/react';
import { Button } from './ui/button';
import { X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ChangeLocationModalProps {
  currentLocation: string;
  onClose: () => void;
  onChangeLocation: (location: string) => void;
}

export function ChangeLocationModal({ currentLocation, onClose, onChangeLocation }: ChangeLocationModalProps) {
  const [location, setLocation] = useState(currentLocation);

  const handleSave = () => {
    onChangeLocation(location);
    toast.success('Location updated successfully!');
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-[#686867]/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-[#686867]" />
            <h2 
              className="text-[#162a2c] text-[18px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              Change Location
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <X className="size-5 text-[#686867]" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="relative">
            <div 
              className="absolute left-3 top-2 text-[11px] text-[#686867]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Location
            </div>
            <input
              type="text"
              placeholder="e.g., Walmart, 123 Main St"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-[50px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#686867]/20 p-4 flex gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#686867]/30 text-[#686867] hover:bg-[#E9F0F1]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#686867] text-white hover:bg-[#162a2c]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Save Changes
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
