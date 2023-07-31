import React from "react";
import ShowcaseItem from "./components/ShowcaseItem";
import mapShowcaseItem from "./components/ShowcaseItem";

import data from "frontend/public/content/Repositories.json";
// import data from "../public/content/Repositories.json";

const items = data;


const App: React.FC <{}> = props => {
  return (
    <div>

      <h1>Portfolio</h1>
      <p> A description of my software projects and skills </p>

      { items.map (mapShowcaseItem) }
      
    </div>
  );
};

export default App;