import { Link } from "@remix-run/react";
import { Image } from "~/components/Elements/Image";

export type LogoProps = {
  width: number;
  height: number;
  className?: string;
};

export const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Link to="/" className={className}>
      <div id="logo" className="flex justify-between items-center">
        <Image src="/logo.svg" alt="Singula" width={width} height={height} />
      </div>
    </Link>
  );
};
