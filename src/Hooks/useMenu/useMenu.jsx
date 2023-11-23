import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const {
    data: popularItems = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: () =>
      fetch("http://localhost:5007/menus").then((res) => res.json()),
  });

  return [popularItems, loading, refetch];
};

export default useMenu;
