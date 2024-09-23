/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogin } from "react-google-login";

const clientID = import.meta.env.VITE_CLIENT_ID;

export default function Login({
  onSuccess,
}: {
  onSuccess: (response: any) => void;
}) {
  const onFailure = (res: any) => {
    alert(`Login failed! Current response: ${res}`);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
