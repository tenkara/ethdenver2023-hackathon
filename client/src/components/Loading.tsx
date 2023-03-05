import React from "react";

const dot = `rounded-full h-2 w-2 mx-0.5 bg-current animate-[blink_1s_ease_0s_infinite_normal_both]`;
let style = { animationDelay: "0.2s" };

export const Loading: React.FC = () => {
    return (
        <span className="flex h-6 w-20 items-center justify-center text-center leading-7 ">
            <div className="h-4 w-4 animate-bounce rounded-full bg-white duration-500"></div>
        </span>
    );
};
