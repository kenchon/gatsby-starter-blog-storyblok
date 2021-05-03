// import StoryblokClient from "storyblok-js-client"
import client from "./storyblok-service"
import { useEffect, useState } from "react"

export default function useStoryblok(originalStory) {
  let [story, setStory] = useState(originalStory)

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  const initEventListeners = () => {
    if (window.storyblok) {

      // reload on Next.js page on save or publish event in the Visual Editor
      window.storyblok.on(["change", "published"], () =>
        window.location.reload(true)
      )

      // live update the story on input events
      window.storyblok.on("input", event => {

        if (event.story.content._uid === story.content._uid) {
          event.story.content = window.storyblok.addComments(
            event.story.content,
            event.story.id
          )
          setStory(event.story)
        } else {
          console.log(`You're editing "${event.story.name}", but actual this component is "${story.name}"`)
        }
      })
    }
  }


  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
  const addBridge = callback => {
    // check if the script is already present
    const existingScript = document.getElementById("storyblokBridge")
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = `https://app.storyblok.com/f/storyblok-latest.js?t=${client.token}`
      script.id = "storyblokBridge"
      document.body.appendChild(script)
      script.onload = () => {
        // once the scrip is loaded, init the event listeners
        callback()
      }
    } else {
      callback()
    }
  }

  useEffect(() => {
    // first load the bridge, then initialize the event listeners
    addBridge(initEventListeners)
  })

  // Called only first time the component is mounted to fetch init content
  useEffect(() => {
    (async () => {
      let { data } = await client.get(`cdn/stories/${story.full_slug}`)
      setStory(data.story)
    })()
  }, [])

  return story
}
