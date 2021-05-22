import React, { useState, createContext } from 'react';

const RocketContext = createContext([ {}, () => {} ]);

const RocketProvider = props => {
  const [auth, saveAuth ] = useState({
    token: localStorage.getItem("token") || '',
    user: JSON.parse(localStorage.getItem("user")) || {} 
  });

  return (
    <RocketContext.Provider value={[auth, saveAuth]}>
      {props.children}
    </RocketContext.Provider> 
  );
}

export { RocketContext, RocketProvider };