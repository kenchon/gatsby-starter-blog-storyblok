import StoryblokClient from "storyblok-js-client"
import config from "../../gatsby-config"
const sbConfig = config.plugins.find(
  item => item.resolve === "gatsby-source-storyblok"
)

class StoryblokService {
  constructor() {
    this.devMode = false
    this.token = sbConfig.options.accessToken
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: "auto",
        type: "memory",
      },
    })
    this.query = ""
  }

  getCacheVersion() {
    return this.client.cacheVersion
  }

  get(slug, params) {
    params = params || {}
    if 
      (typeof window !== "undefined" && window.storyblok)
     {
      params.version = "draft"
    }

    if (
      typeof window !== "undefined" &&
      typeof window.StoryblokCacheVersion !== "undefined"
    ) {
      params.cv = window.StoryblokCacheVersion
    }
    return this.client.get(slug, params)
  }

  setQuery(query) {
    this.query = query
  }

  getQuery(param) {
    return this.query.includes(param)
  }
}

const client = new StoryblokService()

export default client

// export default StoryblokService