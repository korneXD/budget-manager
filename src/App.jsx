import "./App.css";
import { Homepage } from "./pages/Homepage";

import { Auth } from "./pages/Auth";
import { Profile } from "./pages/Profile";
import Results from "./pages/Results";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { ResetPassword } from "./pages/ResetPassword";
import { Toaster } from "sonner";
import Settings from "./pages/Settings";
import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { WhyChooseUs } from "./pages/WhyChooseUs";
import { FAQ } from "./pages/FAQ";
import { BudgetDiagram } from "./components/budget-diagram";

const router = createBrowserRouter(
  [
    { path: "/", element: <Homepage /> },
    { path: "/transactions", element: <Transactions /> },
    { path: "/auth/in", element: <Auth /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/auth/up", element: <Auth /> },
    { path: "/reset", element: <ResetPassword /> },
    { path: "/profile", element: <Profile /> },
    { path: "/settings", element: <Settings /> },
    { path: "/results", element: <Results /> },
    { path: "/contact", element: <Contact /> },
    { path: "/features", element: <Features /> },
    { path: "*", element: <NotFound /> },
    { path: "/whychooseus", element: <WhyChooseUs /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/budget-diagram", element: <BudgetDiagram /> }
  ],
  {
    future: {
      v7_relativeSplatPath: true,

      v7_normalizeFormMethod: true,

      v7_fetcherPersist: true,

      v7_partialHydration: true,

      v7_skipActionErrorRevalidation: true,
    },
  },
);

function App() {
  return (
    <>
      <Toaster
        richColors
        toastOptions={{}}
        theme="dark"
        position="bottom-right"
      />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
