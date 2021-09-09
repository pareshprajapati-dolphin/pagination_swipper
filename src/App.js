//import logo from "./logo.svg";
import "./App.css";
import Product from "./productData/product";
import Swipper from "./swipper/swipper";

function App() {
  return (
    <div className="App">
      <Swipper />
      <div className=" container mt-3">
        <Product />
      </div>
    </div>
  );
}

export default App;
