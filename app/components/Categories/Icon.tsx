import { Image } from "../Elements/Image";

export const CategoryIcon = ({
  category,
}: {
  category: "home" | "garden" | "street";
}) => {
  switch (category) {
    case "home":
      return (
        <span className="flex justify-center items-center w-[1.5rem] h-[1.5rem] md:w-[2.8rem] md:h-[2.8rem] rounded-3xl bg-singula-home">
          <Image
            src="/media/categories/homeDesign.png"
            alt="Singula Home Design"
            className="w-2/3 h-auto"
          />
        </span>
      );
    case "street":
      return (
        <span className="flex justify-center items-center  w-[1.5rem] h-[1.5rem] md:w-[2.8rem] md:h-[2.8rem] rounded-3xl bg-singula-main">
          <Image
            src="/media/categories/streetDesign.png"
            alt="Singula Street Design"
            className="w-2/3 h-auto"
          />
        </span>
      );
    case "garden":
      return (
        <span className="flex justify-center items-center w-[1.5rem] h-[1.5rem] md:w-[2.8rem] md:h-[2.8rem] rounded-3xl bg-singula-garden">
          <Image
            src="/media/categories/gardenDesign.png"
            alt="Singula Garden Design"
            className="w-2/3 h-auto"
          />
        </span>
      );
    default:
      break;
  }
};
