"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Logo, NavIcon, SmartImage, Flex, ToggleButton, SparkleFx } from "@/once-ui/components"
import styles from '@/components/Header.module.scss'

import { routes, display } from '@/app/resources'

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";

import { base } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { Theme, darkTheme } from "thirdweb/react";
import { client } from "../app/client3w";


const web3rdCustomTheme: Theme = darkTheme({
    colors: {
        primaryButtonBg: 'var(--accent-solid-strong)',
        primaryButtonText:  'var(--neutral-on-background-strong)',
    },
});

type TimeDisplayProps = {
    timeZone: string;
    locale?: string;  // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = 'en-GB' }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const timeString = new Intl.DateTimeFormat(locale, options).format(now);
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [timeZone, locale]);

    return (
        <>
            {currentTime}
        </>
    );
};

export default TimeDisplay;

export const Header = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname() ?? '';
    const params = useParams();

    function handleLanguageChange(locale: string) {
        const nextLocale = locale as Locale;
        startTransition(() => {
            router.replace(
                pathname,
                { locale: nextLocale }
            )
        })
    }

    const t = useTranslations();
    const { person, home, about, blog, work, gallery, nftspage } = renderContent(t);

    return (
        <Flex style={{ height: 'fit-content' }}
            className={styles.position}
            as="header"
            zIndex={9}
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                hide="s"
                fillWidth
                paddingLeft="12"
                alignItems="center"
                style={{ background: 'transparent' }}
                textVariant="body-default-s">
                <Logo
                    size="xl"
                    wordmark={false}
                    iconSrc="/logo-lilgnars.png"
                    href="/"
                />
            </Flex>
            <Flex
                hide="s"
                paddingLeft="12" fillWidth
                alignItems="center"
                textVariant="body-default-s">
                {display.location && (
                    <>{person.location}</>
                )}
                <SparkleFx
                    speed="slow"
                    count={50}
                    trigger
                >
                    <ConnectButton
                        client={client}
                        chain={base}
                        appMetadata={{
                            name: "LilGnars App",
                            url: "https://lilgnars.com",
                        }}
                        theme={web3rdCustomTheme}
                    /></SparkleFx>
            </Flex>
            <Flex
                background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                padding="4"
                justifyContent="center">
                <Flex
                    gap="4"
                    textVariant="body-default-s">
                    {routes['/'] && (
                        <ToggleButton
                            prefixIcon="home"
                            href={`/${params?.locale}`}
                            selected={pathname === "/"}>
                            <Flex paddingX="2" hide="s">{home.label}</Flex>
                        </ToggleButton>
                    )}
                    {routes['/about'] && (
                        <ToggleButton
                            prefixIcon="person"
                            href={`/${params?.locale}/about`}
                            selected={pathname === "/about"}>
                            <Flex paddingX="2" hide="s">{about.label}</Flex>
                        </ToggleButton>
                    )}
                    {routes['/work'] && (
                        <ToggleButton
                            prefixIcon="grid"
                            href={`/${params?.locale}/work`}
                            selected={pathname.startsWith('/work')}>
                            <Flex paddingX="2" hide="s">{work.label}</Flex>
                        </ToggleButton>
                    )}
                    {routes['/blog'] && (
                        <ToggleButton
                            prefixIcon="book"
                            href={`/${params?.locale}/blog`}
                            selected={pathname.startsWith('/blog')}>
                            <Flex paddingX="2" hide="s">{blog.label}</Flex>
                        </ToggleButton>
                    )}
                    {routes['/gallery'] && (
                        <ToggleButton
                            prefixIcon="gallery"
                            href={`/${params?.locale}/gallery`}
                            selected={pathname.startsWith('/gallery')}>
                            <Flex paddingX="2" hide="s">{gallery.label}</Flex>
                        </ToggleButton>
                    )}
                    {routes['/nfts'] && (
                        <ToggleButton
                            prefixIcon="nft"
                            href={`/${params?.locale}/nfts`}
                            selected={pathname.startsWith('/nfts')}>
                            <Flex paddingX="2" hide="s">{nftspage.label}</Flex>
                        </ToggleButton>
                    )}
                </Flex>
            </Flex>
            <Flex
                paddingRight="12"
                justifyContent="flex-end" alignItems="center"
                textVariant="body-default-s"
                gap="20">
                {routing.locales.length > 1 && <Flex
                    hide="s"
                    background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                    padding="4" gap="2"
                    justifyContent="center">
                    {i18n && routing.locales.map((locale, index) => (
                        <ToggleButton
                            key={index}
                            selected={params?.locale === locale}
                            onClick={() => handleLanguageChange(locale)}
                            className={isPending && 'pointer-events-none opacity-60' || ''}
                        >
                            {locale.toUpperCase()}
                        </ToggleButton>
                    ))}
                </Flex>
                }
                <Flex hide="s">
                    {display.time && (
                        <TimeDisplay timeZone={person.location} />
                    )}
                </Flex>
            </Flex>
        </Flex >
    )
}