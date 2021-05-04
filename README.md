# Gatsby Starter Blog Storyblok

This is the example integration of [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) and [Storyblok](https://www.storyblok.com/).

## 1. Installation

`git clone` and `npm install` this package.

```bash
git clone https://kenchon.github.com/gatsby-starter-blog-storyblok
npm install
```

## 2. Storyblok setup

Before we move on to `npm run start`, let's setup Storyblok account and make contents on Storyblok at first.

If you are new to Storyblok, please read and complete [Create a space](https://www.storyblok.com/docs/guide/getting-started#create-a-space) section.

### 2.1 Get an API key

Get API key using Storyblok GUI as written on [this article](https://www.storyblok.com/tp/gatsby-multilanguage-website-tutorial#connect-storyblok) and paste it on `gatsby-config.js`:

```js
module.exports = {
  ...
  plugins: [
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN, // <- replace this
        homeSlug: "home",
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
      },
    },
    ...
  ],
}
```

### 2.2 Define a schema

In this starter, we create following **component**, (content type) and  `field` as described in [Prepared Data Structure](https://www.storyblok.com/docs/guide/getting-started#prepared-data-structure) section.

- **/blog** (blogpost)
  - `title`
  - `image`
  - `intro`
  - `long_text`
- **settings** (settings)
  - `site_title`
  - `site_img`
  - `site_description`
- **bio** (bio)
  - `bio_img`
  - `bio_msg`
  - `bio_name`

> **📖 NOTE**
> 
> If your site have multiple author, **bio** should be a folder (rather than an entry) and create bio entry inside the folder.

### 2.3 Create Contents