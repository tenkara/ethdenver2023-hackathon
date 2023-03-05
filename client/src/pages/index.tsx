import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@mantine/core";
import Header from "@/components/shell/Header";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Smarthealth</title>
                <meta
                    name="description"
                    content="Smarthealth AI personal health assistant"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen bg-primary-50 px-4">
                <Header />
                <section className="mx-auto mt-20 max-w-5xl">
                    <div className="flex flex-row">
                        <div className="basis flex flex-col md:basis-7/12">
                            <h1 className="text-7xl font-medium text-text">
                                Your personal{" "}
                                <span className="text-primary">health</span>{" "}
                                assistant.
                            </h1>
                            <h2 className="mt-4 text-3xl text-text-300">
                                SmartHealth is capable of helping users quickly
                                and easily access personalized health advice and
                                guidance. By offering range of services such as
                                symptom checker and personalized health tips to
                                help users stay on top of their health and
                                well-being.
                            </h2>

                            <Link href="/chat" passHref className="mt-8">
                                <div className="w-fit rounded bg-primary p-4 text-2xl text-white transition-all hover:shadow-xl">
                                    Chat With SmartHealth
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto mt-20 max-w-5xl">
                    <h1 className="text-5xl font-medium text-text">
                        Who are <span className="text-secondary">We</span>?
                    </h1>
                    <p className="mt-4 text-2xl text-text-300">
                        SmartHealth is composed of passionate and talented team
                        of Computer Science, Medical, Arts and Business
                        individuals. Josh, Lizzie, Jason and Raj continue to
                        apply the latest technology to improve Healthcare.
                    </p>

                    <div className="mt-8 flex flex-row items-center justify-center gap-20 px-10">
                      <Image
                          src="/people/josh.png"
                          alt="Josh Nakka"
                          width={150}
                          height={150}
                      />
                        <Image
                            src="/people/lizzie.jpg"
                            alt="Lizzie Nakka"
                            width={150}
                            height={150}
                            className="rounded-full p-1"
                        />
                        <Image
                            src="/people/jason.png"
                            alt="Jason Nakka"
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                        <Image
                            src="/people/raj.png"
                            alt="Raj Nakka"
                            width={150}
                            height={150}
                        />
                    </div>
                </section>

                <section className="mx-auto mt-20 max-w-5xl">
                    <h1 className="text-5xl font-medium text-text">
                        <span className="text-primary">How</span> Do We Do It?
                    </h1>
                    <p className="mt-4 text-2xl text-text-300">
                        We leverage the power of GPT3, Reddis Vectorized DB, and
                        React to provide you with an interactive health
                        assistant. We put together a database of health
                        conditions and their symptoms, causes, and treatments.
                        By pairing our database with GPT3 we are able to help
                        you understand your health without having to visit a
                        doctor in person.
                    </p>
                </section>

                <section className="mx-auto mt-20 max-w-5xl">
                    <h1 className="text-5xl font-medium text-text">
                        Our <span className="text-secondary">Technologies</span>
                    </h1>
                    <p className="mt-4 text-2xl text-text-300">
                        We chose to use a future proof tech stack to get our
                        ideas to become a reality, below are a few of the
                        technologies we used.
                    </p>

                    <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-20">
                        <Image
                            src="/logos/openai.png"
                            alt="OpenAi Logo"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/logos/react.png"
                            alt="React Logo"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/logos/nextjs.png"
                            alt="Next Logo"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/logos/flask.png"
                            alt="Flask Logo"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/logos/reddis.png"
                            alt="Reddis Logo"
                            width={80}
                            height={80}
                        />
                        <Image
                            src="/logos/postgres.png"
                            alt="Postgres Logo"
                            width={80}
                            height={80}
                        />
                    </div>
                </section>

                <footer className="h-20"></footer>
            </main>
        </>
    );
}
