import * as React from "react"
import SbEditable from "storyblok-react"
import useStoryblok from "../utils/storyblok-hook"
import { Link } from "gatsby"

const Header = ({ blok }) => {
  const story = useStoryblok(blok)

  return !story.content ? (
    <></>
  ) : (
    <SbEditable content={story.content} key={story.content._uid}>
      <header className="global-header">
          <article>
            {story.content.site_img && (
              <img
                src={story.content.site_img.filename}
                alt={story.content.site_title}
                style={{width:'100px',padding:'10px',float:'left'}}
              />
            )}
            <h1>
              <Link to="/">{story.content.site_title}</Link>
            </h1>
          </article>
      </header>
    </SbEditable>
  )
}

export default Header
