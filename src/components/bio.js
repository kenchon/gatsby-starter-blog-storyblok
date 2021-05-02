import * as React from "react"
import SbEditable from "storyblok-react"
import useStoryblok from "../utils/storyblok-hook"
import Markdown from "react-markdown"

const Bio = ({ blok }) => {
  const story = useStoryblok(blok)

  return !story.content ? (
    <></>
  ) : (
    <SbEditable content={story.content} key={story.content._uid}>
      <div>
        {story.content.bio_img && (
          <img
            className="bio-avatar"
            layout="fixed"
            formats={["AUTO", "WEBP", "AVIF"]}
            src={story.content.bio_img.filename}
            width={50}
            height={50}
            quality={95}
            alt={story.content.bio_name}
          />
        )}
        {story.content.bio_name && (
          <>
            <p>
              Written by <strong>{story.content.bio_name}</strong>
            </p>
            <Markdown>{story.content.bio_msg}</Markdown>
          </>
        )}
      </div>
    </SbEditable>
  )
}

export default Bio
