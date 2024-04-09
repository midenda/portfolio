import React from "react";
import CodePreview from "../components/CodePreview.js";
import Footing from "../components/Footing.js";

const project = window.location.pathname.split ("/")[2];
const preview = await import (`frontend/public/content/${project}-preview.js`);

document.title = `Project: ${project}`;

const App: React.FC <{}> = props => {
  return (
    <div>

      <h1> { preview.default.name } </h1>
    
      <CodePreview { ...preview.default } />

      <Footing />

    </div>
  );
};

export default App;