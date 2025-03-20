import Link from "next/link"
import { ShoppingBag, Home } from "lucide-react"
import NavbarWrapper from "@/app/components/Navbarwrapper"
import Footer from "@/app/components/footer"

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWrapper />

      <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-md max-w-lg">
          <div className="mb-6 rounded-full bg-gray-100 p-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>

          <h3 className="mb-3 text-xl font-semibold text-gray-800">Category Not Found</h3>

          <p className="mb-8 max-w-md text-gray-600">
            We couldnt find the category youre looking for. It may have been removed or doesnt exist.
          </p>

          <Link
            href="/categories"
            className="flex items-center gap-2 rounded-md bg-[#FF8C48] px-6 py-3 font-medium text-white transition-colors hover:bg-[#e67e3e]"
          >
            <Home className="h-5 w-5" />
            <span>Back to Categories</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

