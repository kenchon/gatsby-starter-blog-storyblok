import * as React from "react"
import { Helmet } from "react-helmet"
import client from "../utils/storyblok-service"

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Helmet
        script={[
          {
            src: `//app.storyblok.com/f/storyblok-latest.js?t=${client.token}`,
            type: "text/javascript",
          },
        ]}
      />
      <Helmet
        script={[
          {
            innerHTML: `var StoryblokCacheVersion = '${client.getCacheVersion()}';`,
            type: "text/javascript",
          },
        ]}
      />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
