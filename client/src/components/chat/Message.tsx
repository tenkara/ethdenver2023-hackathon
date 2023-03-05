import Link from "next/link";
import React from "react";

type Props = {
    role: "system" | "user";
    content: string;
    url?: string;
};

export default function Message({ role, content, url }: Props) {
    return (
        <div
            className="mt-4 flex items-center z-[2]"
            style={{
                justifyContent: role === "system" ? "flex-start" : "flex-end",
            }}
        >
            <div
                className={`${
                    role === "system" ? "bg-primary-400" : "bg-secondary-400"
                } max-w-[80%] break-words rounded-lg p-4 text-xl text-white`}
            >
                {content}
                <br />
                {url && (
                    <a className="cursor-pointer text-sm" href={url}>
                        Here is a link that may help.
                    </a>
                )}
            </div>
        </div>
    );
}
