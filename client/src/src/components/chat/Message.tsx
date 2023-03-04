import React from "react";

type Props = {
    role: "system" | "user";
    content: string;
};

export default function Message({ role, content }: Props) {
    return (
        <div
            className="mt-4 flex items-center"
            style={{
                justifyContent: role === "system" ? "flex-start" : "flex-end",
            }}
        >
            <div
                className={`${
                    role === "system" ? "bg-primary-400" : "bg-secondary-400"
                } rounded-lg p-4 text-xl text-white max-w-[80%] break-words`}
            >
                {content}
            </div>
        </div>
    );
}
