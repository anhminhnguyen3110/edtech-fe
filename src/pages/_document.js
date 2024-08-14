import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="EdTech Assistant" />
        <link rel="icon" href="/logo.webp" />
        <meta
          name="description"
          content="Language Confidence is a tool for language learners to evaluate their proficiency in a given language. Experience our product and learn how to use it."
        />
        <meta name="keywords" content="web3,trading,decentralized,ethereum,blockchain" />
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
