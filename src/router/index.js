import React from "react";

//layoutpages
import Default from "../layouts/dashboard/default";
import SignIn from "../views/dashboard/auth/sign-in";
import VerifyOTP from "../views/dashboard/auth/verify-otp";
import ResetPassword from "../views/dashboard/auth/reset-password";
import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";
import Index from "../views/dashboard/index";

export const IndexRouters = [
  {
    path: "/",
    element: <Default />,
    children: [...DefaultRouter,...Layout1Router],
  },
  {
    path: "auth/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "auth/reset-password",
    element: <ResetPassword />,
  },
];
