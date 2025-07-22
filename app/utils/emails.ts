export const getEmailBody = (
  lang: "pt" | "en" | "es" | "fr" | "de",
  name: string,
  contact: string,
  message: string,
  email: string,
  quoteData?: {
    country: string;
    entity: string;
    entity_type: string;
    products: string;
    attachment: string | false;
  },
  ref?: string
): {
  bodyReceiver: string;
  bodyQuote: string;
  bodyContact: string;
} => {
  // Language translations
  const translations = {
    pt: {
      newMessageTitle: "Recebeu uma nova mensagem!",
      adminGreeting: "Olá Admnistrador, recebeu uma mensagem a partir do website singula.pt",
      quoteRequestTitle: "Pedido de Orçamento!",
      quoteAdminGreeting: "Olá Administrador! Recebeu um pedido de orçamento.",
      receivedRequestTitle: "Recebemos o teu pedido.",
      userGreeting: (name: string) => `Olá ${name},`,
      confirmationMessage: "Confirmamos que recebemos o teu pedido e já estamos a tratá-lo com a urgência e atenção que merece.\nA nossa equipa vai analisar os detalhes e entrará em contacto contigo em breve.",
      additionalInfoMessage: "Se precisares de acrescentar alguma informação, podes sempre responder diretamente a este e-mail.",
      thankYouMessage: "Obrigado por escolheres a Singula.",
      thinkMetal: "Obrigado por pensares em metal.",
      teamSignature: "A equipa Singula\nThink Metal",
      automaticEmail: "Este é um email automático de <strong>singula.pt</strong>.",
      fields: {
        name: "Nome",
        email: "Email",
        contact: "Contacto",
        country: "País",
        entity: "Entidade",
        entityType: "Tipo Entidade",
        products: "Produtos",
        message: "Mensagem",
        attachment: "Anexo",
        reference: "Referência Pedido"
      }
    },
    en: {
      newMessageTitle: "You have received a new message!",
      adminGreeting: "Hello Administrator, you have received a message from the singula.pt website",
      quoteRequestTitle: "Quote Request!",
      quoteAdminGreeting: "Hello Administrator! You have received a quote request.",
      receivedRequestTitle: "We have received your request.",
      userGreeting: (name: string) => `Hello ${name},`,
      confirmationMessage: "We confirm that we have received your request and are already handling it with the urgency and attention it deserves.\nOur team will analyze the details and contact you shortly.",
      additionalInfoMessage: "If you need to add any information, you can always reply directly to this email.",
      thankYouMessage: "Thank you for choosing Singula.",
      thinkMetal: "Thank you for thinking metal.",
      teamSignature: "The Singula Team\nThink Metal",
      automaticEmail: "This is an automatic email from <strong>singula.pt</strong>.",
      fields: {
        name: "Name",
        email: "Email",
        contact: "Contact",
        country: "Country",
        entity: "Entity",
        entityType: "Entity Type",
        products: "Products",
        message: "Message",
        attachment: "Attachment",
        reference: "Request Reference"
      }
    },
    es: {
      newMessageTitle: "¡Has recibido un nuevo mensaje!",
      adminGreeting: "Hola Administrador, has recibido un mensaje del sitio web singula.pt",
      quoteRequestTitle: "¡Solicitud de Presupuesto!",
      quoteAdminGreeting: "¡Hola Administrador! Has recibido una solicitud de presupuesto.",
      receivedRequestTitle: "Hemos recibido tu solicitud.",
      userGreeting: (name: string) => `Hola ${name},`,
      confirmationMessage: "Confirmamos que hemos recibido tu solicitud y ya la estamos tratando con la urgencia y atención que merece.\nNuestro equipo analizará los detalles y se pondrá en contacto contigo pronto.",
      additionalInfoMessage: "Si necesitas agregar alguna información, siempre puedes responder directamente a este correo.",
      thankYouMessage: "Gracias por elegir Singula.",
      thinkMetal: "Gracias por pensar en metal.",
      teamSignature: "El equipo Singula\nThink Metal",
      automaticEmail: "Este es un correo automático de <strong>singula.pt</strong>.",
      fields: {
        name: "Nombre",
        email: "Email",
        contact: "Contacto",
        country: "País",
        entity: "Entidad",
        entityType: "Tipo de Entidad",
        products: "Productos",
        message: "Mensaje",
        attachment: "Adjunto",
        reference: "Referencia de Solicitud"
      }
    },
    fr: {
      newMessageTitle: "Vous avez reçu un nouveau message !",
      adminGreeting: "Bonjour Administrateur, vous avez reçu un message du site web singula.pt",
      quoteRequestTitle: "Demande de Devis !",
      quoteAdminGreeting: "Bonjour Administrateur ! Vous avez reçu une demande de devis.",
      receivedRequestTitle: "Nous avons reçu votre demande.",
      userGreeting: (name: string) => `Bonjour ${name},`,
      confirmationMessage: "Nous confirmons que nous avons reçu votre demande et nous la traitons déjà avec l'urgence et l'attention qu'elle mérite.\nNotre équipe analysera les détails et vous contactera bientôt.",
      additionalInfoMessage: "Si vous devez ajouter des informations, vous pouvez toujours répondre directement à cet email.",
      thankYouMessage: "Merci d'avoir choisi Singula.",
      thinkMetal: "Merci de penser métal.",
      teamSignature: "L'équipe Singula\nThink Metal",
      automaticEmail: "Ceci est un email automatique de <strong>singula.pt</strong>.",
      fields: {
        name: "Nom",
        email: "Email",
        contact: "Contact",
        country: "Pays",
        entity: "Entité",
        entityType: "Type d'Entité",
        products: "Produits",
        message: "Message",
        attachment: "Pièce jointe",
        reference: "Référence de Demande"
      }
    },
    de: {
      newMessageTitle: "Sie haben eine neue Nachricht erhalten!",
      adminGreeting: "Hallo Administrator, Sie haben eine Nachricht von der Website singula.pt erhalten",
      quoteRequestTitle: "Kostenvoranschlag-Anfrage!",
      quoteAdminGreeting: "Hallo Administrator! Sie haben eine Kostenvoranschlag-Anfrage erhalten.",
      receivedRequestTitle: "Wir haben Ihre Anfrage erhalten.",
      userGreeting: (name: string) => `Hallo ${name},`,
      confirmationMessage: "Wir bestätigen, dass wir Ihre Anfrage erhalten haben und bereits mit der gebührenden Dringlichkeit und Aufmerksamkeit bearbeiten.\nUnser Team wird die Details analysieren und sich bald mit Ihnen in Verbindung setzen.",
      additionalInfoMessage: "Wenn Sie Informationen hinzufügen müssen, können Sie jederzeit direkt auf diese E-Mail antworten.",
      thankYouMessage: "Vielen Dank, dass Sie sich für Singula entschieden haben.",
      thinkMetal: "Danke, dass Sie an Metall denken.",
      teamSignature: "Das Singula Team\nThink Metal",
      automaticEmail: "Dies ist eine automatische E-Mail von <strong>singula.pt</strong>.",
      fields: {
        name: "Name",
        email: "E-Mail",
        contact: "Kontakt",
        country: "Land",
        entity: "Unternehmen",
        entityType: "Unternehmenstyp",
        products: "Produkte",
        message: "Nachricht",
        attachment: "Anhang",
        reference: "Anfrage-Referenz"
      }
    }
  };

  const t = translations[lang];

  // Helper function to generate the common HTML structure
  const generateEmailHTML = (title: string, content: string): string => {
    return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="${lang}">

<head>
	<title>${title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:520px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center">
																	<div style="max-width: 166.667px;"><a href="https://singula.pt/" target="_blank" style="outline:none" tabindex="-1"><img src="https://singula.pt/logo-email.png" style="display: block; height: auto; border: 0; width: 100%;" width="166.667" alt="Singula Logo" title="Singula" height="auto"></a></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #1e0e4b; direction: ltr; font-family: 'Poppins', Arial, Helvetica, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;">${title}</h1>
															</td>
														</tr>
													</table>
													${content}
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="50" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																	<p style="margin: 0;">${t.automaticEmail}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;">&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`;
  };

  // Generate bodyContact
  const bodyContact = generateEmailHTML(
    t.newMessageTitle,
    `<table class="paragraph_block block-3" width="100%" border="0" cellpadding="50" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
      <tr>
        <td class="pad">
          <div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
            <p style="margin: 0; margin-bottom: 16px;">${t.adminGreeting}</p>
            <p style="margin: 0; margin-bottom: 16px;">
              <strong>${t.fields.name}</strong>: ${name}<br>
              <strong>${t.fields.email}</strong>: ${email}<br>
              <strong>${t.fields.contact}</strong>: ${contact}<br>
              <strong>${t.fields.message}</strong>:
            </p>
            <p style="margin: 0; margin-bottom: 16px;">${message}</p>
            ${ref ? `<p style="margin: 0; margin-bottom: 16px;"><strong>${t.fields.reference}</strong>: #${ref}</p>` : ''}
          </div>
        </td>
      </tr>
    </table>`
  );

  // Generate bodyQuote
  const bodyQuote = generateEmailHTML(
    t.quoteRequestTitle,
    `<table class="paragraph_block block-3" width="100%" border="0" cellpadding="50" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
      <tr>
        <td class="pad">
          <div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
            <p style="margin: 0; margin-bottom: 16px;">${t.quoteAdminGreeting}</p>
            <p style="margin: 0; margin-bottom: 16px;">
              <strong>${t.fields.name}</strong>: ${name}<br>
              <strong>${t.fields.email}</strong>: ${email}<br>
              <strong>${t.fields.contact}</strong>: ${contact}<br>
              <strong>${t.fields.country}</strong>: ${quoteData?.country || ''}<br>
              <strong>${t.fields.entity}</strong>: ${quoteData?.entity || ''}<br>
              <strong>${t.fields.entityType}</strong>: ${quoteData?.entity_type || ''}<br>
              <strong>${t.fields.products}</strong>: ${quoteData?.products || ''}<br>
              <strong>${t.fields.message}</strong>:
            </p>
            <p style="margin: 0; margin-bottom: 16px;">${message}</p>
            ${quoteData?.attachment ? `<p style="margin: 0; margin-bottom: 16px;"><strong>${t.fields.attachment}</strong>: ${quoteData.attachment}</p>` : ''}
            ${ref ? `<p style="margin: 0; margin-bottom: 16px;"><strong>${t.fields.reference}</strong>: #${ref}</p>` : ''}
          </div>
        </td>
      </tr>
    </table>`
  );

  // Generate bodyReceiver
  const bodyReceiver = generateEmailHTML(
    t.receivedRequestTitle,
    `<table class="paragraph_block block-3" width="100%" border="0" cellpadding="50" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
      <tr>
        <td class="pad">
          <div style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
            <p style="margin: 0; margin-bottom: 16px;">
              ${t.userGreeting(name)}<br><br>
              ${t.confirmationMessage.replace(/\n/g, '<br>')}<br><br>
              ${t.additionalInfoMessage}<br><br>
              ${t.thankYouMessage}<br>
              <strong>${t.thinkMetal}</strong><br><br>
              ${ref ? `<strong>${t.fields.reference}</strong>: #${ref}<br><br>` : ''}
              <strong>${t.teamSignature.replace(/\n/g, '<br>')}</strong>
            </p>
          </div>
        </td>
      </tr>
    </table>`
  );

  return {
    bodyReceiver,
    bodyContact,
    bodyQuote,
  };
};

export default getEmailBody;