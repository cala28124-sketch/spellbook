export interface Spell {
  user?: string;
  name: string;
  Components: string[];
  SchoolSpell: string;
  Description: string;
}

export interface SpellList {
  user: string;
  spells: string[];
  customdescription: string[];
}