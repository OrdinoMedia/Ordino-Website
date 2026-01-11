import { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="relative">
        {/* iPhone 14/15 Pro Max Frame */}
        <div 
          className="relative bg-black rounded-[60px] shadow-2xl border-[14px] border-slate-950"
          style={{
            width: '430px',
            height: '932px',
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black rounded-b-3xl w-[126px] h-[37px]" />
          </div>

          {/* Screen Content */}
          <div 
            className="relative w-full h-full bg-white rounded-[46px] overflow-hidden"
          >
            {children}
          </div>

          {/* Power Button */}
          <div className="absolute right-[-14px] top-[220px] w-[3px] h-[100px] bg-slate-950 rounded-r" />
          
          {/* Volume Buttons */}
          <div className="absolute left-[-14px] top-[180px] w-[3px] h-[50px] bg-slate-950 rounded-l" />
          <div className="absolute left-[-14px] top-[250px] w-[3px] h-[50px] bg-slate-950 rounded-l" />
        </div>

        {/* Reflection effect */}
        <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
