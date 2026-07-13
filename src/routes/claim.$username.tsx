import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Link2, MessageCircle, ShoppingBag, Music2, Facebook, Instagram,
  ChevronRight, Check, Copy, Eye, Share2, Rocket, ArrowLeft,
  Globe, QrCode, X, Plus, Trash2,
} from "lucide-react";
import { PhoneFrame } from "./index";
import { LangProvider, useLang } from "../lib/lang-context";

type LinkItem = { id: string; icon: React.ComponentType<{ className?: string }>; label: string; url: string; color: string };

const defaultLinks: LinkItem[] = [
  { id: "1", icon: MessageCircle, label: "Message on Messenger", url: "https://m.me/yourname", color: "text-[#0084ff]" },
  { id: "2", icon: MessageCircle, label: "WhatsApp", url: "https://wa.me/63", color: "text-[#25d366]" },
  { id: "3", icon: ShoppingBag, label: "Shopee Store", url: "https://shopee.ph/yourname", color: "text-[#ee4d2d]" },
  { id: "4", icon: Music2, label: "TikTok Shop", url: "https://tiktok.com/@yourname", color: "text-zinc-700" },
  { id: "5", icon: Facebook, label: "Facebook Page", url: "https://facebook.com/yourname", color: "text-[#1877f2]" },
  { id: "6", icon: Instagram, label: "Instagram", url: "https://instagram.com/yourname", color: "text-[#e1306c]" },
];

type Search = { template?: string };

export const Route = createFileRoute("/claim/$username")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    template: typeof s.template === "string" ? s.template : undefined,
  }),
  head: ({ params }) => ({
    meta: [
      { title: `katwa.link/${params.username} — Customize your page` },
      { name: "description", content: "Live preview, customize, then publish your katwa.link page." },
    ],
  }),
  component: () => (
    <LangProvider>
      <ClaimPage />
    </LangProvider>
  ),
});

