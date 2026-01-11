import { motion } from 'motion/react';
import { VeroChat } from './VeroChat';

export function ToolsPage() {
  return (
    <div className="size-full overflow-y-auto px-6 pb-6">
      {/* Vero AI Chat */}
      <VeroChat />
    </div>
  );
}
