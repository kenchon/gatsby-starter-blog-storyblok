import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.settings.content ? JSON.parse(data.settings.content).site_title : 'Default Title' 

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    settings: storyblokEntry(field_component: { eq: "settings" }) {
      content
    }
  }
`
