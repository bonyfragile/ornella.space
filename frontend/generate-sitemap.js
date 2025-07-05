import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap'
import client from './src/sanityClient.js'
import { Readable } from 'stream';

async function generateSitemap() {
    const baseURL = 'https://ornella.space'

    const staticRoutes = [
        { url: '/', changefreq: 'monthly', priority: 1.0 },
        { url: '/bio', changefreq: 'monthly', priority: 0.8 },
        { url: '/dates', changefreq: 'monthly', priority: 0.8 },
        { url: '/lovelist', changefreq: 'monthly', priority: 0.8 },
    ]

    const query = '*[_type in ["film", "book", "postpunkpoetry"]]{ "slug": slug.current }'
    const slugs = await client.fetch(query)

    const dynamicRoutes = slugs.map(slug => ({
        url: `/${slug.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
    }))

    const allRoutes = [...staticRoutes, ...dynamicRoutes]

    const stream = new SitemapStream({ hostname: baseURL })
    const xml = await streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => data.toString())

    fs.writeFileSync('./public/sitemap.xml', xml)
    console.log('sitemap.xml created at /public')
}

generateSitemap().catch(console.error)