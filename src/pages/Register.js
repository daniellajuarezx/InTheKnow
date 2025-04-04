import { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

const Register = ({uname, unameSetter}) => {
  const unameRef=useRef();
  const pwordRef=useRef();  

  const navigate = useNavigate(); 

  const handleRegister=()=>{
    const user={
    uname:unameRef.current.value,
    pword:pwordRef.current.value
  }
  
  let parameters={
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user),
  }

  let url = `http://localhost:5009/user`;
  fetch(url, parameters)
    .then(res=>res.json())
    .then(json=>{
        unameSetter(user.uname);
        navigate("/");
    })
  }; 
    useEffect(() => {
      if (uname) {
        console.log(`Register: navigate('/')`);
        navigate("/");
      }
    }, [uname, navigate]);
    return (
        <div className="loginpopup">     
            <h1>Register</h1>
            <div>Username <input type="text" ref={unameRef}/></div>
            <div>Password <input type="password" ref={pwordRef} /></div>
            <div><button onClick={handleRegister}>Add User</button></div>
        </div>);
}
export default Register;
