import Hero from "@/components/main/Hero";
import Marquee from "@/components/main/Marquee";
import NowBuilding from "@/components/main/NowBuilding";
import Projects from "@/components/main/Projects";

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <Hero />
            <Marquee />
            <Projects />
            <NowBuilding />
        </div>
    );
}
