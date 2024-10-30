import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Lil',
    lastName:  'Gnars',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Supercoll Gnars Project for Kids',
    scheduleclass: 'Schedule Class',
    avatar:    '/images/avatar.jpg',
    location:  'America/Sao_Paulo',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'Portuguese']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>Receive News About Lil Gnars Project and more awesome stuff.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    // {
    //     name: 'GitHub',
    //     icon: 'github',
    //     link: 'https://github.com/once-ui-system/nextjs-starter',
    // },
    // {
    //     name: 'LinkedIn',
    //     icon: 'linkedin',
    //     link: 'https://www.linkedin.com/company/once-ui/',
    // },
    {
        name: 'X',
        icon: 'X',
        link: 'https://x.com/lilgnars',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:lilgnars@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Project`,
    description: `Project website showcasing our work and ${person.role}`,
    headline: <>Cool Projects for Kids like you.</>,
    subline: <>Gnars Project is a project to <InlineCode>Skate</InlineCode>, for life.<br/> social project. Hours, shreding skate.</>
}

const about = {
    label: 'About',
    title: 'About Lil Gnars',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>Welcome to LilGnars! A super cool project for kids like you! LilGnars is a digital playground where kids can share their passions, skills, and creations with the world, while also earning rewards!</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Project Experience',
        experiences: [
            {
                company: 'Essência na Vivência - Skate Transforma VIDAS',
                timeframe: '2022 - Present',
                role: 'Senior Design Engineer',
                achievements: [
                    <>social action we did with the CWB kids, we spent 5 days in the experience skateboarding on street spots with a video maker and photographer, reliving a lot of things and providing this for the new generation, keeping the essence of skateboarding ALIVE, watch the full video from this memorable session</>,
                    <>https://youtu.be/DA2DEFkXpOs?si=1FsYtQ2vpSq-9UpV</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    {
                        src: '/images/projects/project-01/lil01.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/lil02.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/lil03.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/lil04.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/lil05.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                company: 'Creativ3',
                timeframe: '2018 - 2022',
                role: 'Lead Designer',
                achievements: [
                    <>Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.</>,
                    <>Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company revenue.</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'University of Jakarta',
                description: <>Studied software engineering.</>,
            },
            {
                name: 'Build the Future',
                description: <>Studied online marketing and personal branding.</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical',
        skills: [
            {
                title: 'Gnars',
                description: <>Gnars unnatural speed.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-02.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover-03.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Next.js',
                description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-04.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Essência na Vivência - Skate Transforma VIDAS',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'Photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };