import { useLocation, useNavigate } from "@remix-run/react";
import { useTransitionContext } from "~/context/TransitionContext";

export function DelayedLink({
  to,
  children,
  className,
  target,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (target && target !== "_self") return;
    e.preventDefault();

    if (location.pathname !== to) {
      startTransition(() => navigate(to));
    }

    onClick?.();
  };

  if (to === "#") return <>{children}</>;

  return (
    <a href={to} onClick={handleClick} className={className} target={target}>
      {children}
    </a>
  );
}
