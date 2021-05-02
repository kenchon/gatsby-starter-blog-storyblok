import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/Bio"
import Header from "../components/Header"

import Markdown from "react-markdown"
import SbEditable from "storyblok-react"

import useStoryblok from "../utils/storyblok-hook"

const BlogPage = props => {
  // Get values to SSR blog post.
  // These variables are fetched by GraphQL at gatsby-node.js
  const { previous, next, settings, bio } = props.pageContext
  const initialStory = {
    content: JSON.parse(props.data.storyblokEntry.content),
    full_slug: props.data.storyblokEntry.full_slug,
  }
  const story = useStoryblok(initialStory)

  return (
    <Layout>
      <Header blok={settings} />
      <SbEditable content={story.content} key={story.content._uid}>
        <div>
          <div>
            <h2>{story.content.title}</h2>
            <p>{story.content.intro}</p>
            <img src={story.content.image} alt={story.content.intro} />
          </div>
        </div>
        <div>
          <div>
            <Markdown children={story.content.long_text} />
          </div>

          <div>
            <div></div>
          </div>
          <footer>
            <hr />
            <Bio blok={bio} />
            <hr />
          </footer>
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous.slug && (
                  <Link to={"/" + previous.slug} rel="prev">
                    ← {previous.title}
                  </Link>
                )}
              </li>
              <li>
                {next.slug && (
                  <Link to={"/" + next.slug} rel="next">
                    {next.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </SbEditable>
    </Layout>
  )
}

export default BlogPage

// $full_slug は gatsby-node.js の createPage API の pageContext から渡される。
export const query = graphql`
  query BlogPostBySlug($full_slug: String) {
    storyblokEntry(full_slug: { eq: $full_slug }) {
      full_slug
      content
    }
  }
`
