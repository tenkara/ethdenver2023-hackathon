import React from "react";

type Props = {};

export default function PendingMessage({}: Props) {
    const [dots, setDots] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots) => (dots + 1) % 3);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-start mt-4 flex items-center">
            <div
                className={`max-w-[80%] break-words rounded-lg bg-primary-400 p-4 text-xl text-white`}
            >
                <div className="rounded-lg bg-primary-400 w-4">
                    .
                    {Array(dots)
                        .fill(0)
                        .map((_, i) => (
                            <span key={i} className="">
                                .
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}
