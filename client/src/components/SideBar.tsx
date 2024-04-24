import LowCountsSidebar from "../counts/LowCountsSidebar";
import ActiveCookiesNav from "../cookies/ActiveCookiesNav";
import LocationCard from "../location/LocationCard";

const SideBar = () => {
  return (
    <>
      <ActiveCookiesNav />
      <LocationCard />
      <LowCountsSidebar />
    </>
  );
};

export default SideBar;
