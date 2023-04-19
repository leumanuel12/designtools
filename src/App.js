import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Test from "./components/Test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Test />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </>
  );
}

export default App;
