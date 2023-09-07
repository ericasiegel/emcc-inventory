
import LowCountsSidebar from "./LowCountsSidebar";
import BakeryListNav from "./BakeryListNav";
import ActiveCookiesNav from "./ActiveCookiesNav";
import useCookies from "../hooks/useCookies";
import { CookieQuery } from "../App";

interface Props {
  updateCookieQuery: (selectedActive: boolean | null, selectedLabel: string) => void; 
  cookieQuery: CookieQuery
}


const SideBar = ({ updateCookieQuery, cookieQuery }: Props) => {
  const { data } = useCookies(cookieQuery);


  return (
    <>
      <ActiveCookiesNav onSelectActive={updateCookieQuery} />
      <BakeryListNav />
      <LowCountsSidebar lowCookieCounts={data} />
    </>
  );
};

export default SideBar;
