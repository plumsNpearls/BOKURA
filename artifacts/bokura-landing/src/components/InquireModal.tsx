import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function InquireModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const { t, lang } = useLanguage();

  const businessTypes = lang === "ar"
    ? ["شركة ذات مسؤولية محدودة (بر رئيسي)", "شركة المنطقة الحرة", "مالك فردي", "أخرى"]
    : ["Mainland LLC", "Free Zone FZCO", "Sole Proprietor", "Other"];
  const businessTypeValues = ["mainland", "freezone", "sole", "other"];

  const volumeLabels = lang === "ar"
    ? ["أقل من ٥٠", "٥٠ - ٢٠٠", "٢٠٠ - ٥٠٠", "٥٠٠+"]
    : ["Under 50", "50 - 200", "200 - 500", "500+"];
  const volumeValues = ["under-50", "50-200", "200-500", "500-plus"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="liquid-glass-static border-primary/30 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-white">{t.modal.title}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {t.modal.subtitle}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-medium text-white">{t.modal.successTitle}</h3>
            <p className="text-gray-300 mt-2">{t.modal.successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="business-type" className="text-gray-200">
                {lang === "ar" ? "نوع الشركة" : "Business Type"}
              </Label>
              <Select required>
                <SelectTrigger id="business-type" className="bg-black/40 border-gray-700 text-white focus:ring-primary">
                  <SelectValue placeholder={lang === "ar" ? "اختر نوع الشركة" : "Select business type"} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800 text-white backdrop-blur-xl">
                  {businessTypes.map((label, i) => (
                    <SelectItem key={businessTypeValues[i]} value={businessTypeValues[i]}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactions" className="text-gray-200">
                {lang === "ar" ? "حجم المعاملات الشهرية" : "Monthly Transactions"}
              </Label>
              <Select required>
                <SelectTrigger id="transactions" className="bg-black/40 border-gray-700 text-white focus:ring-primary">
                  <SelectValue placeholder={lang === "ar" ? "اختر الحجم" : "Select volume"} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-800 text-white backdrop-blur-xl">
                  {volumeLabels.map((label, i) => (
                    <SelectItem key={volumeValues[i]} value={volumeValues[i]}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">{t.modal.emailPlaceholder}</Label>
              <Input id="email" type="email" required placeholder="you@company.com" className="bg-black/40 border-gray-700 text-white focus:ring-primary" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pain-point" className="text-gray-200">
                {lang === "ar" ? "أكبر تحدٍّ مالي لديك" : "Biggest Financial Pain Point"}
              </Label>
              <Textarea
                id="pain-point"
                required
                placeholder={lang === "ar" ? "ضريبة القيمة المضافة، التسويات..." : "VAT filing, reconciliations, etc."}
                className="bg-black/40 border-gray-700 text-white focus:ring-primary min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all">
              {t.modal.submit}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
