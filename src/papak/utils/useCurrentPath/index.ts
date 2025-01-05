import { usePathname } from "next/navigation";

export const useCurrentPath = () => {
  const pathname = usePathname();
  const pathnameList = pathname.split("/");
  const currentPath = pathnameList[pathnameList.length - 1] as string;
  const currentPathParent = pathnameList[pathnameList.length - 2] as string;
  const currentPathMainParent =
    (pathnameList?.[pathnameList.length - 3] as string) || "";

  return {
    pathname,
    pathnameList,
    currentPath,
    currentPathParent,
    currentPathMainParent,
  };
};
