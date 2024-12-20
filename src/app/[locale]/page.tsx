import React from 'react';

import { Heading, Flex, Text, Button, Avatar, SmartImage, SparkleFx, GlitchFx, RevealFx } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes, renderContent } from '@/app/resources';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { PostContent } from '@/components/blog/PostContent';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{ params: { locale } }: { params: { locale: string } }
) {
	const t = await getTranslations();
	const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Home(
	{ params: { locale } }: { params: { locale: string } }
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);
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
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
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

			<RevealFx translateY="8" delay={0.2}>
				<Flex
					fillWidth
					direction="row"
					paddingY="l" gap="m">
					<GlitchFx
						speed="medium"
						interval={2500}
						trigger="instant">
						<Heading
							wrap="balance"
							variant="display-strong-l">
							{home.headline}
						</Heading>
						<Text
							wrap="balance"
							onBackground="neutral-weak"
							variant="body-default-l">
							{home.subline}
						</Text>
					</GlitchFx>

					<SmartImage
						style={{ background: 'transparent' }}
						objectFit="contain"
						height={12}
						sizes='100'
						alt={"Lil Gnars Logo"}
						src={'/logo-lilgnars.png'} />
				</Flex>
			</RevealFx>

			{/* <Button
				data-border="rounded"
				href={`/${locale}/about`}
				variant="tertiary"
				suffixIcon="chevronRight"
				size="l">
				<Flex
					gap="8"
					alignItems="left">
					{about.avatar.display && (
						<Avatar
							style={{ marginLeft: '-0.75rem', marginRight: '0.25rem' }}
							src={person.avatar}
							size="l" />
					)}
					{t("about.title")}
				</Flex>
			</Button> */}


			<Flex fillWidth paddingX="20">
				<PostContent slug={'about-lil-gnars'} locale={locale} />
			</Flex>

			{/* <RevealFx translateY="16" delay={0.6}>
			<Projects range={[1, 1]} locale={locale} />
			</RevealFx> */}

			<Projects range={[1]} locale={locale} />

			{
				routes['/blog'] && (
					<Flex fillWidth paddingX="20">
						<Posts range={[1, 2]} columns="2" locale={locale} />
					</Flex>
				)
			}

			{
				newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex >
	);
}
