import React from "react";

export interface Props 
{
  name:    string,
  path:    string,
  caption: string,
  content: string,
  lines:   number,
  width:   number
};

export const CodePreview: React.FC <Props> = (props: Props) => 
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
          <h3> Preview of { props.path }. </h3>
          { props.caption }
        </figcaption>

      </figure>
    </div>
  )
};

export default CodePreview;