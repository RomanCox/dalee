import {detect} from "detect-browser";

export const generateImageUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`;
};

export const isApple = () => {
  const browser = detect();

  return browser?.os === "Mac OS" || browser?.os === "iOS";
}