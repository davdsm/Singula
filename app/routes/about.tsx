import { Link } from "@remix-run/react";

export const About = () => {
  return (
    <>
      <h2>About This Thing</h2>
      <Link to="/">Home</Link>
    </>
  );
};

export default About;
