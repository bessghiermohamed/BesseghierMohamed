import {
  BookOpen,
  PenTool,
  Calculator,
  Atom,
  FlaskConical,
  Languages,
  Moon,
  Cpu,
  Type,
  SpellCheck,
  BookMarked,
  Tv,
  MessageSquareQuote,
  Palette,
  Mic,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Subject {
  id: string
  name: string
  icon: LucideIcon
  color: string
  semester: 1 | 2
  description: string
}

export const subjects: Subject[] = [
  // السداسي الأول
  {
    id: "adab-arabi-1",
    name: "أدب عربي",
    icon: BookOpen,
    color: "emerald",
    semester: 1,
    description: "دراسة الأدب العربي وشعره ونثره عبر العصور المختلفة",
  },
  {
    id: "sarf",
    name: "صرف",
    icon: PenTool,
    color: "teal",
    semester: 1,
    description: "علم الصرف ودراسة بنية الكلمات وتصريفاتها في اللغة العربية",
  },
  {
    id: "riyadiyat-1",
    name: "رياضيات",
    icon: Calculator,
    color: "amber",
    semester: 1,
    description: "الرياضيات الأساسية والجبر والهندسة التحليلية",
  },
  {
    id: "fizya-1",
    name: "فيزياء",
    icon: Atom,
    color: "orange",
    semester: 1,
    description: "أساسيات الفيزياء والميكانيكا والحرارة والكهرباء",
  },
  {
    id: "kimiya-1",
    name: "كيمياء",
    icon: FlaskConical,
    color: "rose",
    semester: 1,
    description: "أساسيات الكيمياء العضوية وغير العضوية والتفاعلات الكيميائية",
  },
  {
    id: "ingliziya-1",
    name: "إنجليزية",
    icon: Languages,
    color: "sky",
    semester: 1,
    description: "تعلم اللغة الإنجليزية وقواعدها ومهارات القراءة والكتابة",
  },
  {
    id: "islamiya",
    name: "إسلامية",
    icon: Moon,
    color: "violet",
    semester: 1,
    description: "التربية الإسلامية والفقه والعقيدة والأخلاق",
  },
  {
    id: "tiknulujiya",
    name: "تكنولوجيا",
    icon: Cpu,
    color: "slate",
    semester: 1,
    description: "أساسيات التكنولوجيا والحاسوب والبرمجة",
  },
  {
    id: "fanniyat-al-kitaba",
    name: "فنيات الكتابة",
    icon: Type,
    color: "lime",
    semester: 1,
    description: "فنون الكتابة ومهارات التعبير الكتابي والإبداع الأدبي",
  },
  {
    id: "imla",
    name: "إملاء",
    icon: SpellCheck,
    color: "cyan",
    semester: 1,
    description: "قواعد الإملاء والكتابة الصحيحة في اللغة العربية",
  },

  // السداسي الثاني
  {
    id: "adab-arabi-2",
    name: "أدب عربي 2",
    icon: BookOpen,
    color: "emerald",
    semester: 2,
    description: "تكملة دراسة الأدب العربي وتحليل النصوص الأدبية المتقدمة",
  },
  {
    id: "nahw",
    name: "نحو",
    icon: BookMarked,
    color: "teal",
    semester: 2,
    description: "علم النحو وقواعد الإعراب والجملة العربية",
  },
  {
    id: "riyadiyat-2",
    name: "رياضيات 2",
    icon: Calculator,
    color: "amber",
    semester: 2,
    description: "تكملة الرياضيات المتقدمة وحساب المثلثات والتفاضل",
  },
  {
    id: "fizya-2",
    name: "فيزياء 2",
    icon: Atom,
    color: "orange",
    semester: 2,
    description: "تكملة الفيزياء المتقدمة والبصريات والذرة",
  },
  {
    id: "kimiya-2",
    name: "كيمياء 2",
    icon: FlaskConical,
    color: "rose",
    semester: 2,
    description: "تكملة الكيمياء المتقدمة والتفاعلات الكيميائية المعقدة",
  },
  {
    id: "ingliziya-2",
    name: "إنجليزية 2",
    icon: Languages,
    color: "sky",
    semester: 2,
    description: "تكملة تعلم اللغة الإنجليزية المتقدمة ومهارات المحادثة",
  },
  {
    id: "ingliziya-oral-2",
    name: "إنجليزية شفهية 2",
    icon: Mic,
    color: "indigo",
    semester: 2,
    description: "اللغة الإنجليزية الشفهية وتطوير مهارات الاستماع والتحدث والمحادثة",
  },
  {
    id: "ilam",
    name: "إعلام",
    icon: Tv,
    color: "pink",
    semester: 2,
    description: "علوم الإعلام والاتصال ووسائل الإعلام المختلفة",
  },
  {
    id: "balagha",
    name: "بلاغة",
    icon: MessageSquareQuote,
    color: "yellow",
    semester: 2,
    description: "علم البلاغة والبيان والمعاني والبديع في اللغة العربية",
  },
  {
    id: "khat-arabi",
    name: "خط العربي",
    icon: Palette,
    color: "fuchsia",
    semester: 2,
    description: "فن الخط العربي وأنواعه ومهارات الكتابة الخطية الجميلة",
  },
]

export function getSubjectsBySemester(semester: 1 | 2): Subject[] {
  return subjects.filter((s) => s.semester === semester)
}

export type ResourceType = "ملخص" | "تمرين" | "درس" | "فيديو"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  subjectId: string
  description: string
  url: string
  createdAt: string
}

