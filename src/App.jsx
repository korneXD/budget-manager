import "./App.css";
import { Homepage } from "./pages/Homepage";

import { Auth } from "./pages/Auth";
import { PWreset } from "./pages/PWreset";
import { Profile } from "./pages/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { DetailCategory } from "./pages/DetailCategory";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

const router = createBrowserRouter(
  [
    { path: "/", element: <Homepage /> },
    { path: "/transactions", element: <Transactions /> },
    /*{path:'/update/:id',element:<AddEditPost/>},*/
    { path: "/detail/:id", element: <DetailCategory /> },
    { path: "/auth/in", element: <Auth /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/auth/up", element: <Auth /> },
    { path: "/reset", element: <PWreset /> },
    { path: "/profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,

      v7_normalizeFormMethod: true,

      v7_fetcherPersist: true,

      v7_partialHydration: true,

      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
