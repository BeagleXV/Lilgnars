import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-rosa">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col lg:flex-row">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto">
          
        </p>
        <head>
        <link rel="icon" href="/gnar.png" sizes="any" />
        </head>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:pink lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 fonte-maior"
            href="https://nouns.build/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/gnar.png"
              alt="Gnar Logo"
              width={30}
              height={34}
              priority
            />
          </a>
        </div>
      </div>

      <div className="mx-auto mb-4 flex flex-col items-center justify-center lg:gap-0">
        <Image
          src="/lilgnar2.png"
          alt="lilgnars Logo"
          width={750}
          height={450}
          priority
        />
        <div className="text-center lg:text-left lg:mt-1">
          <h2>Lilgnars</h2>
        </div>
      </div>
    </main>
  );
}
