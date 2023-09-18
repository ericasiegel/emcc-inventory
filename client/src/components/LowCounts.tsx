import { Cookie } from "../entities/Cookie";
import LowCountListItem from "./LowCountListItem";

interface Props {
  cookies: Cookie[];
  filterCriteria: (cookie: Cookie) => boolean;
  displayData: (cookie: Cookie) => number;
}

const LowCounts = ({ cookies, filterCriteria, displayData }: Props) => {
  return (
    <>
      {cookies.filter(filterCriteria).map((cookie) => (
        <LowCountListItem
          key={cookie.id}
          name={cookie.name}
          count={displayData(cookie)}
        />
      ))}
    </>
  );
};

export default LowCounts;
