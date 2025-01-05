"use client";

import { useRouter } from "next/navigation";
import objectToQueryString from "papak/utils/objectToQueryString";
import { clientLocaleDetector } from "papak/utils/clientLocaleDetector";
import { useSearchParamsToObject } from "papak/utils/useSearchParamsToObject";

export const useParamsChange = (pathUrl: string) => {
  const router = useRouter();
  const searchParams = useSearchParamsToObject();
  const NEXT_LOCALE = clientLocaleDetector();
  const pageParams = searchParams?.["page"] || "1";
  const sizeParams = searchParams?.["page_size"] || "50";

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const onChangeHandler = (page: any, page_size: any) => {
    topFunction();
    const newParamsPath = `${pathUrl}?${objectToQueryString({
      ...searchParams,
      page,
      page_size,
    })}`;
    return router.replace(`/${NEXT_LOCALE}/${newParamsPath}`);
  };

  return {
    onChangeHandler,
    pageParams,
    sizeParams,
  };
};
