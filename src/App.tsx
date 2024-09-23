import axios from "axios";
import Login from "./components/login";
import Logout from "./components/logout";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const ESP32_IP = "http://192.168.68.67";

function App() {
  const clientID = import.meta.env.VITE_CLIENT_ID;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendCommand = (endpoint: string) => {
    axios
      .get(`${ESP32_IP}/${endpoint}`)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error("There was an error sending the command!", error);
      });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "email profile",
      });
    }

    gapi.load("client:auth2", start);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginSuccess = (response: any) => {
    alert(`Login success! User: ${response.profileObj.name}`);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    alert("Logout successful");
    setIsLoggedIn(false);
  };

  return (
    <div className="w-dvw h-dvh bg-frost-300 flex justify-center items-center">
      <div className="w-4/5 h-4/5 bg-polar-night-400 rounded-lg flex flex-col justify-center items-center gap-5">
        <div className="flex flex-row w-4/5 justify-between">
          <h1 className="text-snow-storm-100 font-semibold text-5xl">
            AC Control Panel
          </h1>
          {!isLoggedIn ? (
            <Login onSuccess={handleLoginSuccess} />
          ) : (
            <Logout onLogout={handleLogout} />
          )}
        </div>

        {/* content to be conditionally rendered */}
        {isLoggedIn && (
          <div className="flex flex-row flex-wrap justify-center items-start gap-4">
            <button
              onClick={() => sendCommand("poweron")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Power ON
            </button>
            <button
              onClick={() => sendCommand("poweroff")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Power OFF
            </button>
            <button
              onClick={() => sendCommand("fan")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Fan
            </button>
            <button
              onClick={() => sendCommand("20c")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Set 20°C
            </button>
            <button
              onClick={() => sendCommand("18c")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Set 18°C
            </button>
            <button
              onClick={() => sendCommand("16c")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Set 16°C
            </button>
            <button
              onClick={() => sendCommand("swingon")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Swing ON
            </button>
            <button
              onClick={() => sendCommand("swingoff")}
              className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
            >
              Swing OFF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
