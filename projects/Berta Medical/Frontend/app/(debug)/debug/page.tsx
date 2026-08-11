import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/authOptions";
import DebugPanel from "./debugComponents/DebugPanel";
import { getServerSession } from "next-auth";
import Link from "next/link";
import WhoAreYou from "./debugComponents/WhoAreYou";
import DebugGraph from "./debugComponents/DebugGraph";

export const metadata = {
  title: "??? | Berta Medical",
  description: "The debug page of Berta Medical.",
  openGraph: {
    title: "Debug | Berta Medical",
    description: "The debug page of Berta Medical.",
  },
}



export default async function Debug() {
  const session = await getServerSession(authOptions)
  return (
    <>
    {
      session ? (
        <>
          <div className="w-max h-max bg-black m-5 p-10 rounded-[40px]">
            <div className="relative w-max h-max flex">
              <DebugPanel/>
              <div className="absolute w-full h-full bg-black bg-opacity-100 bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[50px]"></div>
            </div>
          </div>
          <DebugGraph/>
        </>
      )
      :
      (
        <WhoAreYou/>
      )
    }
    </>
  )
}