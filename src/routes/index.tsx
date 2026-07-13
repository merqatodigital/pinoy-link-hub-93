import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Link2, MessageCircle, ShoppingBag, Music2, Facebook, Instagram,
  Youtube, MapPin, Calendar, Coffee, Briefcase, FileText, Mail,
  Linkedin, BadgeCheck, Sun, QrCode, BarChart3, CreditCard, Store,
  Check, Sparkles, Phone, ChevronRight, Play, Star, Globe,
} from "lucide-react";
import { useState } from "react";
import { LangProvider, useLang } from "../lib/lang-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "katwa.link — One Link. All Your Channels. Made for Filipinos." },
      { name: "description", content: "Filipino-first link-in-bio. Connect Messenger, WhatsApp, Shopee, Lazada, TikTok, GCash and more in one beautiful page." },
      { property: "og:title", content: "katwa.link — Beautiful Templates, Filipino Style" },
      { property: "og:description", content: "Built for Filipino creators, sellers and businesses. Simple. Fast. Pinoy-friendly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "katwa.link — Beautiful Templates, Filipino Style" },
      { name: "twitter:description", content: "Built for Filipino creators, sellers and businesses." },
    ],
  }),
  component: () => (
    <LangProvider>
      <Landing />
    </LangProvider>
  ),
});

function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.24_290)] shadow-lg shadow-primary/30">
        <Link2 className="h-4 w-4 -rotate-45 text-white" />
      </div>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-[oklch(0.6_0.22_265)]">katwa</span>
        <span className="text-foreground">.link</span>
      </span>
    </Link>
  );
}

function ClaimInline({ size = "md" }: { size?: "md" | "lg" }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { t } = useLang();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "yourname";
    navigate({ to: "/claim/$username", params: { username: slug } });
  };
  const pad = size === "lg" ? "p-2" : "p-1.5";
  return (
    <form onSubmit={submit} className={`flex items-center gap-2 rounded-xl border border-border bg-background/80 backdrop-blur ${pad}`}>
      <span className="pl-2 text-sm text-muted-foreground whitespace-nowrap">katwa.link/</span>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        placeholder={t("yourname", "pangalan mo")}
      />
      <button type="submit" className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
        {t("Claim", "I-claim")}
      </button>
    </form>
  );
}

function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      title={lang === "en" ? "Switch to Tagalog" : "Switch to English"}
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === "en" ? "Tagalog" : "English"}
    </button>
  );
}

