import React, { useEffect } from "react";
import { useMetamask } from "@/hooks/useMetamask";
import { useRouter } from "next/router";
import { Loading } from "../Loading";

type Props = {};


const withPageAuthRequired = (Component: any, options = {}) => {
    return function WithPageAuthRequired(props: any): JSX.Element {
        const {
            state: { wallet, status },
        } = useMetamask();

        useEffect(() => {
            if (wallet || status == "loading") return;

            window.location.assign("/");
        }, [status, wallet]);

        if (wallet) return <Component wallet={wallet} {...(props as any)} />;

        return <Loading />;
    };
};

export default withPageAuthRequired;
