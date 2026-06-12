import { t, type Locale, type LocalizedText } from "./localized";

const orderLabels: Record<string, LocalizedText> = {
  title: {
    ar: "طلب اشتراك",
    en: "Subscription Order",
    de: "Abo bestellen",
    es: "Pedir suscripción",
    it: "Ordina abbonamento"
  },
  name: {
    ar: "الاسم الكامل",
    en: "Full Name",
    de: "Vollständiger Name",
    es: "Nombre completo",
    it: "Nome completo"
  },
  phone: {
    ar: "رقم واتساب",
    en: "WhatsApp Number",
    de: "WhatsApp-Nummer",
    es: "Número de WhatsApp",
    it: "Numero WhatsApp"
  },
  device: {
    ar: "نوع الجهاز",
    en: "Device Type",
    de: "Gerätetyp",
    es: "Tipo de dispositivo",
    it: "Tipo di dispositivo"
  },
  plan: {
    ar: "مدة الاشتراك",
    en: "Subscription Duration",
    de: "Abo-Dauer",
    es: "Duración de suscripción",
    it: "Durata abbonamento"
  },
  notes: {
    ar: "ملاحظات (اختياري)",
    en: "Notes (optional)",
    de: "Notizen (optional)",
    es: "Notas (opcional)",
    it: "Note (opzionale)"
  },
  submit: {
    ar: "إرسال الطلب",
    en: "Submit Order",
    de: "Bestellung senden",
    es: "Enviar pedido",
    it: "Invia ordine"
  },
  requiredError: {
    ar: "عمر جميع الحقول المطلوبة",
    en: "Fill all required fields",
    de: "Alle Pflichtfelder ausfüllen",
    es: "Completa todos los campos",
    it: "Compila tutti i campi obbligatori"
  },
  success: {
    ar: "تم إرسال طلبك!",
    en: "Order sent!",
    de: "Bestellung gesendet!",
    es: "¡Pedido enviado!",
    it: "Ordine inviato!"
  }
};

const trialLabels: Record<string, LocalizedText> = {
  title: {
    ar: "🎁 طلب تجربة مجانية",
    en: "🎁 Free Trial Request",
    de: "🎁 Gratis-Test anfordern",
    es: "🎁 Solicitar prueba gratis",
    it: "🎁 Richiedi prova gratuita"
  },
  name: orderLabels.name,
  phone: orderLabels.phone,
  device: orderLabels.device,
  message: {
    ar: "رسالة اختيارية",
    en: "Optional Message",
    de: "Optionale Nachricht",
    es: "Mensaje opcional",
    it: "Messaggio opzionale"
  },
  submit: {
    ar: "إرسال",
    en: "Submit",
    de: "Senden",
    es: "Enviar",
    it: "Invia"
  },
  requiredError: {
    ar: "عمر الاسم ورقم واتساب",
    en: "Fill name and WhatsApp",
    de: "Name und WhatsApp ausfüllen",
    es: "Completa nombre y WhatsApp",
    it: "Inserisci nome e WhatsApp"
  },
  success: {
    ar: "تم إرسال طلب التجربة!",
    en: "Trial request sent!",
    de: "Testanfrage gesendet!",
    es: "¡Solicitud de prueba enviada!",
    it: "Richiesta di prova inviata!"
  }
};

export function orderModalText(key: keyof typeof orderLabels, locale: Locale): string {
  return t(orderLabels[key], locale);
}

export function trialModalText(key: keyof typeof trialLabels, locale: Locale): string {
  return t(trialLabels[key], locale);
}
