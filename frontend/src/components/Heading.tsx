import React from "react";

export interface Props
{
  title: string
};

const Heading: React.FC <Props> = (props: Props) => 
{
  return (
  <div className = "Heading">
    <header>
        
      <h1> { props.title } </h1>

      <ul>
        <li>
          <a href="/" target = "_self"> <h3> Home </h3> </a> 
        </li>
        <li>
          <a href="/contact" target = "_self"> <h3> Contact </h3> </a> 
        </li>
        <li>
          <a href="/" target = "_self"> <h3> Other </h3> </a> 
        </li>
      </ul>
        
    </header>
  </div>
  );
}; 

export default Heading;