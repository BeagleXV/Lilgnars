"use client";

import { useEffect, useState } from "react";

// import Image from "next/image";
// import thirdwebIcon from "@public/lilgnar.png";
import { client } from "./client";

import Header from './components/Header';
import Footer from './components/Footer';

import { NFT } from "thirdweb";
import { NFTCard } from "./components/NFTCard";
import { nftContract } from "./consts/parameters";
import useDebounce from "./hooks/useDebounce";
import { getNFT, getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";

export default function Home() {
  const nftsPerPage = 30;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 500);

  const { data: nfts, isLoading } = useReadContract(getNFTs, {
    contract: nftContract,
    count: nftsPerPage,
    start: (page - 1) * nftsPerPage,
  });

  const { data: totalCount } = useReadContract(totalSupply, {
    contract: nftContract,
  });

  const { data: contractMetadata, isLoading: contractLoading } =
    useReadContract(getContractMetadata, {
      contract: nftContract,
    });
    
  const [nft, setNft] = useState<NFT | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchNFT = async () => {
    const nft = await getNFT({
      contract: nftContract,
      tokenId: BigInt(debouncedSearchTerm),
    });
    setNft(nft!);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchNFT();
    } else {
      setNft(null);
    }
  }, [debouncedSearchTerm]);


  return (<>
    <Header client={client} />

    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">

      <div className="text-lg font-semibold mb-2">

        <div className="flex flex-direction: column justify-content: center">
          <h1>Welcome to LilGnars!</h1>
          <p>A super cool project for kids like you!</p>
        </div>

        <ArticleCard
          title="What is LilGnars?"
          href=""
          description="LilGnars is a digital playground where kids can share their passions, skills, and creations with the world, while also earning rewards!"
        />

        <article className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <h2>How does it work?</h2>
          <ul>
            <li>Upload your creations for free!</li>
            <li>Earn crypto rewards from your fans and collectors!</li>
            <li>Join our community on Discord, Twitter, and Instagram to hang out, share your work, and get inspired!</li>
          </ul>
        </article>

        <article className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
          <h2>What can I do on LilGnars?</h2>
          <ul>
            <li>Upload my skateboarding videos, artwork, stories, and more!</li>
            <li>Earn crypto rewards from collectors who like my stuff!</li>
            <li>Join our community and meet other kids who like skateboarding and creating!</li>
            <li>Vote on how to spend our shared treasure (with parent/guardian permission)!</li>
            <li>Submit proposals for projects and ideas that help our community!</li>
          </ul>
        </article>


        {/* <ThirdwebResources /> */}

        {isSearching ? (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {search && nft && !isSearching ? (
          <NFTCard nft={nft} key={nft.id.toString()} />
        ) : null}

        {isLoading && (
          <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: nftsPerPage }).map((_, i) => (
              <div
                className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800"
                key={i}
              />
            ))}
          </div>
        )}

        {nfts && !search && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {nfts.map((nft) => (
              <NFTCard nft={nft} key={nft.id.toString()} />
            ))}
          </div>
        )}



        <Footer />
      </div>
    </main>
  </>);
}

// function Header() {
//   return (
// <header className="flex flex-col items-center mb-20 md:mb-20">
//   <div className="flex justify-start ml-10">
//     <div className="w-fit mr-5">
//       <Image
//         src={thirdwebIcon}
//         alt=""
//         className="size-[150px] md:size-[150px]"
//         style={{
//           filter: "drop-shadow(0px 0px 24px #a726a9a8)",
//         }}
//       />
//     </div>
//   </div>
//   <div className="flex justify-end mb-10">
//     <ConnectButton
//       client={client}
//       appMetadata={{
//         name: "LilGnars App",
//         url: "https://lilgnars.com",
//       }}
//     />
//   </div>
// </header>
//   );
// }

// function Header() {
//   return (
//     <header className="flex flex-col items-center mb-20 md:mb-20">
//       <h1>Welcome to LilGnars!</h1>
//       <p>A super cool project for kids like you!</p>

//       <Image
//         src={thirdwebIcon}
//         alt=""
//         className="size-[150px] md:size-[150px]"
//         style={{
//           filter: "drop-shadow(0px 0px 24px #a726a9a8)",
//         }}
//       />

//       <div className="flex justify-right mb-20">
//         <ConnectButton
//           client={client}
//           appMetadata={{
//             name: "LilGnars App",
//             url: "https://lilgnars.com",
//           }}
//         />
//       </div>

//       {/* <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
//         thirdweb SDK
//         <span className="text-zinc-300 inline-block mx-1"> + </span>
//         <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
//       </h1>

//       <p className="text-zinc-300 text-base">
//         Read the{" "}
//         <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
//           README.md
//         </code>{" "}
//         file to get started.
//       </p> */}
//     </header>
//   );
// }

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <article className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700">
      <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
      <p className="text-sm text-zinc-400">{props.description}</p>
    </article>
  );
}
