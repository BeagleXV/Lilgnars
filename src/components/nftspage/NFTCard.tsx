import { client } from "../../app/client3w";
import { FC, useState } from "react";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import Link from 'next/link';
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components'

interface INFTCardProps {
  nft: NFT;
}

export const NFTCard: FC<INFTCardProps> = ({ nft }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Flex direction="column" gap="m" marginBottom="xl">
      <Link href={`https://nouns.build/dao/base/0xfe10d3ce1b0f090935670368ec6de00d8d965523/${nft.id}`} target="_blank">
        <MediaRenderer client={client} src={nft.metadata.image} style={{borderRadius: '10px;'}}/>
        <Heading padding="0" margin="0" align="center">
          {String(nft.metadata.name).split(" ")[0]}
          {String(nft.metadata.name).split(" ")[1]}
        </Heading>
      </Link>
    </Flex>
  );
};