function QRCodeSVG({ url, size = 120 }: { url: string; size?: number }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000`;
  return (
    <img
      src={qrUrl}
      alt={`QR Code for ${url}`}
      width={size}
      height={size}
      className="rounded-lg"
    />
  );
}

function ClaimPage() {
  const { username } = Route.useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const [name, setName] = useState(username === "yourname" ? "My Page" : username.charAt(0).toUpperCase() + username.slice(1));
  const [slug, setSlug] = useState(username);
  const [bio, setBio] = useState("Trusted deals. Fast replies.\nProudly Filipino ❤️");
  const [status, setStatus] = useState<"online" | "offline">("online");
  const [links, setLinks] = useState<LinkItem[]>(defaultLinks);
  const [previewMode, setPreviewMode] = useState(false);
  const [published, setPublished] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const liveUrl = `katwa.link/${slug || "yourname"}`;
  const fullUrl = `https://${liveUrl}`;

  const toggleLink = (id: string) =>
    setLinks((ls) => ls.map((l) => (l.id === id ? { ...l, enabled: !(l as LinkItem & { enabled?: boolean }).enabled } : l)));
  const removeLink = (id: string) => setLinks((ls) => ls.filter((l) => l.id !== id));
  const addLink = () =>
    setLinks((ls) => [
      ...ls,
      { id: String(Date.now()), icon: Globe, label: "New Link", url: "https://", color: "text-zinc-700" },
    ]);

  const handlePublish = () => {
    setPublished(true);
    setShareOpen(true);
  };

  if (previewMode) {
    return (
      <PreviewMode
        name={name}
        bio={bio}
        slug={slug || "yourname"}
        status={status}
        links={links}
        onExit={() => setPreviewMode(false)}
        onPublish={handlePublish}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">{t("Back", "Bumalik")}</span>
          </Link>
          <div className="hidden flex-1 items-center justify-center sm:flex">
            <div className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="text-foreground font-medium">{liveUrl}</span>
              {published && <span className="ml-2 inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-400"><span className="h-1 w-1 rounded-full bg-emerald-400" /> live</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreviewMode(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-muted">
              <Eye className="h-4 w-4" /> <span className="hidden sm:inline">{t("Preview", "Preview")}</span>
            </button>
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90"
            >
              <Rocket className="h-4 w-4" /> {published ? t("Update", "Update") : t("Publish", "I-publish")}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
        {/* Editor */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="text-lg font-bold">{t("Profile", "Profile")}</h2>
            <p className="text-sm text-muted-foreground">{t("Set how your page looks to visitors.", "I-set kung paano tingnan ng visitors ang page mo.")}</p>

            <div className="mt-4 grid gap-4">
              <Field label={t("Username", "Username")}>
                <div className="flex items-center rounded-lg border border-border bg-background">
                  <span className="px-3 text-sm text-muted-foreground">katwa.link/</span>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 bg-transparent py-2.5 pr-3 text-sm outline-none"
                  />
                  <span className="pr-3 text-xs text-emerald-400">{t("available", "available")} ✓</span>
                </div>
              </Field>
              <Field label={t("Display name", "Display name")}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </Field>
              <Field label="Bio">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={120}
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
                <div className="mt-1 text-right text-[10px] text-muted-foreground">{bio.length}/120</div>
              </Field>
              <Field label={t("Status", "Status")}>
                <div className="flex gap-2">
                  {(["online", "offline"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize ${
                        status === s ? "border-primary bg-primary/15 text-primary" : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${s === "online" ? "bg-emerald-400" : "bg-zinc-500"}`} />
                      {s === "online" ? t("Active now", "Active ngayon") : t("Away", "Wala")}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{t("Links", "Links")}</h2>
                <p className="text-sm text-muted-foreground">{t("Add, edit, and reorder your links.", "Mag-add, mag-edit, at mag-reorder ng links.")}</p>
              </div>
              <button onClick={addLink} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                <Plus className="h-3 w-3" /> {t("Add Link", "Mag-add ng Link")}
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {links.map((l) => {
                const Icon = l.icon;
                const isMessenger = l.label.toLowerCase().includes("messenger");
                return (
                  <li key={l.id} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border bg-background p-3 ${isMessenger ? "border-[#0084ff]/50 bg-[#0084ff]/5" : "border-border"}`}>
                    <div className={`grid h-9 w-9 place-items-center rounded-lg ${isMessenger ? "bg-[#0084ff] text-white" : "bg-muted"}`}>
                      <Icon className={`h-4 w-4 ${isMessenger ? "text-white" : l.color}`} />
                    </div>
                    <div className="min-w-0">
                      <input
                        value={l.label}
                        onChange={(e) => setLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, label: e.target.value } : x)))}
                        className="w-full truncate bg-transparent text-sm font-medium outline-none"
                      />
                      <input
                        value={l.url}
                        onChange={(e) => setLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, url: e.target.value } : x)))}
                        className="mt-0.5 w-full truncate bg-transparent text-[11px] text-muted-foreground outline-none"
                      />
                    </div>
                    {isMessenger && (
                      <span className="rounded bg-[#0084ff]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#0084ff]">PRIMARY</span>
                    )}
                    <button onClick={() => removeLink(l.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Live preview */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{t("Live Preview", "Live Preview")}</div>
                <div className="text-xs text-muted-foreground">{t("This is how your page will look.", "Ito ang magiging itsura ng page mo.")}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <MiniPreview name={name} bio={bio} slug={slug || "yourname"} status={status} links={links} />
            </div>
            {/* QR Code below preview */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="text-xs font-medium text-muted-foreground">{t("Your QR Code", "Ang QR Code Mo")}</div>
              <QRCodeSVG url={fullUrl} size={100} />
              <div className="text-[10px] text-muted-foreground">{t("Scan to visit your page", "I-scan para bisitahin ang page mo")}</div>
            </div>
            <button
              onClick={() => setPreviewMode(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-sm hover:bg-muted"
            >
              <Eye className="h-4 w-4" /> {t("Open full preview", "Buksan ang full preview")}
            </button>
          </div>
        </aside>
      </div>

      {shareOpen && (
        <ShareModal url={fullUrl} onClose={() => setShareOpen(false)} onView={() => { setShareOpen(false); setPreviewMode(true); }} />
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function MiniPreview({
  name, bio, slug, status, links,
}: { name: string; bio: string; slug: string; status: "online" | "offline"; links: LinkItem[] }) {
  return (
    <PhoneFrame>
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-pink-50 to-violet-50">
        <div className="pt-10 px-3 pb-4">
          <div className="mx-auto h-20 w-20 rounded-full border-4 border-white bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg" />
          <div className="mt-2 text-center">
            <div className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold text-white ${status === "online" ? "bg-emerald-500" : "bg-zinc-400"}`}>
              ● {status === "online" ? "Active now" : "Away"}
            </div>
            <h3 className="mt-1 text-sm font-extrabold tracking-tight text-zinc-900">{name || "Your Name"}</h3>
            <p className="mt-0.5 whitespace-pre-line text-[9px] text-zinc-600">{bio}</p>
          </div>
          <div className="mt-3 space-y-1.5">
            {links.map((l) => {
              const Icon = l.icon;
              const isMessenger = l.label.toLowerCase().includes("messenger");
              if (isMessenger) {
                return (
                  <div key={l.id} className="flex items-center gap-3 rounded-xl bg-[#0084ff] px-3 py-3 shadow-md">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-[#0084ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 truncate text-sm font-bold text-white">{l.label}</div>
                    <ChevronRight className="h-4 w-4 text-white/70" />
                  </div>
                );
              }
              return (
                <div key={l.id} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-50">
                    <Icon className={`h-4 w-4 ${l.color}`} />
                  </div>
                  <div className="min-w-0 flex-1 truncate text-[11px] font-semibold leading-tight text-zinc-900">{l.label}</div>
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center text-[9px] text-zinc-500">🔗 katwa.link/{slug}</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PreviewMode({
  name, bio, slug, status, links, onExit, onPublish,
}: {
  name: string; bio: string; slug: string; status: "online" | "offline"; links: LinkItem[];
  onExit: () => void; onPublish: () => void;
}) {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0e1226] to-[#1a0e26]">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Eye className="h-4 w-4" /> {t("Preview mode", "Preview mode")}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onExit} className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10">
            <X className="mr-1 inline h-3 w-3" /> {t("Exit", "Exit")}
          </button>
          <button onClick={onPublish} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            <Rocket className="h-3 w-3" /> {t("Publish", "I-publish")}
          </button>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <MiniPreview name={name} bio={bio} slug={slug} status={status} links={links} />
      </div>
    </div>
  );
}

function ShareModal({ url, onClose, onView }: { url: string; onClose: () => void; onView: () => void }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLang();
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My katwa.link", url }); } catch {}
    } else { copy(); }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-bold">{t("You're live! 🎉", "Naka-live ka na! 🎉")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("Your katwa.link page is published. Share it everywhere.", "Na-publish na ang katwa.link page mo. I-share sa lahat.")}</p>

        <div className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-background p-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary"><Globe className="h-4 w-4" /></div>
          <div className="min-w-0 flex-1 truncate text-sm">{url}</div>
          <button onClick={copy} className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            {copied ? <><Check className="mr-1 inline h-3 w-3" /> {t("Copied", "Na-copy")}</> : <><Copy className="mr-1 inline h-3 w-3" /> {t("Copy", "Copy")}</>}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={share} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background py-3 text-xs hover:bg-muted">
            <Share2 className="h-4 w-4 text-primary" /> {t("Share", "Share")}
          </button>
          <button onClick={onView} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background py-3 text-xs hover:bg-muted">
            <Eye className="h-4 w-4 text-primary" /> {t("View page", "Tingnan ang page")}
          </button>
          <button className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background py-3 text-xs hover:bg-muted">
            <QrCode className="h-4 w-4 text-primary" /> QR Code
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          {[
            { name: "Facebook", color: "bg-[#1877f2]" },
            { name: "WhatsApp", color: "bg-[#25d366]" },
            { name: "Messenger", color: "bg-[#0084ff]" },
            { name: "X", color: "bg-black" },
          ].map((s) => (
            <a
              key={s.name}
              href="#"
              className={`flex-1 rounded-lg ${s.color} py-2 text-center text-[11px] font-semibold text-white`}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
