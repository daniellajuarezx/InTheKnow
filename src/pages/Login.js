import { useEffect, useRef, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"

const Login = ({uname, unameSetter}) => {
  const unameRef=useRef();
  const pwordRef=useRef();
  const [loginErrorMsg, loginErrorMsgSetter]=useState("");

  const navigate = useNavigate(); 

  const handleLogin=()=>{
    const user={
    uname:unameRef.current.value,
    pword:pwordRef.current.value
  }
  
  let parameters={
    method:"GET"
  }

  let url = `http://localhost:5009/user/${user.uname}`;
  console.log(url);
  fetch(url, parameters)
    .then(res=>res.json())
    .then(json=>{
      console.log(JSON.stringify(json))
      const u=json.user;
        if(!u || !u[0]){
          loginErrorMsgSetter ('invalid username/password');
        }
        else if (u[0].pword !== user.pword){
          loginErrorMsgSetter(`invalid username/password`);
        }
        else{
          console.log('valid username and password');
          unameSetter(user.uname);
        }
    })
  }; 
    console.log(`Login: uname=${uname}`)
    useEffect(() => {
      if (uname) {
        console.log(`Login: navigate( '/')` );
        navigate('/');
      }
    }, [uname, navigate]);
    return (<div className="loginpopup">     
        <h1>Login</h1>
        <div>Username <input type="text" ref={unameRef}/></div>
        <div>Password <input type="password" ref={pwordRef} /></div>
        <div>Don't have an account? {""}
          <Link to="/register">
            Sign up here!
          </Link>
        </div>
        <span>{loginErrorMsg}</span>
        <div><button onClick={handleLogin}>Login</button></div>
         </div>);
}
export default Login;