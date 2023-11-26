import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useEffect} from "react";

function LogOut() {
  const navigate = useNavigate();

  const redirectToLogIn = () => navigate('/user/login');

  useEffect(() => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    redirectToLogIn();
  }, []);

  return (
    <div className="user-logout">
      <span>You were logged out. In case you weren't redirected, press the button below.</span>
      <Button onClick={redirectToLogIn}>Back to login</Button>
    </div>
  );
}

export { LogOut };
