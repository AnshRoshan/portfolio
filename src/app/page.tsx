import CTABand from "@/components/main/CTABand";
import Hero from "@/components/main/Hero";
import Marquee from "@/components/main/Marquee";
import Projects from "@/components/main/Projects";

/**
 * Deliberately short landing: who I am → the stack → selected work → say hi.
 * Depth lives on /about and /projects, not here.
 */
export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <Hero />
            <Marquee />
            <Projects />
            <CTABand />
        </div>
    );
}
