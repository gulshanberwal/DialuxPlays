"use client"
import Image from "next/image";
import localFont from 'next/font/local'
import { useState } from "react";
import { useRouter } from "next/navigation";

const Kenitfont = localFont({
  src: '/fonts/Kanit-ExtraBold.ttf',
});

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  


  return (
    <main>
      <section className=" h-screen bg-[#254f1a] justify-center items-center grid grid-cols-2">
        <div className="px-24 ml-18 justify-center items-start flex flex-col w-full">
          <h1 className={`text-[#d2e823] font-extrabold text-[89px] ${Kenitfont.className}`}>Everything you are. In one, </h1>
            <h1 className={`text-[#d2e823] font-extrabold text-[89px] ${Kenitfont.className}`}>simple link in bio.</h1>
          <p className="text-white font-bold text-xl py-3">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="inputandbutton flex gap-3 py-8">
            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter your Handle" className="bg-white p-4 rounded-xl focus:outline-green-800" type="text" />
            <button onClick={()=> createTree()} className="bg-pink-200 p-3 px-5 rounded-full font-semibold">Claim your PlayLink</button>
          </div>
        </div>
        <div className=" p-10">
          <img src="/phone.png" alt="phone image" />
        </div>

      </section>
      <section className=" h-screen bg-[#780016]">

      </section>
    </main>
  );
}
