import { Badge } from "@chakra-ui/react";


interface Props {
    size: string; 
    count: number;
    
}

const ColorBadge = ({size, count}: Props) => {
  const colorScheme = count > 5 ? "green" : "red";
  return (
    <Badge fontSize={size} paddingX={2} colorScheme={colorScheme}>{count}</Badge>
  )
}

export default ColorBadge;