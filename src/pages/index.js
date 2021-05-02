import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/Bio"
import Seo from "../components/seo"
import Header from "../components/Header"

const BlogIndex = ({ data, location }) => {
  // Get contents info fetched by GraphQL
  const posts = data.story.nodes
  const settings = {
    content: JSON.parse(data.settings.content),
    full_slug: data.settings.full_slug,
  }
  const bio = {
    content: JSON.parse(data.bio.content),
    full_slug: data.bio.full_slug,
  }

  if (posts.length === 0) {
    return (
      <Layout
        location={location}
        title={settings.content.site_title}
        blok={settings}
      >
        <Header blok={settings} />
        <Seo metadata={settings}/>
        <hr />
        <Bio blok={bio} />
        <hr />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      location={location}
      title={settings.content.site_title}
      blok={settings}
    >
      <Seo metadata={settings}/>
      <Header blok={settings} />
      <hr />
      <Bio blok={bio} />
      <hr />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const content = JSON.parse(post.content)
          const title = content.title || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.created_at}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content.intro || "not found",
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    settings: storyblokEntry(field_component: { eq: "settings" }) {
      content
      full_slug
    }
    story: allStoryblokEntry(filter: { field_component: { eq: "blogpost" } }) {
      nodes {
        name
        slug
        uuid
        created_at(formatString: "YYYY/MM/DD")
        content
        full_slug
      }
    }
    bio: storyblokEntry(field_component: { eq: "bio" }) {
      name
      slug
      full_slug
      content
      uuid
    }
  }
`
