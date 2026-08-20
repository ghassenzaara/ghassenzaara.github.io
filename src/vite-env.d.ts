/// <reference types="vite/client" />

/**
 * vite-imagetools 12 no longer ships a `/client` types entry, so the shapes of
 * the query-suffixed imports are declared here.
 *
 * `as=srcset` resolves to a single string: the full srcset descriptor list.
 * A TypeScript module wildcard permits exactly one `*`, so the pattern anchors
 * on the directive suffix. That is still narrower than a bare `*.webp`, which
 * would type every image import as a string and swallow a mistyped directive.
 */
declare module '*&as=srcset' {
  const srcset: string
  export default srcset
}
