import "./App.css";
import { DashboardSideMenu } from "./components/dashboard-side-menu";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Sidemenu from "./components/Sidemenu";
import { Outlet } from "react-router-dom";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <main
      className={
        "relative flex min-h-screen flex-col items-start justify-start bg-light text-neutral-800"
      }
    >
      <section className="relative flex w-full flex-col items-start justify-start">
        <Sidemenu />
        <DashboardSideMenu />
        <NavBar />
        <TopBar />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
};

export default App;
