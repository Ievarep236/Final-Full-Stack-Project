import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./pageLayout/PageLayout";
import CustomerPage from "./pages/customer-page/CustomerPage";
import LogInPage from "./pages/login-page/LogInPage";
import RegisterPage from "./pages/register-page/RegisterPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <LogInPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/clients",
        element: <CustomerPage />,
      },
    ],
  },
]);
