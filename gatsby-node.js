const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPage = path.resolve(`./src/templates/blog-page.js`)

  const result = await graphql(
    `
      {
        story: allStoryblokEntry(
          filter: { field_component: { eq: "blogpost" } }
        ) {
          nodes {
            name
            slug
            uuid
            created_at(formatString: "YYYY/MM/DD")
            content
            full_slug
          }
        }
        settings: storyblokEntry(field_component: { eq: "settings" }) {
          content
          full_slug
        }
        bio: storyblokEntry(field_component: { eq: "bio" }) {
          content
          full_slug
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.story.nodes
  const settings = {
    content: JSON.parse(result.data.settings.content),
    full_slug: result.data.settings.full_slug,
  }
  const bio = {
    content: JSON.parse(result.data.bio.content),
    full_slug: result.data.bio.full_slug,
  }
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previous = {
        slug: index === 0 ? null : posts[index - 1].slug,
        title: index === 0 ? null : JSON.parse(posts[index - 1].content).title,
      }
      const next = {
        slug: index === posts.length - 1 ? null : posts[index + 1].slug,
        title:
          index === posts.length - 1
            ? null
            : JSON.parse(posts[index + 1].content).title,
      }
      const content = JSON.parse(post.content)

      createPage({
        path: `${post.slug}`,
        component: blogPage,
        context: {
          _uid: content._uid,
          uuid: post.uuid,
          previous,
          next,
          full_slug: post.full_slug,
          content: content,
          settings,
          bio,
        },
      })
    })
  }
}
