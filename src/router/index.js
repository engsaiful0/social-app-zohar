import React from "react";

//layoutpages
import Default from "../layouts/dashboard/default";
import SignIn from "../views/dashboard/auth/sign-in";
import VerifyOtp from "../views/dashboard/auth/verify_otp";
import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";

export const IndexRouters = [
  {
    path: "/",
    element: <SignIn />,
    children: [...DefaultRouter, ...Layout1Router],
  },
  {
    path: "timeline",
    element: <Default />,
    children: [...DefaultRouter, ...Layout1Router],
  },
  {
    path: "auth/verify_otp",
    element: <VerifyOtp />,
  },
];
