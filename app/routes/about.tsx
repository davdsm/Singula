import { MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";

export const About = () => {
  /* export const meta: MetaFunction = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  }; */

  return (
    <main style={{ height: "100vh" }}>
      <h2>About This Thing</h2>
      <Link to="/">Home</Link>
    </main>
  );
};

export default About;
