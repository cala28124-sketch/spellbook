import React from "react";
import { useState, type FC } from "react";
import { Spell } from "../types";

interface props {
  popup: number | undefined;
  setpopup: (arg0: number | undefined) => void;
  index: number;
  spell: Spell[];
  setspell: (arg0: Spell[]) => void;
}

const UpdatePopup: FC<props> = ({
  popup,
  setpopup,
  spell,
  index,
  setspell,
}: props) => {
  const [description, setdescription] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const updatedspell = [...spell];
    updatedspell[index] = {
      ...updatedspell[index],
      [name]: value,
    };

    setspell(updatedspell);
  };

  return (
    <div
      className={`${popup == index ? `` : `hidden`} fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
      onClick={() => setpopup(-1)}
    >
      <div
        className="relative w-[80dvw] h-[80dvh] bg-amber-100 flex items-center justify-center rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 left-2 w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup(-1)}
        >
          test off
        </button>
        <div className="bg-[url('/parchment.png')] bg-cover bg-center w-[370px] h-[500px] z-0">
          <div className="w-full h-full flex flex-col items-center justify-start gap-5">
            <div className="h-20 w-full" />

            <input
              className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
              type="text"
              name="Description" // Matches the key in useState
              value={spell[index].Description}
              onChange={handleChange}
              placeholder="Spell Description"
            />
            <button className="bg-gray-200 h-10 hover:scale-110 ">
              Update Spell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
