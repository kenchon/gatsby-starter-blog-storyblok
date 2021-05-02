import React from "react"
import { Link } from "gatsby"

import SbEditable from "storyblok-react"
import Markdown from "react-markdown"
import Bio from "./Bio"

const BlogPost = ({ blok, pageContext }) => {
  const { previous, next} = pageContext

  return (
    <>
      <SbEditable content={blok} key={blok._uid}>
        <div>
          <div>
            <h2>{blok.title}</h2>
            <p>{blok.intro}</p>
            <img src={blok.image} alt={blok.intro} />
          </div>
        </div>
        <div>
          <div>
            <Markdown
              children={blok.long_text}
            />
          </div>

          <div>
            <div></div>
          </div>
          <footer>
            <hr />
            <Bio />
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
    </>
  )
}

export default BlogPost

