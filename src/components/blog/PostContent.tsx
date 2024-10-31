import { formatDate, getPosts, getPostBySlug } from '@/app/utils';
import { Flex, Grid, Heading, SmartLink, Text } from '@/once-ui/components';
import styles from '@/components/blog/Posts.module.scss';
import { CustomMDX } from '@/components/mdx'

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    slug: string;
    locale: string;
}

export function PostContent({
    range,
    columns = '1',
    slug,
    locale = 'en'
}: PostsProps) {
    // let allBlogs = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    let post = getPostBySlug(slug, ['src', 'app', '[locale]', 'blog', 'posts', locale])

    // console.log(allBlogs);

    // const sortedBlogs = allBlogs.filter(blog => blog.slug === slug);
    // const sortedBlogs = allBlogs.sort((a, b) => {
    //     return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    // });

    // const displayedBlogs = range
    //     ? sortedBlogs.slice(
    //           range[0] - 1,
    //           range.length === 2 ? range[1] : sortedBlogs.length 
    //       )
    //     : sortedBlogs;

    return (
        <>
            {/* { displayedBlogs.length > 0 && ( */}
            <Grid
                columns={`repeat(${columns}, 1fr)`} mobileColumns="1col"
                fillWidth marginBottom="40" gap="m" paddingX="l">
                {/* {displayedBlogs.map((post) => (
                        // <SmartLink
                        //     style={{
                        //         textDecoration: 'none',
                        //         margin: '0',
                        //         height: 'fit-content',
                        //     }}
                        //     className={styles.hover}
                        //     key={post.slug}
                        //     href={`blog/${post.slug}`}>
                         */}
                <Flex
                    position="relative"
                    paddingX="16" paddingY="12" gap="8"
                    direction="column" justifyContent="center">
                    <Flex
                        position="absolute"
                        className={styles.indicator}
                        width="20" height="2"
                        background="neutral-strong" />
                    {/* <Heading as="h2" wrap="balance">
                        {post.metadata.title}
                    </Heading> */}
                    {/* <Text
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text> */}
                    <Flex
                        as="article"
                        direction="column"
                        fillWidth>
                        <CustomMDX source={post.content} />
                    </Flex>
                </Flex>
                {/* </SmartLink> */}
                {/* ))} */}
            </Grid>
            {/* // )} */}
        </>
    );
}