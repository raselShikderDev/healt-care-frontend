"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessLoggedInToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // useEffect(() => {
  //   console.log();
  //   if (searchParams.get("loggedIn") === "true") {
  //     toast.success("You have been logged in successfully");
  //   }
  //   const newUrl = new URL(window.location.href);
  //   newUrl.searchParams.delete("loggedIn");
  //   router.replace(newUrl.toString());
  // }, [searchParams, router]);

   useEffect(() => {
    const loggedIn = searchParams.get("loggedIn");

    if (loggedIn === "true") {
      toast.success("You have been logged in successfully");

      const newUrl = window.location.pathname; // remove all search params
      router.replace(newUrl); // replace only once
    }
  }, []); // run only once on mount
  return null;
};

export default SuccessLoggedInToast;


//  useEffect(() => {
//     const loggedIn = searchParams.get("loggedIn");

//     if (loggedIn === "true") {
//       toast.success("You have been logged in successfully");

//       const newUrl = window.location.pathname; // remove all search params
//       router.replace(newUrl); // replace only once
//     }
//   }, []); // run only once on mount
// NODE_ENV=development
