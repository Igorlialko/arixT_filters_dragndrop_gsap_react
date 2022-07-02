import {BrowserRouter,Route, Routes} from "react-router-dom";

import Default from "./layouts/Default";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import EditPage from "./pages/EditPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default/>} >
          <Route index element={<HomePage/>} />
          <Route path=":id" element={<EditPage/>} />
        </Route>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
