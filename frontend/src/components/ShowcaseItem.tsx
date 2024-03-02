import React from "react";
import LatestCommit from "./LatestCommit";

export interface Props
{
  name:         string,
  description:  string | null,
  id:           number | string,
  url:          string,
  language:     string | null,
  image?:       string | undefined,
  commits?:     any    | undefined,
  latest?:      any    | undefined
};

const ShowcaseItem: React.FC <Props> = (props: Props) => {
  return (
    <div className = "ShowcaseItem" key = { props.id } >
      <a href =       { props.url || "" } target = "_blank">
        <h1>          { props.name } </h1>
        <p>           { props.description } </p>
        <img src =    { props.image } alt = "" />
        <LatestCommit { ...props.latest } />      
      </a>
    </div>
  );
};

function mapShowcaseItem (item: Props) 
{
  return (
    <ShowcaseItem 
      name =         { item.name }
      description =  { item.description }
      id =           { item.id }
      url =          { item.url }
      language =     { item.language }
      image =        { item.image }
      commits =      { item.commits } 
      latest =       { item.latest }
    />)
};

export default ShowcaseItem;