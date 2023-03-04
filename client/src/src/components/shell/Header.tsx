/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Header as MHeader } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Menu } from "@mantine/core";
import { IconBase } from "react-icons";

type Props = {};

export default function Header({}: Props) {
    const { user } = useUser();

    return (
        <header className="sticky top-0 z-[20] h-[70px] border-b border-b-gray-200">
            <div className="h-full bg-primary-50">
                <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Smarthealth logo"
                            width={200}
                            height={50}
                        />
                    </Link>
                    <div>
                        {user ? (
                            <Menu>
                                <Menu.Target>
                                    <img
                                        className="rounded-full bg-primary"
                                        alt="pfp"
                                        src={user.picture || ""}
                                        width={50}
                                        height={50}
                                    />
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Your Profile</Menu.Label>
                                    <Menu.Item color="red">
                                        <a href="/api/auth/logout">Log out</a>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Link href="/api/auth/login" className="text-text text-xl">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
