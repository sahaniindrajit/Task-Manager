'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Streamline Your Workflow",
    description: "Organize tasks efficiently and boost your productivity.",
  },
  {
    title: "Collaborate Seamlessly",
    description: "Work together with your team in real-time.",
  },
  {
    title: "Track Progress",
    description: "Monitor your projects with intuitive dashboards and reports.",
  },
  {
    title: "Never Miss a Deadline",
    description: "Set reminders and receive timely notifications.",
  },
]

export default function Component() {
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center w-full z-10 bg-white shadow-md">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/favicon.ico?height=40&width=40"
            width={40}
            height={40}
            alt="ManageFiasco logo"
            className="rounded-lg"
          />
          <span className="ml-2 text-xl sm:text-2xl font-bold text-gray-900">ManageFiasco</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button size="sm" className="text-sm sm:text-base" asChild>
            <Link href="/signin">Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full h-[calc(100vh-4rem)] relative overflow-hidden">
          <Image
            alt="Task Management"
            className="object-cover object-center w-full h-full"
            src="/hero.jpeg?height=1080&width=1920"
            layout="fill"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 lg:p-24 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-white">
              Manage Your Tasks with Ease
            </h1>
            <div className="h-20 sm:h-24 transition-opacity duration-500 ease-in-out">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">{features[currentFeature].title}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">{features[currentFeature].description}</p>
            </div>
            <Button size="lg" className="text-sm sm:text-base md:text-lg w-full sm:w-auto" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}