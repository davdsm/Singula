import { useNavigate } from "@remix-run/react";
import { useTransitionContext } from "~/context/TransitionContext";

export function DelayedLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();
  const { startTransition } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => navigate(to));
  };

  if (to === "#") return <>{children}</>;

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
