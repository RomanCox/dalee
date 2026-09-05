import { CSSProperties, ForwardedRef, forwardRef, ImgHTMLAttributes } from "react";

import { generateImageUrl } from "@/utils/helpers";
import { NewTStrapiMedia } from "@/types/strapi.type";

type TImageSrc = string | NewTStrapiMedia | null | undefined;

const resolveUrl = (url: string) => (url.startsWith("http") ? url : generateImageUrl(url));

const buildSrcSet = (media: NewTStrapiMedia): string | undefined => {
  const { formats } = media;
  if (!formats) return undefined;

  const entries = [formats.thumbnail, formats.small, formats.medium, formats.large].filter(Boolean);
  if (!entries.length) return undefined;

  return entries.map((format) => `${resolveUrl(format.url)} ${format.width}w`).join(", ");
};

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "ref"> {
  src: TImageSrc;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
}

/** next/image замена: обычный <img>, умеет собирать srcSet из Strapi-медиа (formats.*). */
const Image = forwardRef(
  (
    { src, alt, fill, priority, quality: _quality, sizes, style, ...rest }: ImageProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    if (!src) return null;

    const isMedia = typeof src === "object";
    const resolvedSrc = isMedia ? resolveUrl(src.url) : resolveUrl(src);
    const srcSet = isMedia ? buildSrcSet(src) : undefined;

    const fillStyle: CSSProperties | undefined = fill
      ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
      : undefined;

    return (
      <img
        ref={ref}
        src={resolvedSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={{ ...fillStyle, ...style }}
        {...rest}
      />
    );
  },
);

Image.displayName = "Image";

export default Image;
