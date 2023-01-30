import {
  default as NextJsImage,
  ImageProps as ImageNextJsProps,
} from "next/image";
import { FC, useEffect, useState } from "react";

interface ImageProps extends ImageNextJsProps {
  fallbackSrc: string;
}

export const Image: FC<ImageProps> = ({
  fallbackSrc,
  alt,
  src,
  ...props
}: ImageProps) => {
  const [withFallbackImage, setWithFallbackImage] = useState(false);

  useEffect(() => {
    setWithFallbackImage(false);
  }, [src]);

  return (
    <NextJsImage
      alt={alt || "Image"}
      onError={() => setWithFallbackImage(true)}
      src={withFallbackImage ? fallbackSrc : src}
      {...props}
    />
  );
};
