import React from "react";
import { type FC } from "react";

interface props {
  popup: boolean;
  setpopup: (arg0: boolean) => void;
  internal: React.ReactNode;
}

const Popup: FC<props> = ({ popup, setpopup, internal }: props) => {
  return (
    <div
      className={`${popup ? `` : `hidden`} fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
      onClick={() => setpopup(false)}
    >
      <div
        className="relative w-[80dvw] h-[80dvh] bg-amber-100 flex items-center justify-center rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 left-2 w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup(false)}
        >
          test off
        </button>
        {internal}
      </div>
    </div>
  );
};

export default Popup;
