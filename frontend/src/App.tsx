import React from "react";
import ShowcaseItem from "./components/ShowcaseItem";
import mapShowcaseItem from "./components/ShowcaseItem";

import data from "frontend/public/content/Repositories.json";
// import data from "../public/content/Repositories.json";

const items = data;


const App: React.FC <{}> = props => {
  return (
    <div>
      { items.map (mapShowcaseItem) }
    </div>
  );
};

export default App;