
import LowCountsSidebar from "./LowCountsSidebar";
import BakeryListNav from "./BakeryListNav";
import ActiveCookiesNav from "./ActiveCookiesNav";
import useCookies from "../hooks/useCookies";

interface Props {
  updateCookieQuery: (selectedActive: boolean | null, selectedLabel: string) => void; // Define the prop type
}


const SideBar = ({ updateCookieQuery }: Props) => {
  const { data } = useCookies(null);


  return (
    <>
      <ActiveCookiesNav onSelectActive={updateCookieQuery} />
      <BakeryListNav />
      <LowCountsSidebar lowCookieCounts={data} />
    </>
  );
};

export default SideBar;
