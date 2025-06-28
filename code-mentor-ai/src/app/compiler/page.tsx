import Navbar from "@/components/Navbar";
import Compiler from "./Compiler";
import { Divide } from "lucide-react";
import ParentLayout from "@/components/ParentLayout";

export default function Home() {
  return (
    <ParentLayout>
      <Compiler />
    </ParentLayout>
  );
}
