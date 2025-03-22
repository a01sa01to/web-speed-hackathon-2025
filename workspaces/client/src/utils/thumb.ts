export const thumbUrl = (url: string, size: "sm" | "md" | "lg"): string => url.split("?")[0]?.replace(".jpeg", `-${size}.avif`) ?? ""

// sm: w200
// md: w500
// lg: full