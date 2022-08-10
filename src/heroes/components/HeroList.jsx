import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {heroes.map((h) => {
          return <HeroCard key={h.id} {...h} />;
        })}
      </div>
    </>
  );
};
