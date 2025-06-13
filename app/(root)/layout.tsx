import { ScrollProgress } from "@/components/ScrollProgress";
import Navigation from "../../components/Navigation";
import Footer from "@/components/footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans min-h-screen bg-gray-50">
      <Navigation />
      {/* <ScrollProgress className="top-[65px]" /> */}
      <ScrollProgress />
      {children}
      <Footer />
    </main>
  )
}