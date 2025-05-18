import { Image } from "~/components/Elements/Image";
import { DelayedLink } from "./Link";

export type LogoProps = {
  width: number;
  height: number;
  className?: string;
};

export const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <DelayedLink to="/" className={className}>
      <div id="logo" className="flex justify-between items-center">
        <Image src="/logo.svg" alt="Singula" width={width} height={height} />
      </div>
    </DelayedLink>
  );
};
