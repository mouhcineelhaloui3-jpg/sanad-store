import type { LucideIcon } from "lucide-react";
import { BookOpen, Film, HelpCircle, Mail, Radio, Smartphone } from "lucide-react";
import type { LocalizedText } from "@/lib/i18n/localized";

export type NavItem = {
  label: LocalizedText;
  href: string;
};

export type NavMoreItem = NavItem & {
  description: LocalizedText;
  icon: LucideIcon;
};

export const primaryNavLinks: NavItem[] = [
  { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
  { label: { ar: "الأسعار", en: "Pricing" }, href: "/pricing" },
  { label: { ar: "الدعم", en: "Support" }, href: "/contact" }
];

export const moreNavLinks: NavMoreItem[] = [
  {
    label: { ar: "القنوات", en: "Channels" },
    href: "/#sports",
    description: {
      ar: "+115,000 قناة مباشرة — رياضة، عربي، وعالمي",
      en: "115,000+ live channels — sports, Arabic & global"
    },
    icon: Radio
  },
  {
    label: { ar: "أفلام ومسلسلات", en: "Movies & Series" },
    href: "/#movies",
    description: {
      ar: "120,000+ VOD — أفلام ومسلسلات محدّثة",
      en: "120,000+ VOD — fresh movies & series"
    },
    icon: Film
  },
  {
    label: { ar: "الأجهزة", en: "Devices" },
    href: "/#devices",
    description: {
      ar: "Smart TV، Android، Fire Stick، PC",
      en: "Smart TV, Android, Fire Stick, PC"
    },
    icon: Smartphone
  },
  {
    label: { ar: "FAQ", en: "FAQ" },
    href: "/#faq",
    description: {
      ar: "إجابات سريعة على الأسئلة الشائعة",
      en: "Quick answers to common questions"
    },
    icon: HelpCircle
  },
  {
    label: { ar: "اتصل بنا", en: "Contact" },
    href: "/contact",
    description: {
      ar: "واتساب، بريد، وتيليغرام — دعم 24/7",
      en: "WhatsApp, email & Telegram — 24/7 support"
    },
    icon: Mail
  },
  {
    label: { ar: "المدونة", en: "Blog" },
    href: "/blog",
    description: {
      ar: "أدلة IPTV، نصائح، واستكشاف الأخطاء",
      en: "IPTV guides, tips & troubleshooting"
    },
    icon: BookOpen
  }
];

export const moreMenuLabel: LocalizedText = { ar: "المزيد", en: "More" };
