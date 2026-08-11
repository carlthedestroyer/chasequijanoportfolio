import Header from "@/components/header-bar/Header";
import "./globals.css";
import { Metadata } from "next";
import LoginFooter from "@/app/(auth)/login/components/LoginFooter";

export default function DebugLayout({children}: {children: React.ReactNode}) {
    return (
      <div className="bg-gray-800 absolute h-full w-full">
        {children}
      </div>
    )
  }