function Nav() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">{t("Features", "Mga Tampok")}</a>
          <a href="#templates" className="hover:text-foreground">{t("Templates", "Mga Template")}</a>
          <a href="#dashboard" className="hover:text-foreground">{t("Dashboard", "Dashboard")}</a>
          <a href="#pricing" className="hover:text-foreground">{t("Pricing", "Presyo")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">{t("Log in", "Mag-log in")}</a>
          <Link to="/claim/$username" params={{ username: "yourname" }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90">
            {t("Claim your link", "I-claim ang link mo")}
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- Phone mockup primitives ---------- */
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[260px] shrink-0 ${className}`}>
      <div className="relative rounded-[2.5rem] border-[6px] border-[#0a0a0a] bg-black p-1 shadow-2xl shadow-black/60">
        <div className="relative overflow-hidden rounded-[2rem] aspect-[9/19.5] text-zinc-900">
          <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function LinkRow({
  icon, label, sub, color = "bg-white", text = "text-zinc-900", subText = "text-zinc-500", isPrimary = false,
}: { icon: React.ReactNode; label: string; sub?: string; color?: string; text?: string; subText?: string; isPrimary?: boolean }) {
  if (isPrimary) {
    return (
      <div className={`flex items-center gap-3 rounded-xl ${color} px-3 py-3.5 shadow-md ring-2 ring-[#0084ff]/30`}>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#0084ff] text-white">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`truncate text-sm font-bold leading-tight ${text}`}>{label}</div>
          {sub && <div className={`truncate text-[10px] leading-tight ${subText}`}>{sub}</div>}
        </div>
        <ChevronRight className={`h-4 w-4 ${subText}`} />
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-2.5 rounded-xl ${color} px-2.5 py-2 shadow-sm`}>
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-zinc-900">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`truncate text-[11px] font-semibold leading-tight ${text}`}>{label}</div>
        {sub && <div className={`truncate text-[9px] leading-tight ${subText}`}>{sub}</div>}
      </div>
      <ChevronRight className={`h-3 w-3 ${subText}`} />
    </div>
  );
}

function PayBadge({ label, bg }: { label: string; bg: string }) {
  return (
    <div className={`flex h-7 items-center justify-center rounded-md px-1.5 text-[9px] font-bold text-white ${bg}`}>
      {label}
    </div>
  );
}

function PayRow({ labelClass = "text-zinc-500" }: { labelClass?: string }) {
  const { t } = useLang();
  return (
    <div className="mt-2">
      <div className={`text-center text-[9px] font-semibold uppercase tracking-wider ${labelClass}`}>{t("We Accept", "Tanggap Namin")}</div>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        <PayBadge label="GCash" bg="bg-[#007cf0]" />
        <PayBadge label="maya" bg="bg-[#00b16a]" />
        <PayBadge label="BPI" bg="bg-[#cc1f2d]" />
        <PayBadge label="COD" bg="bg-[#f07a1e]" />
      </div>
    </div>
  );
}

/* ---------- Templates (export so claim page can reuse) ---------- */

export function ClassicPinoyPhone({ name = "KATWA FINDS", bio = "Trusted deals. Fast replies.\nProudly Filipino ❤️" }: { name?: string; bio?: string } = {}) {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-x-0 top-0 h-44 overflow-hidden">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#ffd23a] blur-2xl opacity-70" />
          <div className="absolute -right-10 top-20 h-40 w-40 rounded-full bg-[#cc1f2d] blur-2xl opacity-50" />
          <div className="absolute -bottom-2 left-0 right-0 h-10 bg-[#0038a8]/80 [clip-path:polygon(0_50%,100%_0,100%_100%,0_100%)]" />
        </div>
        <div className="relative pt-10 px-3">
          <div className="mx-auto h-20 w-20 rounded-full border-4 border-white bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg" />
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-[#10b981] px-2 py-0.5 text-[8px] font-semibold text-white">● Online</div>
            <h3 className="mt-1 text-sm font-extrabold tracking-tight text-zinc-900">{name}</h3>
            <p className="mt-0.5 whitespace-pre-line text-[9px] text-zinc-600">{bio}</p>
          </div>
          <div className="mt-3 space-y-1.5">
            <LinkRow icon={<MessageCircle className="h-5 w-5 text-white" />} label="Message on Messenger" color="bg-[#0084ff]" text="text-white" subText="text-white/70" isPrimary />
            <LinkRow icon={<MessageCircle className="h-4 w-4 text-[#25d366]" />} label="WhatsApp" color="bg-[#25d366]/15" />
            <LinkRow icon={<ShoppingBag className="h-4 w-4 text-[#ee4d2d]" />} label="Shopee Store" color="bg-[#ee4d2d]/15" />
            <LinkRow icon={<Music2 className="h-4 w-4" />} label="TikTok Shop" color="bg-zinc-100" />
            <LinkRow icon={<Facebook className="h-4 w-4 text-[#1877f2]" />} label="Facebook Page" color="bg-[#1877f2]/10" />
            <LinkRow icon={<Instagram className="h-4 w-4 text-[#e1306c]" />} label="Instagram" color="bg-gradient-to-r from-[#fdcb52]/30 to-[#e1306c]/20" />
          </div>
          <PayRow />
        </div>
      </div>
    </PhoneFrame>
  );
}

function SellerPhone() {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-[#fff6e3]">
        <div className="absolute left-2 top-8 z-10 rounded-md bg-[#fb923c] px-1.5 py-0.5 text-[8px] font-bold text-white rotate-[-8deg]">BEST<br/>SELLER</div>
        <div className="relative pt-10 px-3">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-[#fb923c] shadow-lg">
            <ShoppingBag className="h-9 w-9 text-white" />
          </div>
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-[#10b981] px-2 py-0.5 text-[8px] font-semibold text-white">● Online</div>
            <h3 className="mt-1 text-sm font-extrabold text-zinc-900">KATWA FINDS</h3>
            <p className="mt-0.5 text-[9px] text-zinc-600">Budol finds • Fast response<br/>Trusted seller ⭐</p>
          </div>
          <div className="mt-2 rounded-xl bg-white p-2 shadow-sm">
            <div className="flex gap-2">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-pink-100 text-pink-500 text-[8px] font-bold">FEATURED</div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-zinc-900">Mini Fan</div>
                <ul className="mt-0.5 space-y-0.5 text-[8px] text-zinc-600">
                  <li>✓ Ultra quiet</li>
                  <li>✓ Rechargeable</li>
                </ul>
                <div className="mt-0.5 text-[11px] font-extrabold text-[#fb923c]">₱299.00</div>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <LinkRow icon={<MessageCircle className="h-5 w-5 text-white" />} label="Message on Messenger" color="bg-[#0084ff]" text="text-white" subText="text-white/70" isPrimary />
            <LinkRow icon={<MessageCircle className="h-4 w-4 text-[#25d366]" />} label="WhatsApp" />
            <LinkRow icon={<ShoppingBag className="h-4 w-4 text-[#ee4d2d]" />} label="Shopee Store" />
            <LinkRow icon={<Music2 className="h-4 w-4" />} label="TikTok Shop" />
            <LinkRow icon={<Store className="h-4 w-4 text-[#a020f0]" />} label="Lazada Store" />
          </div>
          <PayRow />
        </div>
      </div>
    </PhoneFrame>
  );
}

function CreatorPhone() {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a103d] via-[#2d1654] to-[#0e0a26] text-white">
        <div className="relative pt-10 px-3">
          <div className="mx-auto h-20 w-20 rounded-full border-4 border-white bg-gradient-to-br from-amber-200 to-amber-400 shadow-lg" />
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-[#10b981] px-2 py-0.5 text-[8px] font-semibold text-white">● Online</div>
            <h3 className="mt-1 flex items-center justify-center gap-1 text-sm font-extrabold text-white">JUAN VLOGS <BadgeCheck className="h-3 w-3 text-sky-400" /></h3>
            <p className="mt-0.5 text-[9px] text-white/75">Creating videos that inspire.<br/>Vlogs • Travel • Lifestyle</p>
          </div>
          <div className="mt-2 relative h-20 overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-700 via-purple-700 to-pink-600">
            <div className="absolute inset-0 grid place-items-center"><Play className="h-7 w-7 fill-white text-white" /></div>
            <div className="absolute bottom-1 left-2 text-[8px] font-semibold text-white">NEW VLOG: JAPAN ADVENTURE</div>
          </div>
          <div className="mt-2 space-y-1">
            <LinkRow icon={<Youtube className="h-5 w-5 text-white" />} label="YouTube Channel" color="bg-[#ff0000]" text="text-white" subText="text-white/70" isPrimary />
            <LinkRow icon={<Music2 className="h-4 w-4" />} label="TikTok" color="bg-white/10" text="text-white" subText="text-white/60" />
            <LinkRow icon={<Instagram className="h-4 w-4 text-[#e1306c]" />} label="Instagram" color="bg-gradient-to-r from-[#fdcb52]/40 to-[#e1306c]/40" text="text-white" subText="text-white/60" />
            <LinkRow icon={<Facebook className="h-4 w-4 text-[#1877f2]" />} label="Facebook Page" color="bg-[#1877f2]/25" text="text-white" subText="text-white/60" />
            <LinkRow icon={<Mail className="h-4 w-4" />} label="Business Inquiries" color="bg-white/10" text="text-white" subText="text-white/60" />
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {[Youtube, Music2, Instagram, Facebook].map((I, i) => (
              <div key={i} className="grid h-7 w-7 place-items-center rounded-full bg-white/10"><I className="h-3.5 w-3.5 text-white" /></div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function BusinessPhone() {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="relative pt-10 px-3 text-white">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-white">
            <Coffee className="h-9 w-9 text-emerald-700" />
          </div>
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-semibold text-white">Open Now</div>
            <h3 className="mt-1 text-sm font-extrabold text-white">BEAN &amp; BREW</h3>
            <p className="mt-0.5 text-[9px] text-white/85">Good coffee. Good food.<br/>Good vibes.</p>
          </div>
          <div className="mt-3 space-y-1.5">
            <LinkRow icon={<FileText className="h-5 w-5 text-emerald-700" />} label="View Our Menu" sub="Coffee, meals & pastries" color="bg-white" isPrimary />
            <LinkRow icon={<Calendar className="h-4 w-4 text-emerald-700" />} label="Book a Table" sub="Reserve your spot" />
            <LinkRow icon={<MessageCircle className="h-4 w-4 text-[#0084ff]" />} label="Message Us" sub="We're here to help!" />
            <LinkRow icon={<MapPin className="h-4 w-4 text-rose-500" />} label="Location" sub="Find us here" />
            <LinkRow icon={<Star className="h-4 w-4 text-amber-500" />} label="Customer Reviews" sub="See what they say" />
          </div>
          <PayRow labelClass="text-white/80" />
        </div>
      </div>
    </PhoneFrame>
  );
}

function ResortPhone() {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/30 via-sky-500/20 to-teal-900/60" />
        <div className="relative pt-10 px-3 text-white">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-white">
            <Sun className="h-9 w-9 text-sky-500" />
          </div>
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-semibold text-white">● Online</div>
            <h3 className="mt-1 text-sm font-extrabold text-white">AZUL BEACH RESORT</h3>
            <p className="mt-0.5 text-[9px] text-white/90">Your escape. Your paradise.<br/>San Vicente, Palawan</p>
          </div>
          <div className="mt-3 space-y-1.5">
            <LinkRow icon={<Calendar className="h-5 w-5 text-white" />} label="Book Your Stay" sub="Best rate guaranteed" color="bg-sky-500" text="text-white" subText="text-white/70" isPrimary />
            <LinkRow icon={<Sun className="h-4 w-4 text-amber-500" />} label="Island Hopping Tours" sub="Explore beautiful places" />
            <LinkRow icon={<MessageCircle className="h-4 w-4 text-[#25d366]" />} label="WhatsApp Concierge" sub="We're here for you" />
            <LinkRow icon={<MapPin className="h-4 w-4 text-rose-500" />} label="Directions" sub="How to get here" />
            <LinkRow icon={<Instagram className="h-4 w-4 text-[#e1306c]" />} label="Instagram" sub="See our paradise" />
          </div>
          <PayRow labelClass="text-white/80" />
        </div>
      </div>
    </PhoneFrame>
  );
}

function PatrioticPhone() {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0038a8] via-[#0b1d52] to-[#0b1d52] text-white">
        <div className="absolute right-0 top-0 h-40 w-40 bg-[#cc1f2d] [clip-path:polygon(100%_0,0_0,100%_100%)]" />
        <div className="absolute -left-4 top-4 text-[#ffd23a] text-2xl">✦</div>
        <div className="relative pt-10 px-3">
          <div className="mx-auto h-20 w-20 rounded-full border-4 border-white bg-gradient-to-br from-amber-200 to-amber-500 shadow-lg" />
          <div className="mt-2 text-center">
            <div className="inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-semibold text-white">● Online</div>
            <h3 className="mt-1 text-sm font-extrabold text-white">PINOY CREATIVES</h3>
            <p className="mt-0.5 text-[9px] text-white/85">Designs that stand out.<br/>Proudly Filipino 🇵🇭</p>
          </div>
          <div className="mt-3 space-y-1.5">
            <LinkRow icon={<Briefcase className="h-5 w-5 text-white" />} label="View My Portfolio" sub="Selected works" color="bg-[#0038a8]" text="text-white" subText="text-white/70" isPrimary />
            <LinkRow icon={<Phone className="h-4 w-4 text-[#0038a8]" />} label="Book a Call" sub="Let's work together" />
            <LinkRow icon={<FileText className="h-4 w-4 text-[#0038a8]" />} label="Services" sub="What I can do for you" />
            <LinkRow icon={<Mail className="h-4 w-4 text-[#0038a8]" />} label="Email Me" sub="Send me a message" />
            <LinkRow icon={<Linkedin className="h-4 w-4 text-[#0077b5]" />} label="LinkedIn" sub="Let's connect" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ---------- Sections ---------- */

const templates = [
  { Comp: ClassicPinoyPhone, name: "CLASSIC PINOY", color: "text-white", desc: "Clean, simple and proudly Pinoy." },
  { Comp: SellerPhone, name: "SELLER", color: "text-amber-400", desc: "Perfect for online sellers and resellers." },
  { Comp: CreatorPhone, name: "CREATOR", color: "text-fuchsia-400", desc: "Made for content creators and influencers." },
  { Comp: BusinessPhone, name: "BUSINESS", color: "text-emerald-400", desc: "Great for cafes, restaurants and local shops." },
  { Comp: ResortPhone, name: "RESORT", color: "text-sky-400", desc: "Built for resorts, hotels and travel businesses." },
  { Comp: PatrioticPhone, name: "PATRIOTIC PINOY", color: "text-[#ff6464]", desc: "Show your pride with Philippine colors and sun." },
];

function TrustSignals() {
  const { t } = useLang();
  const signals = [
    { icon: <Check className="h-4 w-4" />, text: t("10,000+ Pinoy creators trust katwa.link", "10,000+ Pinoy creators ang nagtitiwala sa katwa.link") },
    { icon: <Check className="h-4 w-4" />, text: t("Free forever, no hidden fees", "Libre forever, walang nakatagong bayad") },
    { icon: <Check className="h-4 w-4" />, text: t("Works with GCash, Maya, Shopee", "Gumagana sa GCash, Maya, Shopee") },
  ];
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {signals.map((s, i) => (
        <div key={i} className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20">
            {s.icon}
          </span>
          {s.text}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-[#cc1f2d]/15 blur-3xl" />
      <div className="absolute right-10 top-20 text-[#ffd23a] hidden sm:block">
        <Sun className="h-16 w-16" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t("Built for the Philippine market", "Gawa para sa Philippine market")} 🇵🇭
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("One Link.", "Isang Link.")}<br/>
            <span className="bg-gradient-to-r from-[#60a5fa] via-primary to-[#ef4444] bg-clip-text text-transparent">{t("All Your Channels.", "Lahat ng Channels Mo.")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t(
              "Built for the way Filipinos connect, chat, and shop online. Messenger, WhatsApp, Shopee, Lazada, TikTok Shop, GCash — all in one beautiful page.",
              "Gawa para sa kung paano nagko-connect, nag-uusap, at namimili ang mga Pilipino online. Messenger, WhatsApp, Shopee, Lazada, TikTok Shop, GCash — lahat sa iisang magandang page."
            )}
          </p>

          <div className="mt-8 max-w-md">
            <ClaimInline size="lg" />
            <p className="mt-2 text-xs text-muted-foreground">{t("Free forever. No credit card needed.", "Libre forever. Walang credit card kailangan.")}</p>
          </div>

          <TrustSignals />

          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {[
              t("Made for Filipino creators & businesses", "Gawa para sa Filipino creators at businesses"),
              t("Connect what matters most", "I-connect ang mahalaga"),
              t("Get more clicks and customers", "Dami pa ng clicks at customers"),
              t("Simple. Fast. Pinoy-friendly.", "Simple. Mabilis. Pinoy-friendly."),
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-muted-foreground">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-start justify-center">
          <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-[#cc1f2d]/10 blur-2xl" />
          <ClassicPinoyPhone />
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
  const { t } = useLang();
  return (
    <section id="templates" className="relative border-t border-border/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <Logo className="justify-center" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("Beautiful Templates,", "Magagandang Templates, ")}
            <span className="text-[#60a5fa]">{t("Filipino", "Pinoy")}</span>{" "}
            <span className="text-[#ef4444]">{t("Style", "Style")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t("Choose a template that fits your vibe.", "Pumili ng template na bagay sa vibe mo.")} 🇵🇭</p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map(({ Comp, name, color, desc }) => (
            <Link
              key={name}
              to="/claim/$username"
              params={{ username: "yourname" }}
              search={{ template: name.toLowerCase().replace(/\s+/g, "-") }}
              className="group flex flex-col items-center"
            >
              <div className="transition group-hover:-translate-y-1">
                <Comp />
              </div>
              <div className="mt-5 text-center">
                <div className={`text-base font-extrabold tracking-wider ${color}`}>{name}</div>
                <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-md items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-4 w-4 text-primary" />
          {t("All templates are fully customizable.", " Lahat ng templates ay fully customizable.")}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useLang();
  const feats = [
    { Icon: MessageCircle, title: t("Messenger First", "Messenger Muna"), desc: t("Prioritize chat with one tap.", "I-prioritize ang chat sa isang tap.") },
    { Icon: CreditCard, title: t("Local Payments", "Lokal na Bayaran"), desc: t("Show your accepted payment methods.", "Ipakita ang mga tinatanggap mong bayaran.") },
    { Icon: Store, title: t("Marketplace Links", "Marketplace Links"), desc: t("Shopee, Lazada, TikTok Shop ready.", "Shopee, Lazada, TikTok Shop ready.") },
    { Icon: BadgeCheck, title: t("Online Status", "Online Status"), desc: t("Let customers know you're active.", "Paalam sa customers na active ka.") },
    { Icon: BarChart3, title: t("Analytics", "Analytics"), desc: t("Track clicks and grow your audience.", "I-track ang clicks at palaguin ang audience.") },
    { Icon: QrCode, title: t("QR Code", "QR Code"), desc: t("Share offline, get more customers.", "I-share offline, dagdagan ang customers.") },
  ];
  return (
    <section id="features" className="relative border-t border-border/50 bg-card/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{t("Filipino-First Features", "Mga Tampok na Pinoy Muna")}</h2>
          <p className="mt-3 text-muted-foreground">{t("Designed for how Pinoys actually do business online.", "Ginawa para sa kung paano talaga namimili ang mga Pinoy online.")}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map(({ Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur transition hover:border-primary/40 hover:bg-background">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  const { t } = useLang();
  return (
    <section id="dashboard" className="relative border-t border-border/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{t("Your dashboard, your data.", "Ang dashboard mo, ang data mo.")}</h2>
          <p className="mt-3 text-muted-foreground">{t("Track every click and grow your reach.", "I-track ang bawat click at palaguin ang reach mo.")}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="hidden border-r border-border bg-card/50 p-4 lg:block">
              <Logo />
              <nav className="mt-6 space-y-1 text-sm">
                {[
                  [t("Overview", "Overview"), BarChart3, true],
                  [t("Links", "Links"), Link2, false],
                  [t("Appearance", "Appearance"), Sparkles, false],
                  [t("Analytics", "Analytics"), BarChart3, false],
                  [t("QR Code", "QR Code"), QrCode, false],
                  [t("Settings", "Settings"), Briefcase, false],
                ].map(([n, I, active]) => {
                  const Icon = I as typeof BarChart3;
                  return (
                    <div key={n as string} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                      <Icon className="h-4 w-4" />
                      <span>{n as string}</span>
                    </div>
                  );
                })}
              </nav>
            </aside>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{t("Overview", "Overview")}</h3>
                <div className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground">{t("Last 7 Days", "Huling 7 Araw")} ▾</div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [t("Profile Views", "Profile Views"), "12,458", "+18.6%"],
                  [t("Link Clicks", "Link Clicks"), "8,246", "+21.3%"],
                  [t("Click Through Rate", "Click Through Rate"), "66.1%", "+9.2%"],
                  [t("Top Source", "Top Source"), "TikTok", "+31.4%"],
                ].map(([label, val, delta]) => (
                  <div key={label as string} className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="text-xs text-muted-foreground">{label as string}</div>
                    <div className="mt-1 text-2xl font-extrabold tracking-tight">{val as string}</div>
                    <div className="mt-1 text-xs text-emerald-400">↑ {delta as string}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-card/50 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{t("Top Links", "Top Links")}</h4>
                    <span className="text-xs text-muted-foreground">{t("Clicks", "Clicks")}</span>
                  </div>
                  <ul className="mt-3 space-y-3 text-sm">
                    {[
                      [MessageCircle, "Message us on Facebook", "2,984"],
                      [MessageCircle, "Chat on WhatsApp", "2,341"],
                      [ShoppingBag, "Shopee Store", "1,812"],
                      [Music2, "TikTok Shop", "1,109"],
                    ].map(([I, n, c]) => {
                      const Icon = I as typeof MessageCircle;
                      return (
                        <li key={n as string} className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1 truncate">{n as string}</span>
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-primary" style={{ width: "70%" }} />
                          </div>
                          <span className="w-12 text-right font-semibold">{c as string}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card/50 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{t("Views Over Time", "Views Over Time")}</h4>
                    <span className="text-xs text-muted-foreground">2,458 {t("on May 14", "noong Mayo 14")}</span>
                  </div>
                  <svg viewBox="0 0 300 120" className="mt-3 h-32 w-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.62 0.22 265)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="oklch(0.62 0.22 265)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,90 C40,80 60,70 90,65 C130,58 160,55 190,40 C220,28 250,25 300,15 L300,120 L0,120 Z" fill="url(#g)" />
                    <path d="M0,90 C40,80 60,70 90,65 C130,58 160,55 190,40 C220,28 250,25 300,15" fill="none" stroke="oklch(0.62 0.22 265)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useLang();
  return (
    <section id="pricing" className="relative border-t border-border/50 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-background p-8 sm:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#cc1f2d]/20 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("Para sa mga Pinoy, para sa", "Para sa mga Pinoy, para sa")} <span className="text-[#60a5fa]">{t("Pilipino", "Pilipino")}</span>. 🇵🇭
          </h2>
          <p className="relative mt-4 text-muted-foreground">
            {t("Claim your katwa.link before someone else does.", "I-claim mo na ang katwa.link mo bago ka maunahan.")}
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <ClaimInline size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row">
        <Logo />
        <p className="text-xs text-muted-foreground">© 2026 katwa.link — {t("Built with", "Gawa sa")} ❤️ {t("in the Philippines.", "sa Pilipinas.")}</p>
        <div className="flex gap-4 text-muted-foreground">
          <Facebook className="h-4 w-4" />
          <Instagram className="h-4 w-4" />
          <Music2 className="h-4 w-4" />
          <Youtube className="h-4 w-4" />
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TemplatesSection />
        <FeaturesSection />
        <DashboardSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
