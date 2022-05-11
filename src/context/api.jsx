import React, { createContext } from 'react'
const Info = createContext();
const Api = (props) => {
    
    const url="http://192.168.0.138:5000/";
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