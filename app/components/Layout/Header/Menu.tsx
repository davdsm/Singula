import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const Menu = () => {
  const menu: {
    key: string;
    link: string;
  }[] = [
    {
      key: "Sobre Nós",
      link: "/about",
    },
    {
      key: "Produtos",
      link: "/products",
    },
    {
      key: "Materiais",
      link: "/materials",
    },
    {
      key: "Catálogo",
      link: "/catalog",
    },
    {
      key: "Contactos",
      link: "/contacts",
    },
  ];

  return (
    <>
      <ul className="ml-40 justify-between items-center w-half hidden md:flex">
        {menu.map((item) => (
          <li key={item.key} className="text-white text-lg mx-2">
            <Link
              to={item.link}
              className="hover:text-gray-400 transition duration-300 uppercase"
            >
              {item.key}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
