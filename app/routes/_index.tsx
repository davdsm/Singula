import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

/* export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
}; */

export const Index = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/about">
        <h2>about </h2>
      </Link>
    </>
  );
};

export default Index;
