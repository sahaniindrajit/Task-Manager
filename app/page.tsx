
'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="p-4 flex justify-between items-center">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/favicon.ico?height=40&width=40"
            width={40}
            height={40}
            alt="ManageFiasco logo"
            className="rounded-lg"
          />
          <span className="text-2xl font-bold">ManageFiasco</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-6">
          <Link href="https://github.com/sahaniindrajit/Task-Manager" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <Star className="h-4 w-4" />
              Star on GitHub
            </Button>
          </Link>

          <Button variant="outline" size="sm" className="gap-2">

            <Link href="/signin">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex min-h-[calc(100vh-80px)] m-auto flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center text-center px-4">
          <div className="mb-6 text-lg sm:text-xl md:text-2xl font-semibold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              🛠️ Introducing ManageFiasco
            </span>
          </div>
          <h1 className="md:text-7xl text-3xl font-bold mt-6 mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Streamline Your Workflow.
            <br /> Track Progress.
          </h1>
          <p className="mb-8 text-lg text-gray-300 max-w-2xl">
            Organize tasks efficiently and boost your productivity.
          </p>
          <form >
            <Link href="/signup">
              <Button
                type="submit"
                className="rounded-full"
                variant="secondary"
                size="lg"
              >

                <span className="text-base">Get Started</span>
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>

          </form>
          <div className="relative mt-12 flex max-w-6xl justify-center overflow-hidden">
            <Image
              src="/hero.jpeg"
              alt="ManageFiasco Dashboard Preview"
              width={1300}
              height={800}
              className="h-full w-full rounded-lg object-cover shadow-2xl"
              style={{
                maskImage: `linear-gradient(to bottom, black 80%, transparent)`,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}