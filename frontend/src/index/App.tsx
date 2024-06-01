import React from "react";

import mapShowcaseItem from "../components/ShowcaseItem.js";
import Footing         from "../components/Footing.js";
import Heading         from "../components/Heading.js";

import data from "frontend/public/content/Repositories";

const items: any = data;

const App: React.FC <{}> = () => {
  return (
    <div>

      <Heading { ... { title: "Portfolio" } } />

      <p> A description of my software projects and skills </p>

      { items.map (mapShowcaseItem) }
      
      <Footing />

    </div>
  );
};

export default App;