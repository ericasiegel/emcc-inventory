
import LowCountsSidebar from "./LowCountsSidebar";
import BakeryListNav from "./BakeryListNav";
import ActiveCookiesNav from "./ActiveCookiesNav";
import { CookieQuery } from "../App";

interface Props {
  updateCookieQuery: (selectedActive: boolean | null, selectedLabel: string) => void; 
  cookieQuery: CookieQuery
}

const SideBar = ({ updateCookieQuery, cookieQuery }: Props) => {

  return (
    <>
      <ActiveCookiesNav onSelectActive={updateCookieQuery} />
      <BakeryListNav />
      <LowCountsSidebar cookieQuery={cookieQuery} />
    </>
  );
};

export default SideBar;
