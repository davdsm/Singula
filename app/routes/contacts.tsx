import { MetaFunction } from "@remix-run/node";
import { ContactForm } from "~/components/ContactForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Contactos - Singula" },
    {
      name: "description",
      content: "Vamos criar impacto. Estamos prontos, e tu?",
    },
  ];
};

export const Contacts = () => {
  return (
    <main>
      <ContactForm />
    </main>
  );
};

export default Contacts;
