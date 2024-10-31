// import type { FC } from "react";
import { renderContent } from "@/app/resources";
import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components"
import { useTranslations } from "next-intl";
// import { person, social } from '@/app/resources'
// import { PaginationHelper } from "../components/nftspage/PaginationHelper";

// interface IProps {
//     page?: number;
//     setPage?: (page: number) => void;
//     nftsPerPage?: number;
//     totalCount?: number | undefined;
//     loading?: boolean;
// }

// export const Footer: FC<IProps> = ({
export const Footer = ({
    // page,
    // setPage,
    // nftsPerPage,
    // totalCount,
    // loading,
}) => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations();
    const { person, social } = renderContent(t);

    // if (!totalCount) return null;
    // const noOfPages = Math.ceil((totalCount || 1) / (nftsPerPage || 1));
    // const start = (page || 1) * (nftsPerPage || 0);
    // const end = start + (nftsPerPage || 0);

    return (
        <Flex
            as="footer"
            position="relative"
            fillWidth padding="8"
            justifyContent="center">
            {/* {page && noOfPages && setPage && loading ? (
            <PaginationHelper
                page={page}
                noOfPages={noOfPages}
                setPage={setPage}
                loading={loading}
            />):null} */}
            <Flex
                fillWidth maxWidth="m" paddingY="8" paddingX="16"
                justifyContent="space-between" alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="neutral-strong">
                    <Text
                        onBackground="neutral-weak">
                        © {currentYear} /
                    </Text>
                    <Text paddingX="4">
                        {person.name}
                    </Text>
                    <Text onBackground="neutral-weak">
                        {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
                        / Social Skate Project Powered by:
                        <SmartLink style={{ marginLeft: '-0.01rem' }} href="https://once-ui.com/">Once UI</SmartLink>
                        and <SmartLink style={{ marginLeft: '-0.05rem' }} href="https://skatehive.app/">Skate Hive App</SmartLink>
                    </Text>
                </Text>
                <Flex
                    gap="16">
                    {social.map((item) => (
                        item.link && (
                            <IconButton
                                key={item.name}
                                href={item.link}
                                icon={item.icon}
                                tooltip={item.name}
                                size="s"
                                variant="ghost" />
                        )
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}