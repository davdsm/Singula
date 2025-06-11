import { useTranslation } from "react-i18next";
import SplitText from "../Elements/SplitText";
import { Image } from "../Elements/Image";
export const Hero = ({ img, text }: { img: string; text: string }) => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[60vh] md:h-[90vh] bg-cover bg-center">
      <div className="absolute inset-0 bg-black z-10 opacity-50 md:opacity-10"></div>
      <Image
        src={img}
        alt="Singula"
        className="top-0 left-0 absolute w-full h-full object-cover"
      />
      <div className="z-20 absolute inset-0 flex items-end justify-left p-10 md:p-20">
        <h1>
          <SplitText
            text={text}
            className="z-20 text-white text-3xl md:text-7xl font-bold text-left font-thin uppercase w-4/5 md:w-3/4 inline-block md:max-w-[850px]"
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
