'use client'
import { Flex, Heading, Text, SmartImage, GlitchFx } from "@/once-ui/components";

import Masonry from 'react-masonry-css';
import MasonryGrid from "@/components/nftspage/MasonryGrid";

import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import styles from '@/components/about/about.module.scss'

import { NFT } from "thirdweb";
import { nftContract } from "../../../consts/parameters";
import useDebounce from "../../../hooks/useDebounce";
import { getNFT, getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { useEffect, useState } from "react";


// export async function generateMetadata(
// 	{params: {locale}}: { params: { locale: string }}
// ) {

// 	const t = await getTranslations();
// 	const { gallery } = renderContent(t);

// 	const title = gallery.title;
// 	const description = gallery.description;
// 	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

// 	return {
// 		title,
// 		description,
// 		openGraph: {
// 			title,
// 			description,
// 			type: 'website',
// 			url: `https://${baseURL}/${locale}/gallery`,
// 			images: [
// 				{
// 					url: ogImage,
// 					alt: title,
// 				},
// 			],
// 		},
// 		twitter: {
// 			card: 'summary_large_image',
// 			title,
// 			description,
// 			images: [ogImage],
// 		},
// 	};
// }

export default function Nfts(
	{ params: { locale } }: { params: { locale: string } }
) {
	// unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { nftspage, person } = renderContent(t);

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



	const breakpointColumnsObj = {
		default: 4,
		1440: 3,
		1024: 2,
		560: 1
	};

	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ImageGallery',
						name: nftspage.title,
						description: nftspage.description,
						url: `https://${baseURL}/gallery`,
						image: nftspage.images.map((image: { src: any; alt: any; }) => ({
							'@type': 'ImageObject',
							url: `${baseURL}${image.src}`,
							description: image.alt,
						})),
						author: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>

			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
				<Flex
					direction="column"
					fillWidth maxWidth="s" gap="m">
					<GlitchFx>
						<Heading
							className={styles.textAlign}
							variant="display-strong-xl">
							{person.name}
						</Heading>
						<Text
							className={styles.textAlign}
							variant="display-default-xs"
							onBackground="neutral-weak">
							{person.role}
						</Text>
					</GlitchFx>
					{/* <Text
						className={styles.textAlign}
						variant="display-default-s"
						onBackground="neutral-weak">
						{nftspage.title}
					</Text>
					<Text
						className={styles.textAlign}
						variant="display-default-s"
						onBackground="neutral-weak">
						{nftspage.description}
					</Text> */}

				</Flex>

				{isLoading && (
					<Flex fillWidth paddingX="20">
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className={styles.masonryGrid}
							columnClassName={styles.masonryGridColumn}>
							{Array.from({ length: nftsPerPage }).map((_, i) => (
								<SmartImage
									src=""
									alt=""
									aspectRatio="16/9"
									radius="l"
									isLoading
								/>
							))}
						</Masonry>
					</Flex>
				)}

				{nfts && !search && (
					<Flex fillWidth paddingX="20">
						<MasonryGrid nfts={nfts} />
					</Flex>
				)}
				{/* 

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
        )} */}

			</Flex>
		</Flex>
	);
}