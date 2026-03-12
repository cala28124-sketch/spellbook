import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { findSpellbyId, addspelldata } from "./functions/fetchfunctions";

function Book() {
  const Spellbook = useRef<any>(null);
  const [search, setsearch] = useState("");

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

  useEffect(() => {
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

  const farawayspell = async (name: string) => {
    setsearch("");
    name = name
      .toLowerCase()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");

    const response = await findSpellbyId(name, setspellfetch);
    if (!response) {
      throw new Error("Error finding spell");
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
            onClick={() => farawayspell(search)}
            className="bg-gray-200 h-10 hover:scale-110 "
          >
            test;
          </button>
        </div>
      </div>

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
    </>
  );
}

export default Book;

/*
       
<div className="flex items-center justify-center min-h-screen">
        <HTMLFlipBook width={300} height={500} {...({} as any)}>
          <div className="demoPage">Page 1</div>
          <div className="demoPage">Page 2</div>
          <div className="demoPage">Page 3</div>
          <div className="demoPage">Page 4</div>
        </HTMLFlipBook>
      </div>

      */

/*


       {spellData.map((pokemon) => (
          <div className="page" key={pokemon.id}>
            <div className="page-content">
              <div className="pokemon-container">
                <img
                  src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
                <div className="pokemon-info">
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                  <p className="pokemon-number">#{pokemon.id}</p>
                  <div>
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className={`pokemon-type type-${type.toLowerCase()}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="pokemon-description">{pokemon.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

       */
