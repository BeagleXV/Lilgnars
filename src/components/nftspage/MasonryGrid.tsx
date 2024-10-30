"use client";

import Masonry from 'react-masonry-css';
import { NFTCard } from "../nftspage/NFTCard";
import styles from "../gallery/Gallery.module.scss";
import { useTranslations } from 'next-intl';
import { NFT } from 'thirdweb';
// import { renderContent } from '@/app/resources';

export interface GalleryProps {
    nfts: any; // or { nfts: { nft: any[] } } if you're sure it's an array
}

export default function MasonryGrid({ nfts }: GalleryProps) {
    const breakpointColumnsObj = {
        default: 4,
        1440: 3,
        1024: 2,
        560: 1
    };

    const t = useTranslations();
    // const { gallery } = renderContent(t);

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}>
            {nfts.map((nft: NFT) => (
                <NFTCard nft={nft} key={nft.id.toString()} />
            ))}
        </Masonry>
    );
}