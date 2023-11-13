import LowCountsSidebar from "../counts/LowCountsSidebar";
import ActiveCookiesNav from "../cookies/ActiveCookiesNav";

const SideBar = () => {
  return (
    <>
      <ActiveCookiesNav />
      <LowCountsSidebar />
    </>
  );
};

export default SideBar;
