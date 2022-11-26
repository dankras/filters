import { PEOPLE } from "./people.js";

const ages = PEOPLE.map((person) => person.age);
export const minAge = Math.min(...ages);
export const maxAge = Math.max(...ages);

const heights = PEOPLE.map((person) => person.height_inches);
export const minHeightInches = Math.min(...heights);
export const maxHeightInches = Math.max(...heights);
