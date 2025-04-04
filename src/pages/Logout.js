import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({uname,handleLogout}) => {
        handleLogout();
        const navigate = useNavigate();  
        useEffect(() => {
          if (!uname) {
            navigate('/login');
          }
        }, [uname, navigate]);
        return (<h1>User Logged Out</h1>)
}
export default Logout;