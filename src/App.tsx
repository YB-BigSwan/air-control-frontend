/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Login from "./components/login";
import Logout from "./components/logout";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import lilyHappy from "./assets/lily_happy.gif";
import lilySad from "./assets/lily_sad.gif";

function App() {
  const clientID = import.meta.env.VITE_CLIENT_ID;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sensorData, setSensorData] = useState<{
    temp: number;
    hum: number;
    co2: number;
    voc: number;
  } | null>(null);

  const sendCommand = (endpoint: string) => {
    axios
      .get(`${import.meta.env.VITE_HEROKU_SERVER_URL}/${endpoint}`)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error("There was an error sending the command!", error);
      });
  };

  const fetchSensorData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HEROKU_SERVER_URL}/sensor-data`
      );
      setSensorData(response.data); // Update state with the received data
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "email profile",
      });
    }

    gapi.load("client:auth2", start);

    if (isLoggedIn) {
      fetchSensorData();
      const interval = setInterval(() => {
        fetchSensorData(); // Fetch sensor data every minute or adjust as needed
      }, 60000); // 60,000 milliseconds = 1 minute

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

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
      <div className="w-4/5 h-4/5 bg-polar-night-400 rounded-lg flex flex-col justify-around items-center gap-5 sm: w-5/6">
        <div className="flex flex-row w-4/5 justify-between sm: text-xl flex-col gap-4">
          <h1 className="text-snow-storm-100 font-semibold text-5xl">
            AC Control Panel
          </h1>
          <div>
            {!isLoggedIn ? (
              <Login onSuccess={handleLoginSuccess} />
            ) : (
              <Logout onLogout={handleLogout} />
            )}
          </div>
        </div>
        <div className="w-4/5 flex justify-center items-center">
          {sensorData && (sensorData.co2 > 900 || sensorData.voc > 300) ? (
            <div className="w-4/5 h-20 flex justify-center items-center">
              <img src={lilySad} alt="a pixel sprite gif of a happy cat" />
            </div>
          ) : (
            <div className="w-4/5 h-20 flex justify-center items-center">
              <img src={lilyHappy} alt="a pixel sprite gif of a sad cat" />
            </div>
          )}
        </div>
        <div className="w-4/5 flex flex-col justify-center items-center">
          <span className="flex flex-row justify-between items-center mb-4 w-full">
            <p className="text-snow-storm-100">CO2 | {sensorData?.co2}ppm</p>
            <p className="text-snow-storm-100">TMP | {sensorData?.temp}°C</p>
          </span>
          <span className="flex flex-row justify-between items-center w-full">
            <p className="text-snow-storm-100">VOC | {sensorData?.voc}ppb</p>
            <p className="text-snow-storm-100">
              HUM | {sensorData?.hum.toFixed(1)}%
            </p>
          </span>
        </div>
        {/* content to be conditionally rendered */}
        {isLoggedIn && (
          <div className="flex flex-row flex-wrap justify-center items-start gap-4 sm: flex-col w-4/5">
            <div className="flex flex-row gap-4">
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
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => sendCommand("fanLow")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet text-nowrap"
              >
                Fan 1
              </button>
              <button
                onClick={() => sendCommand("fanMed")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet text-nowrap"
              >
                Fan 2
              </button>
              <button
                onClick={() => sendCommand("fanHigh")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet text-nowrap"
              >
                Fan 3
              </button>
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => sendCommand("20c")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
              >
                20°C
              </button>
              <button
                onClick={() => sendCommand("18c")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
              >
                18°C
              </button>
              <button
                onClick={() => sendCommand("16c")}
                className="bg-frost-300 text-polar-night-400 pt-2 pb-2 pr-4 pl-4 rounded-md border-2 border-frost-300 hover:border-n-violet"
              >
                16°C
              </button>
            </div>
            <div className="flex flex-row gap-4">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
