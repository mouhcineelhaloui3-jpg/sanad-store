"use client";

import { useEffect, useRef, useState } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Bot, Lightbulb, Loader2, Send, Sparkles, TrendingUp, Zap } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string; id: string };

const CRO_INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-emerald-600 bg-emerald-50",
    title: "COD Conversion Rule #1",
    body: "المتاجر الـCOD اللي كيتاصلو مع العميل خلال أقل من 2 ساعة كيحققو معدل تأكيد أعلى بـ40%. تأكد من سرعة الرد على الطلبات."
  },
  {
    icon: Zap,
    color: "text-amber-600 bg-amber-50",
    title: "Upsell Timing",
    body: "الـupsell بعد تثبيت الطلب (مش قبل) كيعطي معدل قبول أعلى بـ3x. سَنَد عنده هاد النظام مطبّق بشكل صحيح ✓"
  },
  {
    icon: Lightbulb,
    color: "text-blue-600 bg-blue-50",
    title: "Cart Abandonment",
    body: "63% من الزوار اللي يضيفو للسلة ما يكملوش الشراء. ننصح بإضافة SMS reminder بعد 24 ساعة لأرقام التي سجّلت معلوماتها."
  },
  {
    icon: Sparkles,
    color: "text-purple-600 bg-purple-50",
    title: "Product Page Depth",
    body: "صفحات المنتجات اللي فيها +500 كلمة ومراجعات حقيقية كيحولو بـ2.5x أحسن من صفحات قصيرة. صفحات سَنَد كاملة ✓"
  }
];

const PRODUCT_AI_INSIGHTS = [
  { name: "سَنَد ألاين", score: 87, tip: "منتج high-intent — زوار صفحته كيقضيو وقت أطول. ننصح بزيادة الـsocial proof." },
  { name: "سَنَد هيت", score: 91, tip: "أعلى conversion rate — ثمنه أعلى لكن العميل كيفهم القيمة. priority في الإعلانات." },
  { name: "سَنَد لومبو", score: 74, tip: "محتاج تعزيز الـtrust — إضافة مراجعات فيديو أو صور العملاء ستحسّن الأداء." }
];

const WELCOME_MSG = `مرحباً! أنا مساعدك الذكي لتحليل متجر سَنَد.

يمكنني مساعدتك في:
• **تحليل أداء المنتجات**
• **نصائح تحسين التحويل (CRO)**
• **استراتيجية الإعلانات للـCOD**
• **تحسين صفحات المنتجات**

اسألني أي شيء عن المتجر.`;

function parseMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

function adminRuleBased(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("تحويل") || lower.includes("conversion"))
    return "لزيادة معدل التحويل في متجر COD:\n\n**1. سرعة الرد** — تاصل مع العميل خلال ساعتين\n**2. Trust signals** — الدفع عند الاستلام + تأكيد هاتفي\n**3. Product pages** — شرح الآلية + مراجعات + FAQ\n**4. Upsell بعد الطلب** — مش قبله\n\nمتجر سَنَد عنده كل هذا ✓ الخطوة التالية: A/B test على الـhero copy.";
  if (lower.includes("إعلان") || lower.includes("ad") || lower.includes("tiktok"))
    return "**استراتيجية إعلانات COD المغربي:**\n\n• **TikTok Ads** — أرخص CPC للجمهور المغربي 18-35\n• **Facebook/Meta** — أفضل لـretargeting\n• **Video hooks** — أول 3 ثواني تظهر المشكل مباشرة\n• **اللغة** — الدارجة المغربية تحقق CTR أعلى من الفصحى\n• **Landing page** — وجّه مباشرة لصفحة المنتج مش الهوم";
  if (lower.includes("return") || lower.includes("إرجاع"))
    return "لتقليل معدل الإرجاع في COD:\n\n**1. تأكيد هاتفي قبل الإرسال** — يقلل الإرجاع بـ60%\n**2. صور واقعية** — توقعات صحيحة = رضا أكثر\n**3. تعليمات الاستخدام** — ارسلها مع المنتج\n**4. متابعة بعد الاستلام** — رسالة واتساب بعد 3 أيام";
  if (lower.includes("upsell"))
    return "**Upsell Strategy للـCOD:**\n\nالوقت المثالي: **بعد تأكيد الطلب مباشرة**\n\n• اعرض منتج واحد فقط\n• خصم 15-20% من السعر الأصلي\n• Timer countdown يضيف urgency\n• نص: \"قبل ما نرسل طلبك، عندك فرصة...\"\n\nسَنَد عنده هاد النظام مطبّق ✓";
  return "سؤال مثير للاهتمام! بناءً على بيانات متاجر COD المغربية:\n\nأنصحك بالتركيز على **سرعة التأكيد الهاتفي** و**صفحات منتجات عميقة** كأولوية أولى. هذان العاملان يؤثران أكثر من غيرهما على معدل التحويل في السوق المغربي.\n\nهل تريد تفاصيل حول نقطة معينة؟";
}

const QUICK_QUESTIONS = [
  "كيف نزيد معدل التحويل؟",
  "أفضل وقت للإعلانات؟",
  "كيف نقلل الـreturn rate؟",
  "نصائح للـupsell بعد الطلب"
];

export default function AdminAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: WELCOME_MSG }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history })
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: data.reply ?? adminRuleBased(text) }]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: adminRuleBased(text) }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      <AdminPageHeader
        title="AI Store Intelligence"
        description="Insights, CRO tips, and AI assistant powered by store data."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CRO_INSIGHTS.map(({ icon: Icon, color, title, body }) => (
          <div key={title} className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-black">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <AdminCard title="Product Conversion Score">
          <div className="space-y-4">
            {PRODUCT_AI_INSIGHTS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-black">{p.name}</span>
                  <span className={`text-lg font-black ${p.score >= 85 ? "text-emerald-600" : p.score >= 75 ? "text-amber-600" : "text-red-500"}`}>
                    {p.score}/100
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-2 rounded-full ${p.score >= 85 ? "bg-emerald-500" : p.score >= 75 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${p.score}%` }}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{p.tip}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="AI Store Advisor">
          <div className="flex h-[28rem] flex-col" dir="rtl">
            <div className="flex-1 space-y-3 overflow-y-auto py-2 pr-1">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  {msg.role === "assistant" ? (
                    <div className="flex max-w-[80%] items-start gap-2">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sand-100">
                        <Bot className="h-3.5 w-3.5 text-sand-700" />
                      </div>
                      <div
                        className="rounded-[1rem] rounded-tr-sm bg-slate-50 px-4 py-3 text-sm leading-6 dark:bg-slate-800"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                      />
                    </div>
                  ) : (
                    <div className="max-w-[80%] rounded-[1rem] rounded-tl-sm bg-sand-900 px-4 py-3 text-sm leading-6 text-white">
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              {loading ? (
                <div className="flex justify-end">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    <span className="text-xs text-slate-400">يفكر...</span>
                  </div>
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 ? (
              <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => void send(q)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل عن المتجر، المبيعات، الإعلانات..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-sand-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand-900 text-white transition hover:bg-sand-950 disabled:opacity-40"
                aria-label="إرسال"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
