import axios from "axios";
import React from "react";
import { useMetamask } from "@/hooks/useMetamask";

type Props = {
    close: () => void;
};

export default function Authorize({ close }: Props) {
    const {
        state: { wallet, data },
        dispatch,
    } = useMetamask();

    // Make a request to the authorize
    const handleAuthorize = async (token: string | null) => {
        try {
            const {
                data: { data },
            } = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/authorize",
                {
                    token,
                }
            );

            dispatch({ type: "update", payload: data });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-stretch gap-y-4">
                <div>
                    <h2>Your EHR Authorized Data Only</h2>
                    {data ? (
                        <div className="text-sm text-text-300">
                            {/* Print the data out in a nicely formatted element */}
                            {Object.entries(data).map(([key, value], i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between rounded p-1 px-2 ${
                                        i % 2 == 0 ? "bg-gray-100" : ""
                                    }`}
                                >
                                    <span>
                                        {key[0].toUpperCase() + key.slice(1)}
                                    </span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded bg-gray-100 p-2 text-sm text-text-300">
                            No data has been authorized yet.
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full rounded bg-primary p-2 text-xl text-white hover:shadow-xl"
                        onClick={() => handleAuthorize(wallet)}
                    >
                        Authorize EHR
                    </button>
                    <p className="mt-2 text-sm text-text-300">
                        Authorize SmartHealth to access your electronic health
                        record to enable personalized chat through secure
                        authorirization of your choice of health data.
                    </p>
                </div>
                <div>
                    <button
                        className="w-full rounded bg-primary p-2 text-xl text-white hover:shadow-xl"
                        onClick={() =>
                            handleAuthorize(
                                "0xB65f7F56bD645274d6BCd35Ed25f3615a769557f"
                            )
                        }
                    >
                        Try with an Existing EHR
                    </button>
                    <p className="mt-2 text-sm text-text-300">
                        Try our app with an existing electronic health record
                        from one of our premade contracts to get an idea of how
                        it works!
                    </p>
                </div>
                <div>
                    <button
                        disabled
                        className="relative w-full rounded bg-primary p-2 text-xl text-white hover:shadow-xl"
                    >
                        Create EHR
                    </button>
                    <p className="mt-2 text-sm text-text-300">
                        Coming soon! Create your own electronic health record.
                    </p>
                </div>

                <button
                    className="tect-white rounded bg-green-400 p-2 text-xl text-white hover:shadow-xl"
                    onClick={close}
                >
                    Begin Chat
                </button>
            </div>
        </div>
    );
}
