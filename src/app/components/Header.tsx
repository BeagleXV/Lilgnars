import { ConnectButton } from "thirdweb/react";
import Image from 'next/image';
import thirdwebIcon from "@public/lilgnar.png";
import Link from "next/link";


interface HeaderProps {
  client: any;
}

const Header: React.FC<HeaderProps> = ({ client }) => {
  return (
    <header className="flex justify-between items-center mb-20 md:mb-20">
      
      <div className="flex items-center">
        <div className="mr-5">
          <Image
            src={thirdwebIcon}
            alt=""
            className="size-[150px] md:size-[150px]"
            style={{
              filter: "drop-shadow(0px 0px 24px #a726a9a8)",
            }}
          />
        </div>
      </div>

      <nav className="flex justify-between w-full md:w-3/4">
        <ul className="flex justify-end space-x-4">
          <li className="btn"><Link href={"/"}>Home</Link></li>
          <li className="btn"><Link href={"/about"}>About</Link></li>
          <li className="btn"><Link href={"/nfts"}>NFTs</Link></li>
          <li className="btn"><Link href={"#"}>Contact</Link></li>
        </ul>
      </nav>

      <div>
        <ConnectButton
          client={client}
          appMetadata={{
            name: "LilGnars App",
            url: "https://lilgnars.com",
          }}
        />
      </div>

    </header>
  );
};

export default Header;