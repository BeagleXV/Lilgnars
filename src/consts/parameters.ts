import { getContract } from "thirdweb";
import { ethereum, base } from "thirdweb/chains";
import { client } from "../app/client3w";

/** Change these values to configure the application for your own use. **/

// export const client = createThirdwebClient({
//   clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
// });

export const nftContract = getContract({
  // Your smart contract address (available on the thirdweb dashboard)
  // address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
  
  // skatehive
  // address: "0xfe10d3ce1b0f090935670368ec6de00d8d965523",
  address: "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
  chain: base,


  // The chain object of the chain your contract is deployed to.
  // If that chain isn't in the default list of our SDK, use `defineChain` - for example: defineChain(666666)
  // chain: ethereum,
  
  client,
});

// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
