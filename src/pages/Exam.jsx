import axios from 'axios';
import React,{ useState, useEffect, useRef , useContext} from 'react'
import { Link , useNavigate, BrowserRouter as Router} from 'react-router-dom'
import { LocalStoragedata } from '../component/local';
import UserSidebar from '../component/UserSidebar';

const getLang = () => {
  let lang = localStorage.getItem("lang");
  if (lang) {
    return localStorage.getItem("lang");
  } else {
    return null;
  }
}

const Exam = () => {
  let api=process.env.REACT_APP_API;
  let navigate = useNavigate();
  const [lang] = useState(getLang());
  const token = useContext(LocalStoragedata)
  const [timer, setTimer] = useState('00:00');
  const [questions, setQuestions] = useState([])
  const [counter, setCounter] = useState(0);
  let [score, setScore] = useState(0);
  let [not, setNot] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(0);
  const [checkradio,setCheckradio] = useState(false);
  const [store,setStore] = useState();
  const [show,setShow]=useState(true)
  const aRef = useRef();
  const bRef = useRef();
  const cRef = useRef();
  const dRef = useRef();
   let score2 = 0;  

  const [wrongAnswers, setWrongAnswers] = useState(0);
  let module = localStorage.getItem('lang')

  const incrementCounter = () => {
    setCounter(counter + 1);
    aRef.current.checked = false
    bRef.current.checked = false
    cRef.current.checked = false
    dRef.current.checked = false
    // resultSide();
    



    if (questions.length - 1 <= counter) { 
      //   localStorage.setItem("score",score);
      //   console.log(score)
      //   localStorage.setItem("wrongAnswers",wrongAnswers);
      //   localStorage.setItem("not",not);
      //   // addition === questions.length ? localStorage.setItem('not', notans) : localStorage.setItem('wrongAnswers', wrongAnswers - 1)
      // navigate('/examresult', { replace: true })
      setShow(false)
    } else {
      // console.log("Exam is not over");
    }

     
    if (questions[counter].answer === store) {   
      setScore(score + 1)
   }else if(!checkradio){
     setNot(not + 1)
   }else{
     setWrongAnswers(wrongAnswers + 1)      
  }
    
  // console.log(score);
    setStore("");
    setCheckradio(false)
  };

  const calculateAnswer = (e) => {
      if(e.target.checked){
          setCheckradio(true);
          setStore(e.target.value);
      }else{
          setCheckradio(false);
          setStore("");
      }
      
  }

 //2 min Timer Start
 useEffect(() => {
  clearTimer(getDeadlineTime());

     
  const timer =  setInterval(()=>{
    setCounter(counter + 1)
    aRef.current.checked = false
    bRef.current.checked = false
    cRef.current.checked = false
    dRef.current.checked = false
    setStore("")
   }, 120000)
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    clearInterval(timer);
  }
}, [counter])

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 * 60 * 60) % 24);
  const days = Math.floor((total / 1000 * 60 * 60 * 24));

  return {
    total, seconds, minutes, hours, days
  }
}

function startTimer(deadline) {
  let { total, minutes, seconds } = getTimeRemaining(deadline);
  if (total >= 0) {
    setTimer(
      (minutes > 9 ? minutes : '0' + minutes) + ':' +
      (seconds > 9 ? seconds : '0' + seconds) + ''
    )
  } else {
    clearInterval(intervalRef.current)
  }
}
function clearTimer(endtime) {
  setTimer('02:00');
  if (intervalRef.current) clearInterval(intervalRef.current);
  const id = setInterval(() => {
    startTimer(endtime);
  }, 1000)
  intervalRef.current = id;
}
function getDeadlineTime() {
  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 120);
  return deadline
}

const startExam = () => {
  // e.preventDefault();
  axios.get(`${api}/api/question/${lang}`, {
    headers: {
      Authorization: "Bearer " + token.token
    }
  })
    .then((response) => {
      setQuestions(response.data.question)
       
      // console.log(response);
    })
    .catch(error => {
      // console.log(error);
    })
}
useEffect(() => {
  startExam()

  if(lang){
    setLoading(true)
  }else{
    setLoading(false)
  }
}, [])

const submitExam=()=>{
  localStorage.clear();
  navigate('/',{replace:true})

}


  return (
      <>
{  show ? <> 
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
       <Link className="navbar-brand ps-3" to="/">
          User  Panel
        </Link>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          to="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
             

        
          <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li>
                <Link className="navbar-brand" to="/">Section</Link>
              </li>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <li>
                <span className='badge bg-secondary p-2'>{module}</span>
              </li>
              {/* <li>
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: 10 }}>
                  <label htmlFor="" style={{ color: "white" }}>Marks:</label>
                  <span className='badge bg-success mx-2'>{score}</span>
                  <span className='badge bg-danger'>{wrongAnswers}</span>
                </div>
              </li> */}
              <li>
              {
                loading ? 
                <div style={{ display: 'flex', alignItems: 'center', color: 'white', position: 'absolute', right: 50 }}>
                  Time: {timer}   {score}
                </div> : <div></div>
              }
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="layoutSidenav">
           <UserSidebar/>
           <div id="layoutSidenav_content">
           
          {
            loading ? 
          <div className="container">
          <form action="">
        <div className="row">
          <h2 style={{ marginTop: "80px" }}>Question No. {counter + 1}</h2>

          <b className='my-2 fs-4'>{questions[counter]?.question}</b>
          <label>
            <input type="radio" className='mx-2' name='radio' onChange={calculateAnswer} value="A" ref={aRef} />
            {questions[counter]?.option_a}
          </label>
          <label>
            <input type="radio" className='mx-2' name='radio' onChange={calculateAnswer} value="B" ref={bRef} />
            {questions[counter]?.option_b}
          </label>
          <label>
            <input type="radio" className='mx-2' name='radio' onChange={calculateAnswer} value="C" ref={cRef} />
            {questions[counter]?.option_c}
          </label>
          <label>
            <input type="radio" className='mx-2' name='radio' onChange={calculateAnswer} value="D" ref={dRef} />
            {questions[counter]?.option_d}
          </label>
          {/* {
                questions.map((ele, index) => {
                  return (
                    <>
                      {
                        <option  value={ele.question}>{ele.question}</option>
                      }
                    </>
                  )
                })
              } */}
          <div className="text-end">
            <button type='button' className='btn-primary btn-sm w-25 my-5' onClick={incrementCounter}>Next</button>
          </div>
        </div>
      </form>
     
          </div> : <div className='d-flex justify-content-center align-items-center fs-1 min-vh-100'>Please go to back and select the module</div>
          }
          </div>
      </div>  </> :  <div className="container">
                <div className="row">
                    <h2 className='text-center mb-5'>Result</h2>
                    <table className='text-center'>
                        <thead className='bg-info text-light border'>
                            <tr>
                                <th>Section</th>
                                <th>Answered</th>
                                <th>wrong Answered</th>
                                <th>Not Answered</th>
                            </tr>
                        </thead>
                        <tbody className='border'>
                            <tr>
                                <td>{lang}</td>
                                <td>{score}</td>
                                <td>{wrongAnswers}</td>
                                <td>{not}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-primary my-5' onClick={submitExam}>Submit</button>
                </div>
            </div>
}
    </>
  )
}

export default Exam