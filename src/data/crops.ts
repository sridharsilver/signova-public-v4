import deficiencyImg from "@/assets/deficiency-placeholder.jpg";
import cashewImg from "@/assets/images/crops/cashew.png";
import chilliImg from "@/assets/images/crops/chilli.png";
import citrusImg from "@/assets/images/crops/citrus.png";
import cottonImg from "@/assets/images/crops/cotton.png";
import mangoImg from "@/assets/images/crops/mango.png";
import paddyImg from "@/assets/images/crops/paddy.png";
import tomatoImg from "@/assets/images/crops/tomato.png";
import watermelonImg from "@/assets/images/crops/watermelon.png";

export type Crop = {
  slug: string;
  name: string;
  emoji: string;
  note: string;
  c: string;
  nameTe: string;
  noteTe: string;
  image: string;
};

export const crops: Crop[] = [
  { 
    slug: "cashew", 
    name: "Cashew", 
    emoji: "🌰", 
    note: "Nut size, kernel weight", 
    c: "from-amber-500/30 to-stone-400/20",
    nameTe: "జీడిమామిడి",
    noteTe: "గింజ పరిమాణం, పప్పు బరువు",
    image: cashewImg
  },
  { 
    slug: "chilli", 
    name: "Chilli", 
    emoji: "🌶️", 
    note: "Colour, pungency, fruit set", 
    c: "from-red-500/30 to-orange-500/20",
    nameTe: "మిరప",
    noteTe: "రంగు, కాయ కట్టడం, ఘాటు",
    image: chilliImg
  },
  { 
    slug: "citrus", 
    name: "Citrus", 
    emoji: "🍊", 
    note: "Brix, juice quality", 
    c: "from-orange-400/30 to-yellow-400/20",
    nameTe: "నిమ్మ జాతి పంటలు",
    noteTe: "తీపి (బ్రిక్స్), రసం నాణ్యత",
    image: citrusImg
  },
  { 
    slug: "cotton", 
    name: "Cotton", 
    emoji: "🌿", 
    note: "Boll weight, lint quality", 
    c: "from-emerald-400/30 to-teal-500/20",
    nameTe: "పత్తి",
    noteTe: "కాయ బరువు, దూది నాణ్యత",
    image: cottonImg
  },
  { 
    slug: "mango", 
    name: "Mango", 
    emoji: "🥭", 
    note: "Flowering, fruit retention", 
    c: "from-yellow-400/30 to-orange-400/20",
    nameTe: "మామిడి",
    noteTe: "పూత పూయడం, పిందె నిలవడం",
    image: mangoImg
  },
  { 
    slug: "paddy", 
    name: "Paddy", 
    emoji: "🌾", 
    note: "Tillering, grain filling, yield", 
    c: "from-amber-400/30 to-lime/20",
    nameTe: "వరి",
    noteTe: "పిలకలు వేయడం, గింజ గట్టిపడడం, గరిష్ట దిగుబడి",
    image: paddyImg
  },
  { 
    slug: "tomato", 
    name: "Tomato", 
    emoji: "🍅", 
    note: "Fruit setting, shelf life", 
    c: "from-red-400/30 to-rose-400/20",
    nameTe: "టమోటా",
    noteTe: "కాయ కుళ్లుడు, నిల్వ సామర్థ్యం",
    image: tomatoImg
  },
  { 
    slug: "watermelon", 
    name: "Watermelon", 
    emoji: "🍉", 
    note: "Sweetness, weight uniformity", 
    c: "from-pink-400/30 to-emerald-400/20",
    nameTe: "పుచ్చకాయ",
    noteTe: "తీపి, సమానమైన బరువు",
    image: watermelonImg
  },
];

export function getCropBySlug(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}

export type Deficiency = {
  name: string;
  img: string;
  symptoms: string;
  affect: string;
  product: string;
  soilDrip: string;
  benefit: string;
};

export const deficiencyTemplate: Deficiency[] = [
  {
    name: "Magnesium Deficiency",
    img: deficiencyImg,
    symptoms: "Interveinal chlorosis.",
    affect: "Appear on the older leaves, poor seed formation.",
    product: "SMag 4-5gm/1Lt of water or Agri Max 1gm/1Lt. of water",
    soilDrip: "Helps in photosynthesis, starch translocation",
    benefit: "Helps in photosynthesis, starch translocation",
  },
  {
    name: "Sulphur Deficiency",
    img: deficiencyImg,
    symptoms: "New leaves become pale yellow in colour.",
    affect: "Reduces the pungency and keeping quality.",
    product: "SMag 4-5gm/1Lt. of water or MaxGold 1gm/1Lt. of water or MaxPro 1gm/1Lt. of water",
    soilDrip: "Signocal-Mg Premium 10kg/acre, S Mag 10kg/acre",
    benefit: "Improves special character in crop",
  },
  {
    name: "Zinc Deficiency",
    img: deficiencyImg,
    symptoms: "Stunted growth with small, narrow leaves.",
    affect: "Reduces internodal length and overall yield.",
    product: "Signo-Zn 2gm/1Lt. of water or MaxPro 1gm/1Lt. of water",
    soilDrip: "Zinc Sulphate 10kg/acre with organic manure",
    benefit: "Improves auxin synthesis and enzyme activation",
  },
  {
    name: "Boron Deficiency",
    img: deficiencyImg,
    symptoms: "Cracking of fruits, hollow stems, deformed growing tips.",
    affect: "Affects flowering, fruit setting and pollen viability.",
    product: "Signo-Bor 1gm/1Lt. of water or MaxGold 1gm/1Lt. of water",
    soilDrip: "Borax 4-5kg/acre at land preparation",
    benefit: "Improves fruit setting, sugar transport and cell wall strength",
  },
];
