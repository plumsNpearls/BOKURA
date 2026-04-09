import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

// ── Replace with the real BOKURA WhatsApp number (digits only, with country code) ──
const WHATSAPP_NUMBER = "971555660189";

function buildWhatsAppMessage(fields: {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  volume: string;
  painPoint: string;
}, lang: string): string {
  if (lang === "ar") {
    return [
      `🏢 *استفسار جديد — بوكورا للمحاسبة والتدقيق*`,
      ``,
      `👤 *الاسم:* ${fields.name}`,
      `📱 *الهاتف:* ${fields.phone}`,
      `📧 *البريد الإلكتروني:* ${fields.email}`,
      ``,
      `🏗️ *نوع الشركة:* ${fields.businessType}`,
      `📊 *المعاملات الشهرية:* ${fields.volume}`,
      ``,
      `💬 *التحدي الرئيسي:*`,
      fields.painPoint,
      ``,
      `─────────────────────`,
      `_أُرسل عبر نموذج الاستفسار في الموقع_`,
    ].join("\n");
  }

  return [
    `🏢 *New Inquiry — BOKURA Accounting & Bookkeeping*`,
    ``,
    `👤 *Name:* ${fields.name}`,
    `📱 *Phone:* ${fields.phone}`,
    `📧 *Email:* ${fields.email}`,
    ``,
    `🏗️ *Business Type:* ${fields.businessType}`,
    `📊 *Monthly Transactions:* ${fields.volume}`,
    ``,
    `💬 *Main Challenge:*`,
    fields.painPoint,
    ``,
    `─────────────────────`,
    `_Sent via ${window.location.hostname} inquiry form_`,
  ].join("\n");
}

export function InquireModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [volume, setVolume] = useState("");
  const [painPoint, setPainPoint] = useState("");

  const businessTypeOptions = lang === "ar"
    ? [
        { value: "شركة ذات مسؤولية محدودة (بر رئيسي)", label: "شركة ذات مسؤولية محدودة (بر رئيسي)" },
        { value: "شركة المنطقة الحرة", label: "شركة المنطقة الحرة" },
        { value: "مالك فردي", label: "مالك فردي" },
        { value: "أخرى", label: "أخرى" },
      ]
    : [
        { value: "Mainland LLC", label: "Mainland LLC" },
        { value: "Free Zone FZCO", label: "Free Zone FZCO" },
        { value: "Sole Proprietor", label: "Sole Proprietor" },
        { value: "Other", label: "Other" },
      ];

  const volumeOptions = lang === "ar"
    ? [
        { value: "أقل من ٥٠ معاملة / شهر", label: "أقل من ٥٠" },
        { value: "٥٠ - ٢٠٠ معاملة / شهر", label: "٥٠ - ٢٠٠" },
        { value: "٢٠٠ - ٥٠٠ معاملة / شهر", label: "٢٠٠ - ٥٠٠" },
        { value: "٥٠٠+ معاملة / شهر", label: "٥٠٠+" },
      ]
    : [
        { value: "Under 50 txns/month", label: "Under 50" },
        { value: "50–200 txns/month", label: "50 – 200" },
        { value: "200–500 txns/month", label: "200 – 500" },
        { value: "500+ txns/month", label: "500+" },
      ];

  const resetForm = () => {
    setName(""); setPhone(""); setEmail("");
    setBusinessType(""); setVolume(""); setPainPoint("");
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildWhatsAppMessage({ name, phone, email, businessType, volume, painPoint }, lang);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setTimeout(() => {
      resetForm();
      onOpenChange(false);
    }, 3500);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) resetForm();
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="liquid-glass-static border-primary/30 sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-white">{t.modal.title}</DialogTitle>
          <DialogDescription className="text-gray-300">{t.modal.subtitle}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white">{t.modal.successTitle}</h3>
            <p className="text-gray-300 mt-2">{t.modal.successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">

            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-name" className="text-gray-200">{t.modal.nameLabel}</Label>
              <Input
                id="inq-name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.modal.namePlaceholder}
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-phone" className="text-gray-200">{t.modal.phoneLabel}</Label>
              <Input
                id="inq-phone"
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t.modal.phonePlaceholder}
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-email" className="text-gray-200">{t.modal.emailLabel}</Label>
              <Input
                id="inq-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.modal.emailPlaceholder}
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-btype" className="text-gray-200">{t.modal.businessTypeLabel}</Label>
              <Select required value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger id="inq-btype" className="bg-black/40 border-gray-700 text-white focus:ring-primary">
                  <SelectValue placeholder={t.modal.businessTypePlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800 text-white backdrop-blur-xl">
                  {businessTypeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Transactions */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-vol" className="text-gray-200">{t.modal.transactionsLabel}</Label>
              <Select required value={volume} onValueChange={setVolume}>
                <SelectTrigger id="inq-vol" className="bg-black/40 border-gray-700 text-white focus:ring-primary">
                  <SelectValue placeholder={t.modal.transactionsPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800 text-white backdrop-blur-xl">
                  {volumeOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pain Point / Message */}
            <div className="space-y-1.5">
              <Label htmlFor="inq-pain" className="text-gray-200">{t.modal.painPointLabel}</Label>
              <Textarea
                id="inq-pain"
                required
                value={painPoint}
                onChange={e => setPainPoint(e.target.value)}
                placeholder={t.modal.painPointPlaceholder}
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:ring-primary min-h-[90px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold shadow-[0_0_18px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {t.modal.submit}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
