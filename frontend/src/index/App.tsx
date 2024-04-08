import React from "react";
import mapShowcaseItem from "../components/ShowcaseItem.js";
import Footing from "../components/Footing.js";
import Heading from "../components/Heading.js";

import data from "frontend/public/content/Repositories.json";


const items: any[] = data.repositories;

const App: React.FC <{}> = () => {
  return (
    <div>

      <Heading />

      { items.map (mapShowcaseItem) }
      
      <Footing />

    </div>
  );
};

export default App;