import React from "react";
import Dashboard from "../layouts/dashboard-layout";
import "../styles/App.css";

function Main() {
  return (
    <div className="App">
      {/* <header className="App-header">
  <Button className="w-[300px]" variant={"default"}>
    Test
  </Button>
</header> */}
      <Dashboard>
        <p>this is test</p>
      </Dashboard>
    </div>
  );
}

export default Main;
