import React, { createContext } from 'react'
const Info = createContext();
const Api = (props) => {
    
    const url="https://vaistrainfo.herokuapp.com/auth";
  return (
    <>
        <Info.Provider value={url}>
            {props.children}
        </Info.Provider>
    </>
  )
}

export default Api;
export {Info}