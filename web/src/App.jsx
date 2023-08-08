import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
    </LocalizationProvider>
  );
};

export default App;
