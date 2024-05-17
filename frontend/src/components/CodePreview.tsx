import React from "react";

export interface Props 
{
  name:    string,
  caption: string,
  content: string,
  lines:   number,
  width:   number
};

const CodePreview: React.FC <Props> = (props: Props) => 
{ 
  return (
    <div className = "CodePreview">
      <figure>

        <div className = "frame">
          <pre role = "img">
              { props.content }
          </pre>
        </div>

        <figcaption>
          { props.caption }
        </figcaption>

      </figure>
    </div>
  )
};

export default CodePreview;