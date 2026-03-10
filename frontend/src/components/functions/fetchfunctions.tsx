const findSpellbyId = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/${id}`);

    if (!response.ok) {
      throw new Error("Error while sending request");
    }

    const spell = await response.json();
    console.log(spell.name);
    console.log(spell.Components);
    console.log(spell.SchoolSpell);
    console.log(spell.Description);

    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default findSpellbyId;
