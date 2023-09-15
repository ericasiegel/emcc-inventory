
import LowCountsSidebar from "./LowCountsSidebar";
import BakeryListNav from "./BakeryListNav";
import ActiveCookiesNav from "./ActiveCookiesNav";


const SideBar = () => {

  return (
    <>
      <ActiveCookiesNav />
      <BakeryListNav />
      <LowCountsSidebar />
    </>
  );
};

export default SideBar;
