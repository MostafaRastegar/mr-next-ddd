"use client";

import { usePathname, useRouter } from "next/navigation";
import objectToQueryString from "papak/utils/objectToQueryString";
import { useSearchParamsToObject } from "papak/utils/useSearchParamsToObject";

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export const useMakeParamsUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParamsToObject();
  const page = searchParams?.["page"] || "1";
  const page_size = searchParams?.["page_size"] || "50";

  function resetPage() {
    topFunction();
    return router.push(
      `${pathname}?${objectToQueryString({ page, page_size })}`
    );
  }
  return { resetPage };
};
export const useMakeSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParamsToObject();
  const page = "1";
  const page_size = searchParams?.["page_size"] || "50";
  const orderingParams = searchParams?.["ordering"] || "";

  function onSort(ordering: string) {
    topFunction();
    const sorting = ordering === orderingParams ? "-" + ordering : ordering;
    return router.push(
      `${pathname}?${objectToQueryString({
        page,
        page_size,
        ordering: sorting,
      })}`
    );
  }
  return {
    onSort,
    orderingParams,
    originalPath: `${pathname}?${objectToQueryString({
      page,
      page_size,
      ordering: "",
    })}`,
    hasOrder: !!orderingParams,
  };
};
