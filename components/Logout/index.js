import { GoogleLogout } from "react-google-login";

const onLogoutSuccess = () => {
  localStorage.removeItem("x-token");
};

const Logout = () => (
  <GoogleLogout
    clientId={process.env.GOOGLE_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={onLogoutSuccess}
  />
);

export default Logout;
