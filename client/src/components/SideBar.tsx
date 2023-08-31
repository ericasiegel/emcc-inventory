
import LowCountsSidebar from "./LowCountsSidebar";
import BakeryListNav from "./BakeryListNav";
import ActiveCookiesNav from "./ActiveCookiesNav";
import useCookies from "../hooks/useCookies";


interface Props {
  onSelectActive: (is_active: boolean | null) => void;
  setSelectedlabel: (label: string) => void;
}

const SideBar = ({ onSelectActive, setSelectedlabel }: Props) => {
  const { data } = useCookies(null);
  return (
    <>
      <ActiveCookiesNav onSelectActive={onSelectActive} setSelectedlabel={setSelectedlabel} />
      <BakeryListNav />
      <LowCountsSidebar lowCookieCounts={data} />
    </>
  );
};

export default SideBar;
