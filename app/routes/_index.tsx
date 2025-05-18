import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

/* export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
}; */

export const Index = () => {
  return (
    <main>
      <h1>Home</h1>
      <Link to="/about">
        <h2>about </h2>
      </Link>
    </main>
  );
};

export default Index;
