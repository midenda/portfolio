import React from "react";

import { CodePreview, Props as Preview } from "../components/CodePreview.js";
import Heading                           from "../components/Heading.js";
import Footing                           from "../components/Footing.js";
import README                            from "../components/README.js";

import data from "frontend/public/content/Repositories";
const repositories: any = data;

const project = window.location.pathname.split ("/")[2];
const preview: Preview = await import (`frontend/public/content/${project}-preview.js`)
  .then (importObject => new Promise ((resolve, reject) => { resolve (importObject.default) }));

const rootStyle: CSSStyleDeclaration = document.querySelector <HTMLElement> (":root")!.style;

document.title = `Project: ${project}`;
rootStyle.setProperty ("--preview-lines", `${preview.lines}`);
rootStyle.setProperty ("--preview-width", `${preview.width}`);

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