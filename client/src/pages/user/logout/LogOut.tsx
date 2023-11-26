import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useEffect} from "react";

function LogOut() {
  const navigate = useNavigate();

  const redirectToHome = () => navigate('/');

  useEffect(() => {
    sessionStorage.removeItem('isLoggedIn');
    redirectToHome();
  }, []);

  return (
    <div className="user-logout">
      <span>You were logged out. In case you weren't redirected, press the button below.</span>
      <Button onClick={redirectToHome}></Button>
    </div>
  );
}

export { LogOut };
