import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />

        <meta name="msapplication-TileColor" content="#da532c" />

        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-title" content="EdTech-Assistant" />
        <meta name="application-name" content="EdTech-Assistant" />
        <meta name="msapplication-tooltip" content="EdTech-Assistant" />
        <meta name="msapplication-starturl" content="/" />

        <meta
          name="description"
          content="EdTech-Assistant is your learning companion, designed to enhance your educational experience."
        />
        <meta name="keywords" content="EdTech, Education, Assistant, Learning, Mobile App" />
        <meta name="author" content="EdTech Assistant" />

        {/* Google font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Teko:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
