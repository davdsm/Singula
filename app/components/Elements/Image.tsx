type ResponsiveImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function Image({ src, alt, width, height, className }: ResponsiveImageProps) {
  // Example with Cloudinary URL transformations for responsive sizes
  const baseUrl = src;

  const srcSet = [
    `${baseUrl}?w=320&q=80 320w`,
    `${baseUrl}?w=640&q=80 640w`,
    `${baseUrl}?w=960&q=80 960w`,
    `${baseUrl}?w=1280&q=80 1280w`,
  ].join(", ");

  return (
    <img
      src={`${baseUrl}?w=${width}&q=80`}
      srcSet={srcSet}
      sizes="(max-width: 640px) 100vw, 640px"
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
    />
  );
}
