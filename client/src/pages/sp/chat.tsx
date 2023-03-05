import Message from "@/components/chat/Message";
import Header from "@/components/shell/Header";
import useChat from "@/hooks/useChat";
import { MessageI } from "@/types/Chat.types";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent } from "react";
import { BsChevronRight, BsArrowDown } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import PendingMessage from "./../../components/chat/PendingMessage";

type Props = {};

function Chat({}: Props) {
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState<MessageI[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        // Keep document scrolled to bottom
        const chat = document.getElementById("chat");
        if (chat) window.scrollTo(0, chat.scrollHeight);
    }, [messages]);

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input === "") return;

        const newMessage = {
            id: messages.length + 1,
            content: input,
            role: "user",
        };

        setMessages([...messages, newMessage] as MessageI[]);

        try {
            setLoading(true);
            const { data } = await axios.post("/api/chat?sp=true", {
                messages: [
                    ...messages.map(({ content, role }) => ({ content, role })),
                    { content: input, role: "user" },
                ],
            });

            setMessages([...messages, newMessage, data] as MessageI[]);
        } catch {}
        setLoading(false);
        setInput("");
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-primary-50" id="chat">
            <Header />
            <div className="relative mx-auto flex w-full max-w-4xl grow flex-col z-[2]">
                <div className="relative flex grow flex-col justify-end p-4">
                    <div
                        className={`absolute top-0 left-[50%] flex h-full w-full translate-x-[-50%] flex-col items-center justify-center text-center transition-all ${
                            messages.length === 0 ? "flex" : "opacity-0"
                        }`}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Smarthealth logo"
                            width={200}
                            height={50}
                        />
                        <h1 className="text-3xl text-text">
                            {/* Your Personal Health Assistant */}
                            Su Asistente de Salud Personal
                        </h1>
                        <h2 className="mt-20 text-2xl text-text-200">
                            {/* Start a Conversation Below */}
                            Inicie una conversación a continuación
                        </h2>
                        <Link href="/sp/chat">
                            <div className="mt-4 rounded bg-primary-100 p-2 text-xl text-text-200 hover:shadow">
                                Speak English?
                            </div>
                        </Link>
                        <BsArrowDown className="mt-10 animate-bounce text-4xl text-text-200" />
                    </div>
                    {messages.map(({ role, content, url }, i) => (
                        <Message
                            key={"message-" + i}
                            role={role}
                            url={url}
                            content={content}
                        />
                    ))}
                    {loading && <PendingMessage />}
                </div>

                <form
                    onSubmit={handleSendMessage}
                    className="sticky bottom-0 flex items-stretch bg-primary-50 p-4 text-xl text-text z-[10]"
                >
                    <div className=" flex items-center rounded-l bg-white px-2">
                        <BsChevronRight />
                    </div>
                    <input
                        className="z-[10] h-14 grow bg-white py-2 px-2"
                        placeholder="Escribe tu mensaje aquí..." //Type your message here
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="flex cursor-pointer items-center rounded-r bg-white px-4 hover:bg-gray-200"
                        type="submit"
                    >
                        <FiSend />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default withPageAuthRequired(Chat);
