import Header from "@/components/header-bar/Header";
import "./globals.css";
import LoginBackground from "./login/components/LoginBackground";
import LoginFooter from "./login/components/LoginFooter";
import LoginHeader from "./login/components/LoginHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Berta Medical",
  description: "The login page of Berta Medical.",
};

export default function LoginLayout({children}: {children: React.ReactNode}) {
    return (
      <div className="">
        <LoginHeader/>
        {children}
        <LoginFooter/>
      </div>
    )
  }