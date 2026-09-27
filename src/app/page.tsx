import CTABand from "@/components/main/CTABand";
import FocusAreas from "@/components/main/FocusAreas";
import Hero from "@/components/main/Hero";
import Marquee from "@/components/main/Marquee";
import NowBuilding from "@/components/main/NowBuilding";
import Process from "@/components/main/Process";
import Projects from "@/components/main/Projects";
import Writing from "@/components/main/Writing";

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <Hero />
            <Marquee />
            <FocusAreas />
            <Projects />
            <NowBuilding />
            <Process />
            <Writing />
            <CTABand />
        </div>
    );
}
