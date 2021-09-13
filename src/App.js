//import logo from "./logo.svg";
import "./App.css";
import Product from "./productData/product";
import Swipper from "./swipper/swipper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Swipper />
      <Router>
        <Switch>
          <Route exact path="/product" component={Product} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
