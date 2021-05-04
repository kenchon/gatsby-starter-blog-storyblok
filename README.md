# Gatsby Starter Blog Storyblok

This is the example integration of [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) and [Storyblok](https://www.storyblok.com/). I assume you know [Storyblok basics](https://www.storyblok.com/docs/guide/essentials/content-structures).

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
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN, // <- set your own
        homeSlug: "home",
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
      },
    },
    ...
  ],
}
```

### 2.2 Define a schema

In this starter, we create following **component**, (content type) and  `field`. [Prepared Data Structure](https://www.storyblok.com/docs/guide/getting-started#prepared-data-structure) section.

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

Your **Content** looks like this:

![](./docs/contents.png)

> **📖 NOTE**
> 
> If your site have multiple author, **bio** should be a folder (rather than an entry) and create bio entries inside the folder.

### 2.3 Create Contents

#### `blogpost`

Go to **/blog** folder and click `+ Entry` to add blogpost.

> **📖 NOTE**
>
>Since **/blog** is a folder, `full_slug` property of your new blogpost begin with the prefix `blog/...` (e.g. `blog/my-first-blog`). It is inconvenience when using Visual Editor because this starter repo doesn't use /blog route. To avoid this prefix, install **Advanced Paths** extension from GUI and set `Real Path` = "" at the settings of the **blog** folder.
![](./docs/advanced-paths.png)

#### `bio`, `settings`

Add contents you like.

## 3. Preview on Visual Editor

`npm run dev` to stert dev server and you can use Visual Editor from Storyblok GUI.
