import { type NextRequest, NextResponse } from "next/server";

const PRODUCTS = {
  "sanad-align": {
    name: "سَنَد ألاين",
    desc: "مصحّح الوضعية — يدعم الكتفين والظهر العلوي بلطف",
    price: "249 د.م.",
    url: "/product/sanad-align",
    keywords: ["كتاف", "وضعية", "ظهر", "ظهري", "جلوس", "كمبيوتر", "هاتف", "ينحني", "طايحين", "علوي", "align", "posture"]
  },
  "sanad-heat": {
    name: "سَنَد هيت",
    desc: "وسادة الرقبة بالحرارة والاهتزاز — ترييح عميق",
    price: "299 د.م.",
    url: "/product/sanad-heat",
    keywords: ["رقبة", "رقبتي", "رأس", "حرارة", "مشدودة", "اهتزاز", "heat", "neck"]
  },
  "sanad-lumbo": {
    name: "سَنَد لومبو",
    desc: "حزام الظهر السفلي — ضغط داعم وثبات",
    price: "249 د.م.",
    url: "/product/sanad-lumbo",
    keywords: ["أسفل", "سياقة", "وقوف", "حزام", "lumbo", "خصر", "خاصرة"]
  }
};

const GENERIC_ANSWERS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["ثمن", "سعر", "prix", "price", "بزاف", "غالي"],
    answer: "**أسعار منتجات سَنَد:**\n• سَنَد ألاين — 249 د.م.\n• سَنَد هيت — 299 د.م.\n• سَنَد لومبو — 249 د.م.\n\nجميعها **بالدفع عند الاستلام** — لا بطاقة بنكية."
  },
  {
    keywords: ["توصيل", "livraison", "يوصل", "شحن", "كم يوم", "متى"],
    answer: "التوصيل داخل المغرب عادةً **2 إلى 4 أيام عمل**. نتاصلو بك بالهاتف قبل الإرسال لتأكيد الطلب والعنوان."
  },
  {
    keywords: ["كيف", "كيفاش", "طريقة", "استعمال"],
    answer: "كل منتج عندو **صفحة كاملة** فيها شرح الآلية، طريقة الاستعمال، وآراء العملاء. اختار المنتج وستجد كل التفاصيل."
  },
  {
    keywords: ["استرجاع", "إرجاع", "استبدال", "retour"],
    answer: "عندنا سياسة استبدال واضحة. إذا وصلك المنتج فيه مشكل، تواصل معنا وسنحل الأمر. التفاصيل في [سياسة الاستبدال](/policies/returns)."
  },
  {
    keywords: ["طبي", "علاج", "يشفي", "يعالج", "طبيب"],
    answer: "منتجات سَنَد مخصصة **للدعم والراحة اليومية** وليست بديلاً عن استشارة مختص. عند الألم القوي أو المستمر، ننصح بزيارة طبيب."
  }
];

function detectProduct(text: string): (typeof PRODUCTS)[keyof typeof PRODUCTS] | null {
  const lower = text.toLowerCase();
  for (const product of Object.values(PRODUCTS)) {
    if (product.keywords.some((kw) => lower.includes(kw))) return product;
  }
  return null;
}

function detectGenericAnswer(text: string): string | null {
  const lower = text.toLowerCase();
  for (const { keywords, answer } of GENERIC_ANSWERS) {
    if (keywords.some((kw) => lower.includes(kw))) return answer;
  }
  return null;
}

function buildRuleBasedResponse(message: string, history: Array<{ role: string; content: string }>): string {
  const lower = message.toLowerCase().trim();

  if (history.length <= 1 && (lower.match(/^(سلام|مرحبا|hello|hi|آهلا|صباح|مساء|bonjour)/) || lower.length < 8)) {
    return "السلام عليكم! 👋 أنا مساعد سَنَد الذكي.\n\nكيف نقدر نساعدك؟ قولي **شنو المنطقة اللي كتزعجك**:\n\n• 🧍 **كتاف / وضعية**\n• 🔥 **رقبة**\n• 💪 **أسفل الظهر**";
  }

  const generic = detectGenericAnswer(message);
  if (generic) return generic;

  const product = detectProduct(message);
  if (product) {
    return `بناءً على مشكلتك، **${product.name}** هو الحل الأنسب:\n\n📦 ${product.desc}\n💰 **${product.price}** — الدفع عند الاستلام\n\n👉 [شوف صفحة المنتج كاملة](${product.url})\n\nعندك سؤال آخر؟`;
  }

  if (lower.match(/كل|جميع|منتجات|all/)) {
    return "عندنا **3 منتجات**:\n\n🧍 [سَنَد ألاين](/product/sanad-align) — 249 د.م.\n🔥 [سَنَد هيت](/product/sanad-heat) — 299 د.م.\n💪 [سَنَد لومبو](/product/sanad-lumbo) — 249 د.م.\n\nقولي شنو مشكلتك وغادي نختار ليك الأنسب.";
  }

  return "مفهمتش مزيان 😅 قولي **شنو المنطقة اللي كتزعجك**:\n\n• **كتافي طايحين / وضعيتي مش مليحة**\n• **رقبتي مشدودة**\n• **أسفل ظهري كيتقل**";
}

async function getAIResponse(message: string, history: Array<{ role: string; content: string }>): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return buildRuleBasedResponse(message, history);

  const systemPrompt = `أنت مساعد ذكي لمتجر سَنَد، متجر مغربي للعناية بالجسم. تتحدث بالعربية الدارجة المغربية.
المنتجات: سَنَد ألاين (249 د.م.) وضعية وكتاف، سَنَد هيت (299 د.م.) رقبة، سَنَد لومبو (249 د.م.) أسفل الظهر.
الدفع عند الاستلام. لا أداء مسبق. جاوب بإيجاز ووجّه للصفحة المناسبة. لا توعد بنتائج طبية.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 400,
        messages: [
          { role: "system", content: systemPrompt },
          ...history.slice(-6),
          { role: "user", content: message }
        ]
      })
    });
    const data = (await res.json()) as { choices?: Array<{ message: { content: string } }> };
    return data.choices?.[0]?.message?.content ?? buildRuleBasedResponse(message, history);
  } catch {
    return buildRuleBasedResponse(message, history);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history: Array<{ role: string; content: string }>;
    };
    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }
    const reply = await getAIResponse(message, history ?? []);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
