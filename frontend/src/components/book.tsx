import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  findSpellbyId,
  addspelldata,
  findSpellbyIdprivate,
  addspelldatapriv,
  GetAllSpells,
  finduserSpelllist,
  adduserspelllist,
} from "./functions/fetchfunctions";
import Popup from "./popup";
import UpdatePopup from "./updatepopup";
import { Spell, SpellList } from "../types";

function Book() {
  const Spellbook = useRef<any>(null);
  const [search, setsearch] = useState("");
  const [activeupdatepop, setactiveupdatepop] = useState<number | undefined>(
    undefined,
  );
  const [popup, setpopup] = useState(false);
  const [popup2, setpopup2] = useState(false);
  const [popup3, setpopup3] = useState(false);
  const [popup4, setpopup4] = useState(false);

  const [publicspelllist, setpublicspelllist] = useState<Spell[]>([]);

  const [searchlist, setsearchlist] = useState("");
  const [usersspell, setusersspell] = useState<SpellList>({
    user: "",
    spells: ["Mana Bolt", "Prestidigitation", "Wizard License"],
    customdescription: [""],
  });

  // filter based on search
  const filteredspells = publicspelllist.filter((spell) =>
    spell.name.toLowerCase().includes(searchlist.toLowerCase()),
  );

  const [spellnew, setspellnew] = useState({
    name: "",
    //ManaCost: "Minimal",
    Components: [""],
    SchoolSpell: "",
    Description: "",
  });

  const [spellfetch, setspellfetch] = useState({
    name: "",
    //ManaCost: "Minimal",
    Components: [""],
    SchoolSpell: "",
    Description: "",
  });

  const [spelldata, setspelldata] = useState([
    {
      name: "Mana Bolt",
      Components: ["Verbal", "Somatic"],
      //ManaCost: "Minimal",
      SchoolSpell: "Evocation",
      Description: "A white bolt of Magical Energy",
    },
    {
      name: "Prestidigitation",
      Components: ["Verbal", "Somatic"],
      //ManaCost: "Minimal",
      SchoolSpell: "Unique",
      Description:
        "This is a spell notice spellcasters use for practice, containing some utility functions as well. ",
    },

    {
      name: "Wizard License",
      Components: ["Somatic"],
      //ManaCost: "Minimal",
      SchoolSpell: "Conjuration",
      Description:
        "Showcase your Wizard License, a projected image of  Sigil unique to your soul displaying your Magical credentials. .",
    },
  ]);

  const fetchSpells = async () => {
    const result = await finduserSpelllist(setusersspell);

    if (result == null) {
      console.log("no spell list found, creating");
      await adduserspelllist(usersspell, "POST");
    }
  };

  /*
  useEffect (() => {
    GetAllSpells(setpublicspelllist);
  }, []);
  */

  useEffect(() => {
    GetAllSpells(setpublicspelllist);
    fetchSpells();
    const savedspells = localStorage.getItem("savedspells")
      ? JSON.parse(localStorage.getItem("savedspells") as string)
      : [];

    savedspells.splice(0, 3); // Remove the first 3 default spells to avoid duplication

    setspelldata([...spelldata, ...savedspells]);

    //setspelldata(savedspells ? JSON.parse(savedspells) : []);
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "Components") {
      setspellnew({
        ...spellnew,
        [name]: value.split(",").map((comp: string) => comp.trim()),
      });
    } else {
      setspellnew({
        ...spellnew,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (spellfetch.name == "") {
      return;
    }

    const savedspells = [...spelldata, spellfetch];

    setspelldata([...spelldata, spellfetch]);

    localStorage.setItem("savedspells", JSON.stringify(savedspells));

    setspellfetch({
      name: "",
      //ManaCost: "Minimal",
      Components: [""],
      SchoolSpell: "",
      Description: "",
    });

    setTimeout(() => {
      if (Spellbook.current) {
        Spellbook.current.pageFlip().flip(spelldata.length + 2);
      }
    }, 100);
  }, [spellfetch]);

  const addspell = () => {
    const savedspells = [...spelldata, spellnew];

    setspelldata([...spelldata, spellnew]);

    localStorage.setItem("savedspells", JSON.stringify(savedspells));

    setspellnew({
      name: "",
      //ManaCost: "Minimal",
      Components: [""],
      SchoolSpell: "",
      Description: "",
    });

    setTimeout(() => {
      if (Spellbook.current) {
        Spellbook.current.pageFlip().flip(spelldata.length + 2);
      }
    }, 100);
  };

  const deletespell = (index: number) => {
    const updatedspells = [...spelldata];
    updatedspells.splice(index, 1);
    setspelldata(updatedspells);
    localStorage.setItem("savedspells", JSON.stringify(updatedspells));

    setTimeout(() => {
      if (Spellbook.current) {
        Spellbook.current.pageFlip().flip(1);
      }
    }, 100);

    /*
    old logic to force update the flipbook, but it caused some weird bugs and is no longer needed since we are using the key prop to force re-render when spell data changes
    setTimeout(() => {
      if (Spellbook.current) {
        Spellbook.current.pageFlip().updateFromHtml();
      }
    }, 100);
    */
  };

  const farawayspell = async (name: string, priv: boolean) => {
    setsearch("");
    name = name
      .toLowerCase()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
    if (!priv) {
      const response = await findSpellbyId(name, setspellfetch);
      if (!response) {
        throw new Error("Error finding spell");
      }
    } else {
      const response = await findSpellbyIdprivate(name, setspellfetch);
      if (!response) {
        throw new Error("Error finding spell");
      }
    }
  };

  const sendfarawayspell = async () => {
    const name = spellnew.name as string;

    spellnew.name = name
      .toLowerCase()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");

    const response = await addspelldata(spellnew);
    if (!response) {
      throw new Error("Error sending spell");
    }
  };

  const flipspell = (index: number) => {
    Spellbook.current.pageFlip().flip(index);
  };

  /*
  <input
            className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
            placeholder="example@email.com"
            onChange={(e) => {
              settest(e.target.value);
            }}
          />
          */

  return (
    <>
      <HTMLFlipBook
        key={spelldata.length}
        ref={Spellbook} // Force re-render when spell data changes
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        {...({} as any)}
      >
        <div className="bg-[url('/bookcover.png')] bg-cover bg-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img className="w-[250px]" src="/amethyst.png" />
          </div>
        </div>

        <div className="bg-[url('/parchment.png')] bg-cover bg-center w-[370px] h-[500px] z-0">
          <div className="w-full h-full flex flex-col items-center justify-center flex-wrap">
            {spelldata.map((spell, index) => (
              <button
                onClick={() => flipspell(index + 2)}
                className="bg-gray-200 h-10 hover:scale-110 "
              >
                {spell.name}
              </button>
            ))}
          </div>
        </div>

        {spelldata.map((spell, index) => (
          <div
            key={index}
            className="bg-[url('/parchment.png')] bg-cover bg-center"
          >
            <div className="w-full h-full flex flex-col items-center justify-start gap-5">
              <div className="h-20 w-full" />
              <p className="text-xl font-bold">{spell.name}</p>

              <div className="w-full flex items-center justify-center gap-5">
                <p className="text-lg">{spell.Components.join(", ")}</p>
                <p className="text-lg">School: {spell.SchoolSpell}</p>
              </div>

              <p className="text-lg text-center w-full leading-relaxed">
                {spell.Description}
              </p>
              <button
                onClick={() => deletespell(index)}
                className="bg-gray-200 h-10 hover:scale-110 "
              >
                Delete Spell
              </button>
            </div>
          </div>
        ))}

        <div className=" bg-[url('/bookcover.png')] bg-cover bg-center">
          <div className="w-full h-full flex flex-col items-center justify-center"></div>
        </div>
      </HTMLFlipBook>
      <div className="flex flex-col gap-5 items-center justify-center h-[500px]">
        <button
          className="w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup(true)}
        >
          add spell
        </button>
        <button
          className="w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup2(true)}
        >
          send spell
        </button>
        <button
          className="w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup3(true)}
        >
          spell list
        </button>
        <button
          className="w-[100px] h-[100px] bg-orange-800 border-5 border-yellow-100 hover:border-yellow-500 hover:scale-110 transition duration-100"
          onClick={() => setpopup4(true)}
        >
          book list
        </button>
      </div>

      <Popup
        popup={popup}
        setpopup={setpopup}
        internal={
          <div className="bg-[url('/parchment.png')] bg-cover bg-center w-[370px] h-[500px] z-0">
            <div className="w-full h-full flex flex-col items-center justify-start gap-5">
              <div className="h-20 w-full" />

              <input
                className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
                type="text"
                name="name" // Matches the key in useState
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                placeholder="Spell Name"
              />

              <button
                onClick={() => farawayspell(search, false)}
                className="bg-gray-200 h-10 hover:scale-110 "
              >
                test;
              </button>
            </div>
          </div>
        }
      />
      <Popup
        popup={popup2}
        setpopup={setpopup2}
        internal={
          <div className="bg-[url('/parchment.png')] bg-cover bg-center w-[370px] h-[500px] z-0">
            <div className="w-full h-full flex flex-col items-center justify-start gap-5">
              <div className="h-20 w-full" />

              <input
                className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
                type="text"
                name="name" // Matches the key in useState
                value={spellnew.name}
                onChange={handleChange}
                placeholder="Spell Name"
              />

              <input
                className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
                type="text"
                name="Components" // Matches the key in useState
                value={spellnew.Components.join(", ")}
                onChange={handleChange}
                placeholder="Components (comma separated)"
              />
              <input
                className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
                type="text"
                name="SchoolSpell" // Matches the key in useState
                value={spellnew.SchoolSpell}
                onChange={handleChange}
                placeholder="Spell School"
              />

              <input
                className="w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
                type="text"
                name="Description" // Matches the key in useState
                value={spellnew.Description}
                onChange={handleChange}
                placeholder="Description"
              />
              <button
                onClick={addspell}
                className="bg-gray-200 h-10 hover:scale-110 "
              >
                Insert Spell
              </button>
              <button
                onClick={sendfarawayspell}
                className="bg-gray-200 h-10 hover:scale-110 "
              >
                Send Spell
              </button>
            </div>
          </div>
        }
      />
      <Popup
        popup={popup3}
        setpopup={setpopup3}
        internal={
          <>
            <input
              className="absolute top-2 right-2 w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
              type="text"
              name="name"
              value={searchlist}
              onChange={(e) => setsearchlist(e.target.value)}
              placeholder="spell name"
            ></input>
            <div className="flex flex-col items-center justify-center gap-4">
              {filteredspells.map((spell, index) => (
                <>
                  <div className="flex flex-col justify-center items-center text-lg bg-amber-500 p-4 w-full h-full border-5 border-amber-300">
                    <p key={index}>{spell.name}</p>
                    <button
                      onClick={() =>
                        farawayspell(spell.name, spell.user ? true : false)
                      }
                      className="bg-amber-500 border-5 border-amber-500 p-3 hover:border-amber-300 hover:bg-amber-600 transition duration-100"
                    >
                      add
                    </button>
                  </div>
                </>
              ))}
            </div>
          </>
        }
      />
      <Popup
        popup={popup4}
        setpopup={setpopup4}
        internal={
          <>
            <input
              className="absolute top-2 right-2 w-[85%] h-10 pl-1 bg-gray-200 rounded-xs"
              type="text"
              name="name"
              value={searchlist}
              onChange={(e) => setsearchlist(e.target.value)}
              placeholder="spell name"
            ></input>
            <div className="flex flex-col items-center justify-center gap-4">
              {spelldata.map((spell, index) => (
                <>
                  <div className="flex flex-col justify-center items-center text-lg bg-amber-500 p-4 w-full h-full border-5 border-amber-300">
                    <p key={index}>{spell.name}</p>
                    <button
                      onClick={() => {
                        deletespell(index);
                      }}
                      className={`${index == 0 || index == 1 || index == 2 ? `hidden` : ``} bg-amber-500 border-5 border-amber-500 p-3 hover:border-amber-300 hover:bg-amber-600 transition duration-100`}
                    >
                      remove
                    </button>
                    <button
                      onClick={() => {
                        setactiveupdatepop(index);
                      }}
                      className={`bg-amber-500 border-5 border-amber-500 p-3 hover:border-amber-300 hover:bg-amber-600 transition duration-100`}
                    >
                      update
                    </button>
                    <UpdatePopup
                      popup={activeupdatepop}
                      setpopup={setactiveupdatepop}
                      index={index}
                      spell={spelldata}
                      setspell={setspelldata}
                    />
                  </div>
                </>
              ))}
            </div>
          </>
        }
      />
    </>
  );
}

export default Book;
