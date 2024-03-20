// import { Button } from "@/components/ui/button";
import { FetchVideoForm } from "@/components/fetchVideoForm";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button>Click</Button> */}
      <FetchVideoForm />
    </main>
  );
}
