
// import thirdwebIcon from "@public/lilgnar.png";
import { client } from "../client";

import Image from "next/image";
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function About() {
    return (<>
        <Header client={client} />
        <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <div className="text-lg font-semibold mb-2">
                Lil Gnars Tour 2nd Edition
                Lil Gnars will organize a series of 2 events along the beautiful shores of Rio de Janeiro, where professional skateboarders will engage with local youth. Through fun challenges and missions, we will in still knowledge about skateboarding as well as the importance of healthy living, street safety, and responsible behavior.
                Will Be in Maricá and Saquarema, a City with a new urbanism they maded a new Big Plaza Perfect for be explored n Shreded. Saquarema got a new big skatepark for be Shreded.

            </div>
        </main>

        <Footer />
    </>);
}

