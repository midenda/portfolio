import React from "react";

const year: number = new Date ().getFullYear ();

const Footing: React.FC <{}> = () => 
{
  return (
  <div>
    <footer>
        <small> Copyright &copy; { year } Andrew Midenda. All rights reserved. </small>
        <div>
          Contact: andrew.midenda@gmail.com
        </div>
      </footer>
  </div>
  );
}; 

export default Footing;