import SplitText from "../Elements/SplitText";
import { Image } from "../Elements/Image";

function youtubeVideoId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("?")[0];
      return id || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/embed\/([^/]+)/);
      if (m) return m[1];
      const s = u.pathname.match(/\/shorts\/([^/]+)/);
      if (s) return s[1];
    }
  } catch {
    return null;
  }
  return null;
}

export const Hero = ({
  img,
  text,
  imgMobile,
  videoSrc,
}: {
  img: string;
  text: string;
  imgMobile: string;
  videoSrc?: string;
}) => {
  const ytId = videoSrc ? youtubeVideoId(videoSrc) : null;
  const youtubeEmbed =
    ytId &&
    `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${ytId}`;
  const isDirectVideo =
    videoSrc &&
    !ytId &&
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoSrc.trim());

  return (
    <section className="relative w-full h-[60vh] md:h-[90vh] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-black z-10 opacity-10 pointer-events-none" />
      {videoSrc && youtubeEmbed && (
        <iframe
          title="Hero video"
          src={youtubeEmbed}
          className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.02] pointer-events-none border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
        />
      )}
      {videoSrc && isDirectVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {(!videoSrc || (!youtubeEmbed && !isDirectVideo)) && (
        <>
          <Image
            src={img}
            alt="Singula"
            className="hidden md:block top-0 left-0 absolute w-full h-full object-cover"
          />
          <Image
            src={imgMobile}
            alt="Singula"
            className="block md:hidden top-0 left-0 absolute w-full h-full object-cover"
          />
        </>
      )}
      <div className="z-20 absolute inset-0 flex items-end justify-left p-10 md:p-20 pointer-events-none">
        <h1 className="w-full pointer-events-auto">
          <SplitText
            text={text}
            className="z-20 text-white text-3xl md:text-7xl font-bold text-left font-thin uppercase w-full inline-block"
            delay={50}
            animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.1}
            textAlign="left"
            rootMargin="-50px"
            onLetterAnimationComplete={() => console.log("Animation complete")}
          />
        </h1>
      </div>
    </section>
  );
};
