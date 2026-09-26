import AnimatedText from "@/components/sub/AnimatedText";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";

/**
 * Homepage "about" beat: a single editorial bio (scroll-linked word reveal) and
 * CTAs that point to the full /about page. The detailed focus areas live on
 * /about — kept off the homepage to avoid repeating the hero + /about.
 */
const About = () => {
    return (
        <section
            id="about"
            className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24"
        >
            {/* Large editorial bio with scroll-linked word-by-word reveal */}
            <AnimatedText
                text="I'm Ansh, a Gen AI developer at TCS. I build agentic systems and RAG pipelines, then ship them as full products: model to API to interface to deployment. I care about AI that holds up in production, not just in a demo."
                className="max-w-4xl font-display font-medium text-3xl text-paper leading-[1.3] tracking-tight sm:text-4xl lg:text-5xl"
            />

            <Reveal delay={0.15} y={20}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                    <PillButton href="/about">More about me</PillButton>
                    <PillButton href="/contact" variant="ghost">
                        Get in touch
                    </PillButton>
                </div>
            </Reveal>
        </section>
    );
};

export default About;
