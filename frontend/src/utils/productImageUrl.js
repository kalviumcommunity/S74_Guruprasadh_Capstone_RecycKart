import { IMAGE_FALLBACK } from '../constants/imageFallback'

/** Full URL (Cloudinary) or legacy `/uploads/...` path → browser-ready src */
export function getProductImageUrl(image) {
  if (!image) return IMAGE_FALLBACK
  const s = String(image).trim()
  if (/^https?:\/\//i.test(s)) return s
  const base =
    (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '') ||
    'http://localhost:5000'
  const pathPart = s.startsWith('/') ? s : `/${s}`
  return `${base}${pathPart}`
}
