// pages/stories.js
import Head from 'next/head';

export const config = { amp: true };

export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/recipes?limit=10');
  const data = await res.json();

  return {
    props: {
      stories: data.recipes,
    },
  };
}

export default function Home({ stories }) {
  return (
    <html amp="true">
      <Head>
        <meta charSet="utf-8" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        ></script>
        <script
          async
          custom-element="amp-story-page-outlink"
          src="https://cdn.ampproject.org/v0/amp-story-page-outlink-0.1.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        <style amp-custom>{`
          body {
            font-family: 'Roboto', sans-serif;
          }
          amp-story {
            display: block;
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .white-text {
            color: white;
          }
          .text-container {
            position: absolute;
            bottom: 150px;
            padding:15px;
            text-align: left;
          }
        `}</style>
      </Head>
      <body>
        <amp-story
          standalone
          title="Dynamic AMP Story"
          publisher="Your Publisher"
          publisher-logo-src="/static/logo.png"
          poster-portrait-src="/static/poster.png"
        >
          {stories.map((story, index) => (
            <amp-story-page
              key={index}
              id={`page${index + 1}`}
              auto-advance-after="7s"
            >
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={story.image}
                  width="720"
                  height="1280"
                  layout="responsive"
                ></amp-img>
              </amp-story-grid-layer>
              <amp-story-grid-layer template="vertical">
                <div className="text-container">
                  <h1 className="white-text">{story.name}</h1>
                  <h3 className="white-text">{story?.cuisine}</h3>
                </div>
              </amp-story-grid-layer>
              <amp-story-page-outlink layout="nodisplay">
                <a href="https://example.com/more-info">Swipe up for more</a>
              </amp-story-page-outlink>
            </amp-story-page>
          ))}
        </amp-story>
      </body>
    </html>
  );
}
