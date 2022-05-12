import React,{ useState , createContext} from 'react'


let LocalStoragedata = createContext();

const getToken = () => {
    let store = JSON.parse(localStorage.getItem("logintoken"));
    if (store) {
      return JSON.parse(localStorage.getItem("logintoken"));
    } else {
      return {};
    }
  };
const Local = (props) => { 
   
    const [token, setToken] = useState(getToken());

  return (
    <>
         <LocalStoragedata.Provider value={token}>
           {props.children}
         </LocalStoragedata.Provider>
    </>
  )
}

export default Local;
export {LocalStoragedata};