import React from "react";

export interface Props 
{
  title: string,
  description: string,
  sections: 
  {
    heading: string, 
    content: (string | Link)[][]
  }[]
};

export interface Link
{
  text:  string, 
  url:   string,
  title: string
};

const README: React.FC <Props> = (props: Props) => 
{
  return (
    <div className = "README">

      <h2> { props.title } </h2>
      <p>  { props.description } </p>

      <ul>
        { props.sections.map ((section, i) => (
          <li key = { `${i}` } > 
            <h3> { section.heading }  </h3>

            { 
              section.content && section.content.map ((line: (string | Link)[]) => 
                {
                  return ( <p> { line.map ((segment: string | Link) => 
                    {
                      return typeof (segment) == "string" ? segment : 
                      (
                        <a href = { segment.url } target = "_blank" title = { segment.title }>{ segment.text }</a>
                      )
                    }) 
                  } </p>
                  )
                }
              )
            }

          </li>
          )) 
        }
      </ul>

    </div>
  )
};

export default README;