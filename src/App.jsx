import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import TagStatus from './elements/Tag/TagStatus'
import TagMonthYear from "./elements/Tag/TagMonthYear";
import TagText from "./elements/Tag/TagText";
import TagRole from "./elements/Tag/TagRole";
import TagBookingStatus from "./elements/Tag/TagBookingStatus";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <TagStatus 
        status={"pending"}
      />
      <TagStatus 
        status={"cancel"}
      />
      <TagStatus 
        status={"done"}
      />
      <TagMonthYear 
        duration={"1 month"}
      />
      <TagMonthYear 
        duration={"3 month"}
      />
      <TagMonthYear 
        duration={"1 year"}
      />
      <TagText 
        text={'Beginer'}
      />
      <TagRole 
        role={'admin'}
      />
      <TagRole 
        role={'manager'}
      />
      <TagRole 
        role={'auditor'}
      />
      <TagBookingStatus 
        status={"booked"}
      />
      <TagBookingStatus 
        status={"cancel"}
      />
    </>
  );
}

export default App;
