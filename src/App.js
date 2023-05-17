import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CaseStatus from "./pages/CaseStatus";
import SkuGenerator from "./pages/SkuGenerator";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<CaseStatus />} />
            <Route path="/sku-generator" element={<SkuGenerator />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </>
  );
}

export default App;
