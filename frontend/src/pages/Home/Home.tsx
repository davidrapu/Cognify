import Nav from "../../components/Nav";
import Hero from "./Hero";
import Aims from "./Aims";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col gap-y-5 w-full">
      <header>
        <Nav />
      </header>
      <main className="flex flex-col gap-y-36 items-center mt-24">
        <Hero />
        <Aims />
      </main>
    </div>
  );
}
