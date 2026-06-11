export type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type HowToStep = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortName: string;
  type: string;
  problem: string;
  price: number;
  upsellPrice: number;
  currency: "MAD";
  mechanism: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  painTitle: string;
  painCopy: string;
  painPoints: string[];
  mechanismTitle: string;
  mechanismCopy: string;
  benefits: Benefit[];
  materials: string[];
  howToUse: HowToStep[];
  useCases: string[];
  reviews: Review[];
  faqs: Faq[];
  ratingValue: number;
  ratingCount: number;
  imagePrompt: string;
  imageAlt: string;
  questionsToAnswer: string[];
  crossSellPriority: string[];
};

export const products: Product[] = [
  {
    id: "sanad-align",
    slug: "sanad-align",
    nameAr: "سَنَد ألاين — دعم الوضعية والكتاف",
    nameEn: "Sanad Align",
    shortName: "سَنَد ألاين",
    type: "مصحّح وضعية قابل للتعديل",
    problem: "كتاف طايحين / جلوس طويل / وضعية متعبة",
    price: 249,
    upsellPrice: 199,
    currency: "MAD",
    mechanism: "دعم تدريجي قابل للتعديل",
    headline: "إلى كتسالي نهارك وكتافك طايحين وظهرك شاد، خاصك دعم يذكّرك بجسمك قبل ما يزيد العيا.",
    subheadline:
      "مصحّح وضعية عملي للناس اللي كيجلسو بزاف، كيتعاملو مع الكمبيوتر والهاتف، أو كيحسو الظهر والكتاف محتاجين دعم يومي.",
    bullets: [
      "يعطي دعم للكتاف والظهر العلوي بلا ما يكون قاسح",
      "مناسب للناس اللي كيجلسو بزاف أو وضعيتهم كتتعب بسرعة",
      "قابل للتعديل حسب الجسم والإحساس بالراحة",
      "طلب بسيط بالدفع عند الاستلام وتأكيد هاتفي قبل الإرسال"
    ],
    painTitle: "واش كتلقى راسك منحنٍ قدّام الكمبيوتر ولا الهاتف؟",
    painCopy:
      "سَنَد ألاين موجه للناس اللي كيبغيو دعم يومي للوضعية والكتاف. ما كنبيعوش وعد طبي؛ كنبيعو منتج كيعاونك تكون واعي بجسمك ويحسسك بدعم أكثر فالأيام الطويلة.",
    painPoints: [
      "كتافك كيطياحو فآخر النهار",
      "كتنسى وضعية الجلوس الصحيحة ملي كتخدم أو كتقرا",
      "كتحس الظهر العلوي محتاج دعم",
      "باغي حل بسيط يعاونك فاليوم بلا تعقيد"
    ],
    mechanismTitle: "كيفاش كيخدم دعم الوضعية؟",
    mechanismCopy:
      "الفكرة بسيطة: أشرطة قابلة للتعديل كتخليك تحس بشد خفيف ومنظم فالكتاف. إذا كان الشد قوي، كتخففو. إذا ما حسيتيش بدعم، كتزيدو شوية حتى توصل لراحة مناسبة.",
    benefits: [
      { title: "وعي بالوضعية", description: "كيذكّرك بوضعية الظهر والكتاف خلال النهار." },
      { title: "دعم قابل للتعديل", description: "كتتحكم فالشد حسب جسمك وراحتك." },
      { title: "مناسب للأيام الطويلة", description: "للخدمة، الدراسة، الهاتف، أو الجلوس الطويل." },
      { title: "وضوح وأمان", description: "إذا عندك ألم قوي أو حالة طبية، استشر مختص قبل الاستعمال." }
    ],
    materials: [
      "أشرطة قابلة للتعديل",
      "دعم موجه للكتاف والظهر العلوي",
      "تصميم خفيف للاستعمال اليومي",
      "تفاصيل المقاس كتقدر تضيفها من الأدمين"
    ],
    howToUse: [
      { title: "لبسو بحال backpack", description: "دخّل الذراعين فالأشرطة وخليه مستقر فوق الكتاف." },
      { title: "عدّل الشد", description: "خليه مريح: كتحس بالدعم بلا ألم ولا ضغط قوي." },
      { title: "جرّبو تدريجياً", description: "استعملو مدة قصيرة فالأول وشوف واش مناسب لك." }
    ],
    useCases: [
      "الخدمة أمام الكمبيوتر",
      "الدراسة أو القراءة",
      "استعمال الهاتف لمدة طويلة",
      "الأيام اللي كتحتاج فيها تذكير بالوضعية"
    ],
    reviews: [],
    faqs: [
      { question: "واش هذا علاج طبي؟", answer: "لا. هو منتج دعم وراحة يومية فقط. إذا عندك ألم قوي أو مستمر، استشر مختص." },
      { question: "واش نقدر نلبسو تحت الملابس؟", answer: "يمكن مع ملابس واسعة، وتقدر تضيف صور طريقة اللبس من الأدمين منين تكون جاهزة." },
      { question: "واش كيناسبني؟", answer: "إذا مشكلتك الأساسية كتاف طايحين وجلوس طويل، فهو أول خيار تشوفو. إذا المشكل رقبة أو أسفل الظهر، شوف المنتجات الأخرى." },
      { question: "كيفاش نطلب؟", answer: "أضفه للسلة، دخل الاسم ورقم الهاتف، وفريق سَنَد يتاصل بك لتأكيد الطلب قبل الإرسال." }
    ],
    ratingValue: 0,
    ratingCount: 0,
    imagePrompt:
      "Premium Moroccan DTC ecommerce product image for an adjustable posture corrector, warm beige background, product worn subtly over a neutral t-shirt, close-up strap details, no medical claims, natural soft light, luxury wellness style.",
    imageAlt: "سَنَد ألاين يظهر طريقة اللبس وتفاصيل الأشرطة",
    questionsToAnswer: [
      "شنو المقاسات المتوفرة فعلاً؟",
      "واش المنتج يتلبس تحت الملابس ولا فوقها؟",
      "شنو مدة الاستعمال الموصى بها من المورد؟",
      "واش كاين لون واحد أو ألوان متعددة؟"
    ],
    crossSellPriority: ["sanad-heat", "sanad-lumbo"]
  },
  {
    id: "sanad-heat",
    slug: "sanad-heat",
    nameAr: "سَنَد هيت — راحة الرقبة بالحرارة والاهتزاز",
    nameEn: "Sanad Heat",
    shortName: "سَنَد هيت",
    type: "وسادة رقبة بالحرارة والاهتزاز",
    problem: "رقبة مشدودة / توتر / نهاية يوم طويل",
    price: 299,
    upsellPrice: 249,
    currency: "MAD",
    mechanism: "حرارة لطيفة + اهتزاز مريح",
    headline: "إلى رقبتك كتشد من الهاتف، الخدمة، أو السياقة، عطِها لحظة دفء وراحة.",
    subheadline:
      "وسادة رقبة عملية كتجمع بين حرارة لطيفة واهتزاز مريح باش تساعدك تدخل فجو ديال الاسترخاء بعد نهار طويل.",
    bullets: [
      "حرارة لطيفة لإحساس بالراحة",
      "اهتزاز مريح حول الرقبة والكتاف",
      "مناسبة للدار، المكتب، أو بعد السياقة",
      "طلب بالدفع عند الاستلام وتأكيد قبل الإرسال"
    ],
    painTitle: "واش كتسالي الخدمة ورقبتك باقي شادّة عليك؟",
    painCopy:
      "الرقبة كتتحمل بزاف: هاتف، كمبيوتر، سياقة، وتوتر. سَنَد هيت ماشي بديل للطبيب، ولكنه كيعاونك تخلق لحظة راحة دافئة ومريحة فدارك.",
    painPoints: [
      "رقبة مشدودة بعد الهاتف أو الكمبيوتر",
      "توتر كيمشي للكتاف وأعلى الظهر",
      "باغي دفء واهتزاز بلا تعقيد",
      "كتقلب على راحة يومية فدارك"
    ],
    mechanismTitle: "كيفاش كتخدم حرارة واهتزاز الرقبة؟",
    mechanismCopy:
      "كتحط الوسادة حول الرقبة، كتختار الوضع اللي كيريحك، وكتخلي الحرارة اللطيفة والاهتزاز يعطيوك إحساس بالاسترخاء. إذا عندك حالة طبية أو حساسية للحرارة، استشر مختص.",
    benefits: [
      { title: "دفء مريح", description: "إحساس حرارة لطيفة يساعدك تدخل فجو ديال راحة." },
      { title: "اهتزاز خفيف", description: "مناسب للرقبة والكتاف بعد يوم طويل." },
      { title: "استعمال سهل", description: "فالدار أو المكتب بلا تجهيزات كثيرة." },
      { title: "مناسب كهدية", description: "اختيار مفهوم لأي شخص كيعاني من شد الرقبة اليومي." }
    ],
    materials: [
      "وسادة U للرقبة",
      "وضع حرارة لطيفة",
      "وضع اهتزاز",
      "تفاصيل الشحن/البطارية ستتأكد من المورد قبل النشر النهائي"
    ],
    howToUse: [
      { title: "حطّو حول الرقبة", description: "جلس مرتاح وخليه ثابت بلا ضغط." },
      { title: "اختار الوضع", description: "شعل الحرارة أو الاهتزاز حسب الإحساس اللي كيريحك." },
      { title: "استعملو بوعي", description: "ما تستعملوش أثناء النوم، ووقف الاستعمال إذا حسّيتي بانزعاج." }
    ],
    useCases: [
      "بعد الخدمة",
      "بعد السياقة",
      "وقت الراحة فالدار",
      "كهدية عملية"
    ],
    reviews: [],
    faqs: [
      { question: "واش الحرارة علاجية؟", answer: "لا. الحرارة لطيفة وموجهة للراحة اليومية، وليست علاجاً طبياً." },
      { question: "واش يتستعمل كل يوم؟", answer: "يمكن استعماله باعتدال حسب تعليمات المورد. لا تستعمله أثناء النوم." },
      { question: "واش كيتشحن؟", answer: "تفاصيل الشحن النهائية خاصها تتأكد من المورد وتتحط فالأدمين قبل الإطلاق." },
      { question: "كيفاش نعرف واش يناسبني؟", answer: "إذا مشكلتك الرئيسية رقبة مشدودة ونهاية يوم طويل، هذا المنتج هو المرشح الأول." }
    ],
    ratingValue: 0,
    ratingCount: 0,
    imagePrompt:
      "Premium ecommerce lifestyle image of a U-shaped heated neck massager on a Moroccan living room sofa, warm sand and sage color palette, person relaxing after work, close-up of soft fabric and control button, no medical visuals, high-end DTC wellness style.",
    imageAlt: "سَنَد هيت يظهر استعمال وسادة الرقبة فالدار",
    questionsToAnswer: [
      "واش المنتج rechargeable ولا USB مباشر؟",
      "شنو مدة الشحن والاستعمال؟",
      "واش الحرارة عندها مستويات متعددة؟",
      "شنو محتويات العلبة بالضبط؟"
    ],
    crossSellPriority: ["sanad-lumbo", "sanad-align"]
  },
  {
    id: "sanad-lumbo",
    slug: "sanad-lumbo",
    nameAr: "سَنَد لومبو — دعم أسفل الظهر",
    nameEn: "Sanad Lumbo",
    shortName: "سَنَد لومبو",
    type: "حزام دعم أسفل الظهر",
    problem: "أسفل الظهر / سياقة / وقوف طويل",
    price: 249,
    upsellPrice: 199,
    currency: "MAD",
    mechanism: "ضغط داعم قابل للتعديل",
    headline: "إلى أسفل ظهرك كيتقل مع الوقوف أو السياقة، خاصك دعم يخليك تحس بثبات أكثر.",
    subheadline:
      "حزام دعم يومي حول أسفل الظهر، مناسب للأيام اللي فيها جلوس طويل، سياقة، وقوف، أو حركة كثيرة.",
    bullets: [
      "دعم لمنطقة أسفل الظهر",
      "ضغط قابل للتعديل حسب الراحة",
      "مناسب للسياقة، الوقوف، وشغل الدار",
      "طلب بسيط بالاسم والهاتف والدفع عند الاستلام"
    ],
    painTitle: "واش أسفل ظهرك كيتقل ملي كتوقف ولا كتسوق بزاف؟",
    painCopy:
      "سَنَد لومبو معمول للناس اللي كيبغيو دعم إضافي فالأيام الطويلة. ماشي علاج للديسك ولا بديل للطبيب، ولكن حزام عملي يعطيك إحساس بالثبات فالحركة اليومية.",
    painPoints: [
      "كتسوق أو كتوقف مدة طويلة",
      "كتحس أسفل الظهر محتاج دعم",
      "باغي ضغط قابل للتعديل ماشي قاسح",
      "كتقلب على حل تلبسو وتخلعو بسهولة"
    ],
    mechanismTitle: "كيفاش كيخدم دعم أسفل الظهر؟",
    mechanismCopy:
      "الفكرة هي ضغط داعم حول أسفل الظهر. كتشد الحزام حسب الراحة ديالك. إذا كان عندك ألم قوي، تنميل، أو تشخيص طبي، خاص تستاشر مختص قبل الاستعمال.",
    benefits: [
      { title: "ثبات أكثر", description: "كيعطي إحساس بالدعم خلال الحركة اليومية." },
      { title: "ضغط تتحكم فيه", description: "تقدر تزيد أو تنقص الشد حسب جسمك." },
      { title: "للأيام الطويلة", description: "مناسب للسياقة، الوقوف، أو أشغال الدار." },
      { title: "قرار بلا غموض", description: "نوضح متى يناسبك ومتى خاصك تسول مختص." }
    ],
    materials: [
      "حزام دعم قابل للتعديل",
      "أشرطة شد جانبية",
      "نسيج مرن ومريح",
      "تفاصيل المقاس والقياسات ستضاف بعد تأكيد المورد"
    ],
    howToUse: [
      { title: "حطّو على أسفل الظهر", description: "ثبت الحزام حول الوسط وخليه متمركز." },
      { title: "عدّل الضغط", description: "شدّ غير بالقدر اللي كيعطيك دعم مريح." },
      { title: "استعملو فالأوقات المناسبة", description: "السياقة، الوقوف، أو المهام اللي كتحتاج دعم إضافي." }
    ],
    useCases: [
      "سياقة طويلة",
      "الوقوف فالخدمة",
      "شغل الدار",
      "نهار فيه حركة كثيرة"
    ],
    reviews: [],
    faqs: [
      { question: "واش هذا بديل للطبيب؟", answer: "لا. هو منتج دعم وراحة يومية. عند الألم القوي أو المستمر، استشر مختص." },
      { question: "واش مناسب للرجال والنساء؟", answer: "غالباً نعم إذا كان المقاس مناسباً، لكن القياسات النهائية خاصها تدخل من الأدمين بعد تأكيد المورد." },
      { question: "واش نلبسو نهار كامل؟", answer: "الأفضل استعماله عند الحاجة وباعتدال، حسب راحتك وتعليمات المورد." },
      { question: "كيفاش يجي مع سَنَد هيت؟", answer: "لومبو لأسفل الظهر، وهيت للرقبة. إذا عندك الاثنين، ممكن يكملو بعضهم كروتين راحة." }
    ],
    ratingValue: 0,
    ratingCount: 0,
    imagePrompt:
      "Premium ecommerce product image of an adjustable lower back support belt worn over neutral clothing, Moroccan modern home/work setting, close-up compression straps, warm beige background, no medical claims, professional DTC wellness photography.",
    imageAlt: "سَنَد لومبو يظهر الحزام وطريقة اللبس",
    questionsToAnswer: [
      "شنو محيط الخصر المناسب؟",
      "واش كاين مقاسات متعددة؟",
      "واش كيبان تحت الملابس؟",
      "شنو تعليمات المورد لمدة الاستعمال؟"
    ],
    crossSellPriority: ["sanad-heat", "sanad-align"]
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCrossSells(product: Product) {
  return product.crossSellPriority
    .map((id) => products.find((item) => item.id === id))
    .filter((item): item is Product => Boolean(item));
}

export function formatPrice(price: number) {
  return `${price} د.م.`;
}
