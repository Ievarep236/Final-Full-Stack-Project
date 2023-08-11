import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { StyledContainer } from "./PageLayout.style";
import Header from "../Header/Header";

const PageLayout = () => {
  return (
    <StyledContainer>
      <Header />
      <Outlet />
      <Footer />
    </StyledContainer>
  );
};

export default PageLayout;
