import React from "react";

const Heading: React.FC <{}> = () => 
{
  return (
  <div>
    <header>

      <h1> Portfolio </h1>
      <p> A description of my software projects and skills </p>
        
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