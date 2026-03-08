import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

function Book() {
  const [test, settest] = useState("");
  const [spellname, setspellname] = useState("");
  const [spellcomponents, setspellcomponents] = useState("");
  const [mana, setmana] = useState("");
  const [school, setschool] = useState("");

  const [spellnew, setspellnew] = useState({
    name: "",
    ManaCost: "Minimal",
    Components: ["Verbal", "Somatic"],
    SchoolSpell: "",
    description: "",
  });

  const [spelldata, setspelldata] = useState([
    {
      name: "Mana Bolt",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Evocation",
      description: "A white bolt of Magical Energy",
    },
    {
      name: "Prestidigitation",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Unique",
      description:
        "This is a spell notice spellcasters use for practice, containing some utility functions as well. ",
    },

    {
      name: "Wizard License",
      Components: ["Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Conjuration",
      description:
        "Showcase your Wizard License, a projected image of  Sigil unique to your soul displaying your Magical credentials. .",
    },
  ]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setspellnew({
      ...spellnew,
      [name]: value,
    });
  };

  const addspell = () => {
    setspelldata([...spelldata, spellnew]);

    setspellnew({
      name: "",
      ManaCost: "Minimal",
      Components: ["Verbal", "Somatic"],
      SchoolSpell: "",
      description: "",
    });
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
            value={spellnew.name}
            onChange={handleChange}
            placeholder="Spell Name"
          />

          <p className="text-lg">test</p>
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
            name="description" // Matches the key in useState
            value={spellnew.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button
            onClick={addspell}
            className="bg-gray-200 h-10 hover:scale-110 "
          >
            Insert Spell
          </button>
        </div>
      </div>

      <HTMLFlipBook
        key={spelldata.length} // Force re-render when spell data changes
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        {...({} as any)}
      >
        <div className=" bg-[url('/bookcover.png')] bg-cover bg-center">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img className="w-[250px]" src="/amethyst.png" />
          </div>
        </div>

        {spelldata.map((spell) => (
          <div className="bg-[url('/parchment.png')] bg-cover bg-center">
            <div className="w-full h-full flex flex-col items-center justify-start gap-5">
              <div className="h-20 w-full" />
              <p className="text-xl font-bold">{spell.name}</p>

              <div className="w-full flex items-center justify-center gap-5">
                <p className="text-lg">{spell.Components.join(", ")}</p>
                <p className="text-lg">School: {spell.SchoolSpell}</p>
              </div>

              <p className="text-lg text-center w-full leading-relaxed">
                {spell.description}
              </p>
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
