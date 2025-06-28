import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen dark:bg-[#101010] transition-all transition-discrete">
                {children}
            </div>
        </div>
    );
}
