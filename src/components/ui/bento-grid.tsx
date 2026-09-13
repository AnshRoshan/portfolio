import { cn } from "@/utils/cn";
import Link from "next/link";
import { buttonVariants } from "./button";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    link,
    github,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    link?: string;
    github?: string;
}) => {
    return (
        <div
            className={cn(
                "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-line-2 dark:bg-black dark:shadow-none",
                className
            )}
        >
            {header}
            <div className="transition duration-200 group-hover/bento:translate-x-2">
                {icon}
                <div className="mt-2 mb-2 font-bold font-sans text-neutral-600 dark:text-neutral-200">
                    {title}
                </div>
                <div className="font-normal font-sans text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
                {github && (
                    <Link
                        href={github}
                        target="_blank"
                        className={cn(
                            buttonVariants({ variant: "link" }),
                            "py-0"
                        )}
                    >
                        Code →
                    </Link>
                )}
                {link && (
                    <Link
                        href={link}
                        target="_blank"
                        className={cn(
                            buttonVariants({ variant: "link" }),
                            "py-0"
                        )}
                    >
                        Website →
                    </Link>
                )}
            </div>
        </div>
    );
};
