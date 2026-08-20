import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { App } from './App'

/**
 * Prerendered at build time by vite-react-ssg.
 *
 * A plain React SPA serves an empty root div: no content without JavaScript,
 * nothing for search engines or link previews. Prerendering emits real HTML at
 * build time while the source stays ordinary React.
 */
export const createRoot = ViteReactSSG(<App />)
