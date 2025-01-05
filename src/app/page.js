import { ModeToggle } from "@/components/ui/toggle";

import { FormComponent } from "@/components/form";

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mt-20">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-10 row-start-2 items-center w-1/2">
        <FormComponent />
      </main>
    </div>
  );
}
