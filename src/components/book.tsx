import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

function Book() {
  const spelldata = [
    {
      id: "006",
      name: "Mana Bolt",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Evocation",
      description: "A white bolt of Magical Energy",
    },
    {
      id: "007",
      name: "Prestidigitation",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Unique",
      description:
        "This is a spell notice spellcasters use for practice, containing some utility functions as well. ",
    },
    {
      id: "008",
      name: "Locate Object",
      Components: ["Verbal", "Somatic"],
      ManaCost: "Average",
      SchoolSpell: "Divination",
      description:
        "You visualize an object, your mind gaining an awareness of it, knowing its location and direction.",
    },
    {
      id: "009",
      name: "Mould Earth",
      Components: ["Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Transmutation",
      description: "Manipulate the Earth below you within range, shaping it.",
    },
    {
      id: "010",
      name: "Light",
      Components: ["Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Evocation",
      description:
        "Touch an object and cause it to emit light in a radius all around it. ",
    },
    {
      id: "011",
      name: "Force Bolt",
      Components: ["Somatic"],
      ManaCost: "Average",
      SchoolSpell: "Evocation",
      description:
        "Fire a bolt of Magical Energy, more powerful than the Bolt.",
    },
    {
      id: "012",
      name: "Detect Magic",
      Components: ["None"],
      ManaCost: "Minimal",
      SchoolSpell: "Divination",
      description:
        "Weave light rays that bounce off of a magical phenomena that you can see, which reflect as a color corresponding with a school of magic related to what it was cast on.",
    },
    {
      id: "013",
      name: "Wizard License",
      Components: ["Somatic"],
      ManaCost: "Minimal",
      SchoolSpell: "Conjuration",
      description:
        "Showcase your Wizard License, a projected image of  Sigil unique to your soul displaying your Magical credentials. .",
    },
  ];

  return (
    <HTMLFlipBook
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
