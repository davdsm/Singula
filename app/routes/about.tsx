import { Link } from "@remix-run/react";

export const About = () => {
  return (
    <main
      style={{ height: "100vh" }}
    >
      <h2>About This Thing</h2>
      <Link to="/">Home</Link>
    </main>
  );
};

export default About;
