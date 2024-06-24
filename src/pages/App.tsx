import "../styles/App.css";
import { Button } from "../components/ui/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="w-[300px]" variant={"default"}>
          Test
        </Button>
      </header>
    </div>
  );
}

export default App;
