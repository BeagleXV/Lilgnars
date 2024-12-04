'use client'
import { Flex, Heading, Text, Spinner, GlitchFx } from "@/once-ui/components";
import MasonryGrid from "@/components/nftspage/MasonryGrid";

import { baseURL, renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";

import styles from '@/components/about/about.module.scss'

import { NFT } from "thirdweb";
import { nftContract } from "../../../consts/parameters";
import useDebounce from "../../../hooks/useDebounce";
import { getNFT, getNFTs, totalSupply } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { useEffect, useState } from "react";

export default function Nfts(
	{ params: { locale } }: { params: { locale: string } }
) {
	const t = useTranslations();
	const { nftspage, person } = renderContent(t);

	const nftsPerPage = 33;
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
						url: `https://${baseURL}/nfts`,
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
							{nftspage.title}
						</Heading>
						<Text
							className={styles.textAlign}
							variant="display-default-xs"
							onBackground="neutral-weak">
							{nftspage.description}
						</Text>
					</GlitchFx>

				</Flex>

				{isLoading && (
					<Spinner size="xl" />
				)}

				{nfts && !search && (
					<Flex fillWidth paddingX="20">
						<MasonryGrid nfts={nfts} />
					</Flex>
				)}
				
			</Flex>
		</Flex>
	);
}