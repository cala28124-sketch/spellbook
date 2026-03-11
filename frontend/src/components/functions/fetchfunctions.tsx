const findSpellbyId = async (
  name: string,
  setSpellState: (data: any) => void,
) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/${name}`);

    if (!response.ok) {
      throw new Error("Error while sending request");
    }

    const spell = await response.json();
    /*
    testing
    console.log(spell.name);
    console.log(spell.Components);
    console.log(spell.SchoolSpell);
    console.log(spell.Description);
    */

    setSpellState({
      name: spell.name,
      ManaCost: "Minimal",
      Components: spell.Components,
      SchoolSpell: spell.SchoolSpell,
      description: spell.Description,
    });
    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findSpellbyId;
