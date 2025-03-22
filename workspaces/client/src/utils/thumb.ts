export const thumbUrl = (url: string, size: "sm" | "md" | "lg"): string => {
  const thumburl = new URL(url, "http://localhost:8000")
  thumburl.search = ""
  thumburl.pathname = thumburl.pathname.replace(".jpeg", `-${size}.avif`)
  return `https://wsh2025-a01sa01to.pages.dev${thumburl.pathname}`
}

// sm: w200
// md: w500
// lg: full