// بيانات الموارد التجريبية
export const sampleResources: Resource[] = [
  // السداسي الأول
  {
    id: "r1",
    title: "ملخص شامل للأدب الجاهلي",
    type: "ملخص",
    subjectId: "adab-arabi-1",
    description: "ملخص مفصل يغطي أهم موضوعات الأدب الجاهلي",
    url: "",
    createdAt: "2024-01-15",
  },
  {
    id: "r2",
    title: "تمارين في الصرف الثلاثي",
    type: "تمرين",
    subjectId: "sarf",
    description: "مجموعة تمارين تطبيقية على المجرد الثلاثي والرباعي",
    url: "",
    createdAt: "2024-01-20",
  },
  {
    id: "r3",
    title: "شرح المعادلات الخطية",
    type: "فيديو",
    subjectId: "riyadiyat-1",
    description: "فيديو تعليمي لشرح حل المعادلات الخطية",
    url: "",
    createdAt: "2024-02-01",
  },
  {
    id: "r4",
    title: "درس قوانين نيوتن",
    type: "درس",
    subjectId: "fizya-1",
    description: "شرح مفصل لقوانين نيوتن الثلاثة مع أمثلة",
    url: "",
    createdAt: "2024-02-10",
  },
  {
    id: "r5",
    title: "ملخص الجدول الدوري",
    type: "ملخص",
    subjectId: "kimiya-1",
    description: "ملخص العناصر والجدول الدوري وخصائصها",
    url: "",
    createdAt: "2024-02-15",
  },
  {
    id: "r6",
    title: "تمارين القواعد الإنجليزية",
    type: "تمرين",
    subjectId: "ingliziya-1",
    description: "تمارين تطبيقية على قواعد اللغة الإنجليزية الأساسية",
    url: "",
    createdAt: "2024-03-01",
  },
  // السداسي الثاني
  {
    id: "r7",
    title: "ملخص الأدب في العصر العباسي",
    type: "ملخص",
    subjectId: "adab-arabi-2",
    description: "ملخص شامل للأدب العربي في العصر العباسي",
    url: "",
    createdAt: "2024-03-10",
  },
  {
    id: "r8",
    title: "تمارين الإعراب والبناء",
    type: "تمرين",
    subjectId: "nahw",
    description: "تمارين تطبيقية على الإعراب والبناء في الجملة العربية",
    url: "",
    createdAt: "2024-03-15",
  },
  {
    id: "r9",
    title: "فيديو حساب المثلثات",
    type: "فيديو",
    subjectId: "riyadiyat-2",
    description: "شرح مرئي لحساب المثلثات والزوايا",
    url: "",
    createdAt: "2024-03-20",
  },
  {
    id: "r10",
    title: "درس البصريات والضوء",
    type: "درس",
    subjectId: "fizya-2",
    description: "شرح مفصل لقوانين البصريات والانعكاس والانكسار",
    url: "",
    createdAt: "2024-04-01",
  },
  {
    id: "r11",
    title: "ملخص التفاعلات الكيميائية المعقدة",
    type: "ملخص",
    subjectId: "kimiya-2",
    description: "ملخص التفاعلات الكيميائية المتقدمة والتوازن الكيميائي",
    url: "",
    createdAt: "2024-04-05",
  },
  {
    id: "r12",
    title: "تمارين المحادثة الإنجليزية",
    type: "تمرين",
    subjectId: "ingliziya-2",
    description: "تمارين المحادثة والتعبير باللغة الإنجليزية المتقدمة",
    url: "",
    createdAt: "2024-04-10",
  },
  {
    id: "r13",
    title: "تمارين الاستماع والتحدث",
    type: "تمرين",
    subjectId: "ingliziya-oral-2",
    description: "تمارين تطبيقية على مهارات الاستماع والتحدث بالإنجليزية",
    url: "",
    createdAt: "2024-04-12",
  },
  {
    id: "r14",
    title: "درس علوم الإعلام",
    type: "درس",
    subjectId: "ilam",
    description: "شرح مبادئ علوم الإعلام والاتصال الجماهيري",
    url: "",
    createdAt: "2024-04-15",
  },
  {
    id: "r15",
    title: "ملخص علم البلاغة",
    type: "ملخص",
    subjectId: "balagha",
    description: "ملخص شامل لعلم البلاغة: البيان والمعاني والبديع",
    url: "",
    createdAt: "2024-04-20",
  },
  {
    id: "r16",
    title: "فيديو فن الخط العربي",
    type: "فيديو",
    subjectId: "khat-arabi",
    description: "فيديو تعليمي لأساسيات الخط العربي وأنواعه",
    url: "",
    createdAt: "2024-04-25",
  },
]

export const resourceTypes: ResourceType[] = ["ملخص", "تمرين", "درس", "فيديو"]

export const resourceTypeLabels: Record<ResourceType, string> = {
  "ملخص": "ملخصات",
  "تمرين": "تمارين",
  "درس": "دروس",
  "فيديو": "فيديوهات",
}
