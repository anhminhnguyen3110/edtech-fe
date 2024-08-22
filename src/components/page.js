import { NextSeo, ArticleJsonLd } from 'next-seo'

const Page = ({
  title,
  description,
  path = '',
  image = '/home-page.png',
  siteName = 'EdTech Assistant',
  datePublished = '2024-08-23',
  dateModified = '2024-08-23',
  twitterHandle = '@handle', // Make this optional
}) => {
  const url = `https://www.edtech-assistant.sbs/${path}` // Hardcoded base URL

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: 'website',
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: image,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          handle: twitterHandle,
          site: twitterHandle,
          cardType: 'summary_large_image',
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={[image]}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName="Hung Tran"
        publisherName={siteName}
        publisherLogo="/favicon/android-chrome-192x192.png"
        description={description}
      />
    </>
  )
}

export default Page
