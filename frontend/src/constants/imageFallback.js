/** No network request — works when external placeholder CDNs are blocked */
export const IMAGE_FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23e5e7eb" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="system-ui,sans-serif" font-size="14">No image</text></svg>'
  )
