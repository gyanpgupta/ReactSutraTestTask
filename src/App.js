import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './form';
import DetailShow from './detail_show';
import {apiHost} from "./constant.js"

function App() {
  const [readAccess, setAccess] = useState(true);
  const handleSubmit = () => {
    let temp = !readAccess 
    setAccess(temp)
  }

  useEffect(() => {
    axios.post(`${apiHost}/`);        // to insert default data in db
  });
  return (
    <div>
      {
        readAccess 
        ?
        <DetailShow readAccess={readAccess} handleSubmit={handleSubmit}/>  //this component is used to show details
        :
        <Form readAccess={readAccess} handleSubmit={handleSubmit}/>  //this component is used to update existing details
      }
    </div>
  );
}

export default App;
