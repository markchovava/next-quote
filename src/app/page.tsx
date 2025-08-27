import Link from "next/link";
import ButtonPrimary from "./_components/buttons/ButtonPrimary";

export default function Home() {
  return (
   <>
   <section className="flex items-center justify-center h-[100vh]">
    <Link href='/admin/quote/add' className="text-[2rem]">
    Start Quoting
    </Link>
   </section>
   </>
  );
}
