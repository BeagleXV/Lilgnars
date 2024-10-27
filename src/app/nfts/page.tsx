"use client";

import { useEffect, useState } from "react";

// import Image from "next/image";
// import thirdwebIcon from "@public/lilgnar.png";
import { client } from "../client";

import Header from '../components/Header';
import Footer from '../components/Footer';

import { NFT } from "thirdweb";
import { NFTCard } from "../components/NFTCard";
import { nftContract } from "../consts/parameters";
import useDebounce from "../hooks/useDebounce";
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

    </main>

    <Footer />
    
  </>);
}
