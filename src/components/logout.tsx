/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleLogout } from "react-google-login";

const clientID = import.meta.env.VITE_CLIENT_ID;

export default function Logout({ onLogout }: { onLogout: () => void }) {
  return (
    <GoogleLogout
      clientId={clientID}
      buttonText={"Logout"}
      onLogoutSuccess={onLogout}
    />
  );
}
