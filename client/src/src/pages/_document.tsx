import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body style={{ scrollBehavior: "smooth" }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
