import Chance from "chance";
import { v4 as uuidv4 } from "uuid";

export default function generateTodos(count = 1000) {
  const chance = new Chance();
  return chance.unique(
    () => ({
      id: uuidv4(),
      title: chance.sentence({ words: chance.integer({ min: 1, max: 5 }) }),
      description: chance.sentence({
        words: chance.integer({ min: 5, max: 15 }),
      }),
      creationDate: chance.date(),
      severity: chance.integer({ min: 1, max: 3 }),
      done: chance.bool(),
    }),
    count
  );
}
