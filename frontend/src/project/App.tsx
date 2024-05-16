import React       from "react";

import CodePreview from "../components/CodePreview.js";
import Heading     from "../components/Heading.js";
import Footing     from "../components/Footing.js";
import README      from "../components/README.js";

import data from "frontend/public/content/Repositories";
const repositories: any = data;

interface Preview 
{
  name:    string,
  caption: string,
  content: string,
  lines:   number
};

const project = window.location.pathname.split ("/")[2];
const preview: Preview = await import (`frontend/public/content/${project}-preview.js`)
  .then (importObject => new Promise ((resolve, reject) => { resolve (importObject.default) }));



document.title = `Project: ${project}`;
document.querySelector <HTMLElement> (":root")!.style.setProperty ("--preview-lines", `${preview.lines}`);

const readme = repositories [ repositories.map ((repo: any) => repo.name).indexOf (project) ].readme;

const App: React.FC <{}> = props => {
  return (
    <div>

      <Heading { ... { title: project } } />
    
      <CodePreview { ... preview } />

      <README { ... readme } />

      <Footing />

    </div>
  );
};

export default App;