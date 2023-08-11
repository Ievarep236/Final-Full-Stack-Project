import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RouterProvider router={routes} />
    </LocalizationProvider>
  );
};

export default App;
