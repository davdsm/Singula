import { MetaFunction } from "@remix-run/node";
import { ContactForm } from "~/components/ContactForm";
import { ContactInfo } from "~/components/ContactForm/contactInfo";

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
      <ContactInfo />
    </main>
  );
};

export default Contacts;
