import React from "react";

export interface Props 
{
  name:    string,
  caption: string,
  content: string
};

const CodePreview: React.FC <Props> = (props: Props) => 
{ 
  return (
    <div className = "CodePreview">
      <figure>

        <pre role = "img">
          { props.content }
        </pre>

        <figcaption>
          { props.caption }
        </figcaption>

      </figure>
    </div>
  )
};

export default CodePreview;