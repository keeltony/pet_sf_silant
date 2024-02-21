import { MainPage } from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { ListCarPage } from "./pages/ListCarPage";
import { NavbarComponent } from "./widgets/Navbar/Navbar";

export default function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/listcar" element={<ListCarPage />} />
      </Routes>
    </>
  );
}
