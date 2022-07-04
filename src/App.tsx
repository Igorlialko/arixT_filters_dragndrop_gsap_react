import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FC, ReactNode, lazy, Suspense} from "react";
import TopBarProgress from "react-topbar-progress-indicator";

import Default from "./layouts/Default";

export default function App() {
  const HomePage = lazy(() => import("./pages/HomePage"));
  const EditPage = lazy(() => import("./pages/EditPage"));
  const ErrorPage = lazy(() => import("./pages/ErrorPage"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default/>}>
          <Route index element={
            <SuspensedView>
              <HomePage/>
            </SuspensedView>
          }/>
          <Route path=":id" element={
            <SuspensedView>
              <EditPage/>
            </SuspensedView>
          }/>
        </Route>
        <Route path="*" element={
          <SuspensedView>
            <ErrorPage/>
          </SuspensedView>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

const SuspensedView: FC<{ children: ReactNode }> = ({children}) => {
  TopBarProgress.config({
    barColors: {
      "0": "rgba(82, 34, 140, 1)",
    },
    barThickness: 2,
    shadowBlur: 10,
  });
  return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>;
};
