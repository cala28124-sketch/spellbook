export const findSpellbyId = async (
  name: string,
  setSpellState: (data: any) => void,
) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/${name}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      Description: spell.Description,
    });
    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addspelldata = async (SpellState: any) => {
  const response = await fetch("http://localhost:5000/api/spells/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SpellState),
  });

  // const data = await send.json(); - this gets the data from the fetch request back

  if (!response.ok) {
    const errorLog = await response.json();
    console.error("Mongoose Validation Error:", errorLog);
    throw new Error("Error while sending request");
  } else {
    return true;
  }
  /*
    only need this if try block used
	 catch (error) {
		console.error(error);
		return false;
	}
 */
};

/*
  const [spellnew, setspellnew] = useState({
    name: "",
    ManaCost: "Minimal",
    Components: [""],
    SchoolSpell: "",
    description: "",
  });
  */

export const findSpellbyIdprivate = async (
  name: string,
  setSpellState: (data: any) => void,
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/spells/privatespell/${name}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Error while sending request");
    }

    const spell = await response.json();

    setSpellState({
      name: spell.name,
      ManaCost: "Minimal",
      Components: spell.Components,
      SchoolSpell: spell.SchoolSpell,
      Description: spell.Description,
    });
    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addspelldatapriv = async (SpellState: any) => {
  const response = await fetch(
    "http://localhost:5000/api/spells/privatespell",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SpellState),
    },
  );

  // const data = await send.json(); - this gets the data from the fetch request back

  if (!response.ok) {
    const errorLog = await response.json();
    console.error("Mongoose Validation Error:", errorLog);
    throw new Error("Error while sending request");
  } else {
    return true;
  }
  /*
    only need this if try block used
	 catch (error) {
		console.error(error);
		return false;
	}
 */
};

export const GetAllSpells = async (setSpellState: (data: any) => void) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

    setSpellState(spell);
    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const finduserSpelllist = async (setSpellState: (data: any) => void) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/spelllist`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const spell = await response.json();

    if (!spell) {
      return null;
    }

    setSpellState({
      user: spell.user,
      spells: spell.spells,
      customdescription: spell.customdescription,
    });
    return spell;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const adduserspelllist = async (SpellState: any, method: string) => {
  const response = await fetch("http://localhost:5000/api/spells/spelllist", {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SpellState),
  });

  // const data = await send.json(); - this gets the data from the fetch request back

  if (!response.ok) {
    const errorLog = await response.json();
    console.error("Mongoose Validation Error:", errorLog);
    throw new Error("Error while sending request");
  } else {
    return true;
  }
  /*
    only need this if try block used
	 catch (error) {
		console.error(error);
		return false;
	}
 */
};

export const findBatchSpell = async (names: string[]) => {
  try {
    const response = await fetch(`http://localhost:5000/api/spells/batch`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ names }),
    });

    if (!response.ok) {
      throw new Error("Error while sending request");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
