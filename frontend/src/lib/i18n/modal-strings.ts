import { t, type Locale, type LocalizedText } from "./localized";

const orderLabels: Record<string, LocalizedText> = {
  title: { ar: "طلب اشتراك", en: "Subscription Order" },
  name: { ar: "الاسم الكامل", en: "Full Name" },
  phone: { ar: "رقم واتساب", en: "WhatsApp Number" },
  device: { ar: "نوع الجهاز", en: "Device Type" },
  plan: { ar: "مدة الاشتراك", en: "Subscription Duration" },
  notes: { ar: "ملاحظات (اختياري)", en: "Notes (optional)" },
  submit: { ar: "إرسال الطلب", en: "Submit Order" },
  requiredError: { ar: "عمر جميع الحقول المطلوبة", en: "Fill all required fields" },
  success: { ar: "تم إرسال طلبك!", en: "Order sent!" }
};

const trialLabels: Record<string, LocalizedText> = {
  title: { ar: "🎁 طلب تجربة مجانية", en: "🎁 Free Trial Request" },
  name: orderLabels.name,
  phone: orderLabels.phone,
  device: orderLabels.device,
  message: { ar: "رسالة اختيارية", en: "Optional Message" },
  submit: { ar: "إرسال", en: "Submit" },
  requiredError: { ar: "عمر الاسم ورقم واتساب", en: "Fill name and WhatsApp" },
  success: { ar: "تم إرسال طلب التجربة!", en: "Trial request sent!" }
};

export function orderModalText(key: keyof typeof orderLabels, locale: Locale): string {
  return t(orderLabels[key], locale);
}

export function trialModalText(key: keyof typeof trialLabels, locale: Locale): string {
  return t(trialLabels[key], locale);
}
