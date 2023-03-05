/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@mantine/core";
import { useMetamask } from "@/hooks/useMetamask";
import { Loading } from "../Loading";

type Props = {};

export default function Header({}: Props) {
    const {
        dispatch,
        state: { status, isMetamaskInstalled, wallet },
    } = useMetamask();

    const showInstallMetamask =
        status !== "pageNotLoaded" && !isMetamaskInstalled;
    const showConnectButton = status !== "pageNotLoaded" && isMetamaskInstalled;

    const handleConnect = async () => {
        dispatch({ type: "loading" });

        window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then(async(accounts) => {
                if (accounts.length > 0) {
                    const balance = await window.ethereum!.request({
                      method: "eth_getBalance",
                      params: [accounts[0], "latest"],
                    });
                    dispatch({ type: "connect", wallet: accounts[0] });
                }
            })
            .catch((err) => {
                dispatch({ type: "pageLoaded", isMetamaskInstalled });
            });
    };

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
                        {wallet ? (
                            <Menu>
                                <Menu.Target>
                                    <div className="h-10 w-10 rounded-full bg-primary-500"></div>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>
                                        <div className="flex items-center">
                                            <div className="text-xs text-gray-500">
                                                {wallet.slice(0, 6)}...
                                                {wallet.slice(
                                                    wallet.length - 4,
                                                    wallet.length
                                                )}
                                            </div>
                                        </div>
                                    </Menu.Label>
                                    <Menu.Divider />
                                    <Menu.Item
                                        onClick={() =>
                                            dispatch({ type: "disconnect" })
                                        }
                                    >
                                        <span className="text-red-500">
                                            Disconnect
                                        </span>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <>
                                {showConnectButton && (
                                    <button
                                        onClick={handleConnect}
                                        className="rounded bg-primary p-2 text-white hover:shadow transition-all duration-500 w-fit"
                                    >
                                        {status === "loading" ? (
                                            <Loading />
                                        ) : (
                                            "Connect Wallet"
                                        )}
                                    </button>
                                )}

                                {showInstallMetamask && (
                                    <Link
                                        href="https://metamask.io/"
                                        target="_blank"
                                    >
                                        <button className="rounded bg-primary p-2 text-white hover:shadow">
                                            Connect Wallet
                                        </button>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
