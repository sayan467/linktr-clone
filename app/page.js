"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("")

  const router = useRouter()

  const createtree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex flex-col justify-center items-left ml-[6vw] mt-[20vh] gap-4">
          <p className="text-yellow-300 font-bold text-5xl top-20">Everything you are. In one, simple link in bio.</p>
          <p className="text-yellow-300 text-md">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-3">
            <input value={text} onChange={(e) => setText(e.target.value)} className="px-3 py-4 focus:outline-white rounded-md" type="text" placeholder="Enter your handle" />
            <button onClick={() => createtree()} className="bg-pink-200 rounded-full font-semibold px-6 py-4">Claim your Nexttree</button>
          </div>
        </div>
        <div className="mr-[10vw] mt-[34vh]">
          <img src="/home.jpg" alt="homepage" />
        </div>
      </section>
      <section className="bg-[#e9c0ea] min-h-[100vh] grid grid-cols-2">
      <div className="ml-[10vw] mt-[34vh]">
          <img src="/home2.jpg" alt="homepage" />
        </div>
        <div className="flex flex-col justify-center items-left ml-[2vw] mt-[20vh] gap-4 mr-[4vw]">
          <p className="text-purple-900 font-bold text-5xl top-20">Everything you are. In one, simple link in bio.</p>
          <p className="text-purple-900 text-md">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-3">
            <button onClick={() => createtree()} className="bg-purple-900 text-white rounded-full mt-12 font-semibold px-6 py-4">Get Started for free</button>
          </div>
        </div>
      </section>
      
    </main>
  );
}
