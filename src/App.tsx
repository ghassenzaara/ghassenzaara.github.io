import { useEffect } from 'react'

/* Global styles first, and deliberately so.
   CSS order follows import order, so anything imported after a component's own
   stylesheet outranks it at equal specificity. With base.css last, every
   `.t-*` type utility was beating the component rule beside it — the hero name
   asked for 700 and rendered 500, and every other weight override on the site
   was silently ignored. */
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './components/Preloader.css'

import { Nav } from './components/Nav'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Hackathons } from './sections/Hackathons'
import { Community } from './sections/Community'
import { Skills } from './sections/Skills'
import { OutOfScope } from './sections/OutOfScope'
import { Contact } from './sections/Contact'
import { initPreloader } from './lib/preloader'
import { ScrollTrigger } from './lib/motion'

export function App() {
  useEffect(() => {
    // Tells the inline failsafe in index.html to stand down: React is running
    // and owns the arming classes from here.
    document.documentElement.dataset.booted = '1'

    // Late-arriving webfonts and images resize the page under triggers that
    // were measured at hydration. Both are re-measured once here rather than
    // left to the debounced resize handler, which only fires on viewport
    // changes and would never catch either.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

    initPreloader(() => {
      // Releasing `is-loading` is what plays the hero in, timed to the moment
      // the panel finishes lifting.
      document.documentElement.classList.remove('is-loading')
    })
  }, [])

  return (
    <>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Hackathons />
        <Community />
        <Skills />
        <OutOfScope />
      </main>
      <Contact />
    </>
  )
}
