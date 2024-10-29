import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
    const person = {
        firstName: 'Lil',
        lastName:  'Gnars',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      t("person.role"),
        avatar:    '/images/avatar.jpg',
        location:  'America/Sao_Paulo',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ['English', 'Portugues']   // optional: Leave the array empty if you don't want to display languages
    }

    const newsletter = {
        display: true,
        title: <>{t("newsletter.title", {name: person.name})}</>,
        description: <>{t("newsletter.description")}</>
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
            icon: 'x',
            link: '',
        },
        {
            name: 'Email',
            icon: 'email',
            link: 'mailto:example@gmail.com',
        },
    ]

    const home = {
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.label"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: false,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: false,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true, // set to false to hide this section
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'Lil Gnars - RIO DE JANEIRO',
                    timeframe: t("about.work.experiences.Lil Gnars 1.timeframe"),
                    role: t("about.work.experiences.Lil Gnars 1.role"),
                    achievements: t("about.work.experiences.Lil Gnars 1.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        {
                            src: '/images/projects/project-01/cover-01.jpg',
                            alt: 'Lil Gnars 1',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    company: 'Lil Gnars - Parque Rita Lee',
                    timeframe: t("about.work.experiences.Lil Gnars 2.timeframe"),
                    role: t("about.work.experiences.Lil Gnars 2.role"),
                    achievements: t("about.work.experiences.Lil Gnars 2.achievements").split(";"),
                    images: [ {
                        src: '/images/projects/project-02/cover-01.jpg',
                        alt: 'Lil Gnars 2',
                        width: 16,
                        height: 9
                    }]
                },
                {
                    company: 'Lil Gnars - Churrasco',
                    timeframe: t("about.work.experiences.Lil Gnars 3.timeframe"),
                    role: t("about.work.experiences.Lil Gnars 3.role"),
                    achievements: t("about.work.experiences.Lil Gnars 3.achievements").split(";"),
                    images: [ {
                        src: '/images/projects/project-03/cover-01.jpg',
                        alt: 'Lil Gnars 3',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-03/cover-02.jpg',
                        alt: 'Lil Gnars 3',
                        width: 16,
                        height: 9
                    }]
                }
            ]
        },
        studies: {
            display: false, // set to false to hide this section
            title: 'Studies',
            institutions: [
                {
                    name: 'Estudo de Caso 1',
                    description: <>{t(`about.studies.institutions.Estudo de Caso 1.description`)}</>,
                },
                {
                    name: 'Estudo de Caso 2',
                    description: <>{t("about.studies.institutions.Estudo de Caso 2.description")}</>,
                }
            ]
        },
        technical: {
            display: false, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Gnars',
                    description: <>{t("about.technical.skills.Gnars.description")}</>,
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
                    description: <>{t("about.technical.skills.Nextjs.description")}</>, // "." not accepted in next-intl namespace
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
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
        // Create new project pages by adding a new .mdx file to app/blog/posts
        // All projects will be listed on the /home and /work routes
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        // Images from https://pexels.com
        images: [
            {
                src: '/images/gallery/ChuckSlappy.jpg',
                alt: 'Lil Gnars ChuckSlappy',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/Chuck_Assustando.jpg',
                alt: 'Lil Gnars Chuck Assustando',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/corrida_doida.png',
                alt: 'Lil Gnars corrida doida',
                orientation: 'vertical'
            },
            { 
                src: '/images/gallery/Corrida_Maluca_Aterro.jpg',
                alt: 'Lil Gnars Corrida Maluca Aterro',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/Corrida_Maluca_aterro02.jpg',
                alt: 'Lil Gnars Corrida Maluca aterro',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/Eu_ajudando_a_Sininho_a_colar_o_adesivo_no_poste.jpg',
                alt: 'Ajudando Sininho a colar adesivo',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/jaguatirica0101.png',
                alt: 'Lil Gnars mascote',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/lanches_2_.jpg',
                alt: 'Lil Gnars mascote',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/lil01.jpeg',
                alt: 'Lil Gnars mascote',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/lil02.jpeg',
                alt: 'Lil Gnars mascote',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/lil04.jpeg',
                alt: 'Lil Gnars mascote',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/lil05.jpeg',
                alt: 'Lil Gnars mascote',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/Lil_Gnars_1a_Crew.jpg',
                alt: 'Lil Gnars mascote',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/Lilgnarscapivara.png',
                alt: 'Lil Gnars mascote',
                orientation: 'vertical'
            },
        ]
    }
    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery
    }
};

export { createI18nContent };