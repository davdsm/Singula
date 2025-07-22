import { useState } from "react";
import { useTranslation } from "react-i18next";
import getEmailBody from "~/utils/emails";

const goMail = async (
  lang: "pt" | "en" | "es" | "fr" | "de",
  name: string,
  contact: string,
  message: string,
  email: string,
  isQuote: boolean = false,
  quoteData?: {
    country: string;
    entity: string;
    entity_type: string;
    products: string;
    attachment: string | false;
  },
  receiver?: string,
  ref?: string
) => {
  let status: boolean = false;

  const { bodyReceiver, bodyContact, bodyQuote } = getEmailBody(
    lang,
    name,
    contact,
    message,
    email,
    quoteData,
    ref
  );

  // Localized subject translations
  const subjectTranslations = {
    pt: {
      userQuote: `#${ref} ${name}, Obrigado pelo seu pedido de orçamento!`,
      userMessage: `${name}, Obrigado pela sua mensagem.`,
      adminQuote: `#${ref} 📝 Novo Pedido de Orçamento`,
      adminMessage: `🔔 Nova Mensagem de Singula.pt!`,
    },
    en: {
      userQuote: `#${ref} ${name}, Thank you for your quote request!`,
      userMessage: `${name}, Thank you for your message.`,
      adminQuote: `#${ref} 📝 New Quote Request`,
      adminMessage: `🔔 New Message from Singula.pt!`,
    },
    es: {
      userQuote: `#${ref} ${name}, ¡Gracias por su solicitud de presupuesto!`,
      userMessage: `${name}, Gracias por su mensaje.`,
      adminQuote: `#${ref} 📝 Nueva Solicitud de Presupuesto`,
      adminMessage: `🔔 Nuevo Mensaje de Singula.pt!`,
    },
    fr: {
      userQuote: `#${ref} ${name}, Merci pour votre demande de devis !`,
      userMessage: `${name}, Merci pour votre message.`,
      adminQuote: `#${ref} 📝 Nouvelle Demande de Devis`,
      adminMessage: `🔔 Nouveau Message de Singula.pt !`,
    },
    de: {
      userQuote: `#${ref} ${name}, Vielen Dank für Ihre Angebotsanfrage!`,
      userMessage: `${name}, Vielen Dank für Ihre Nachricht.`,
      adminQuote: `#${ref} 📝 Neue Angebotsanfrage`,
      adminMessage: `🔔 Neue Nachricht von Singula.pt!`,
    },
  };

  // Determine subject based on lang, isQuote, and whether it's for the user or admin
  const subject = receiver
    ? isQuote
      ? subjectTranslations[lang].userQuote
      : subjectTranslations[lang].userMessage
    : isQuote
    ? subjectTranslations[lang].adminQuote
    : subjectTranslations[lang].adminMessage;

  await fetch("https://api.davdsm.pt/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      davdsmKey: "d41d8cd98f00b204e9800998ecf8427e",
      replyTo: email,
    },
    body: JSON.stringify({
      sender: "Singula",
      senderEmail: "design@singula.pt",
      receiver: {
        email: receiver ? receiver : "sales@singula.pt",
        name: receiver ? name : "Administração",
      },
      subject: subject,
      message: receiver ? bodyReceiver : isQuote ? bodyQuote : bodyContact,
    }),
  })
    .then((response) => {
      console.log("✈️ Email 1 Enviado? - ", response.body);
      console.log("---------------------------------------------------");
      console.log("");
      status = true;
    })
    .catch((response) => {
      console.log("✈️ Email 1 Não Enviado? - ", response.body);
      console.log("---------------------------------------------------");
      console.log("");
      status = false;
    });
  return status;
};

export const useSendMail = () => {
  const [Sent, setSent] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  const sendMail = async (
    lang: "pt" | "en" | "es" | "fr" | "de",
    name: string,
    contact: string,
    email: string,
    message: string,
    isQuote?: boolean,
    quoteData?: {
      country: string;
      entity: string;
      entity_type: string;
      products: string;
      attachment: string | false;
    },
    receiver?: string,
    ref?: string
  ) => {
    if (!Sent) {
      setSent(false);
      setLoading(true);
      await goMail(
        lang,
        name,
        contact,
        message,
        email,
        isQuote,
        quoteData,
        receiver,
        ref
      );
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 2000);
    }
  };

  return { sendMail, Sent, Loading };
};
