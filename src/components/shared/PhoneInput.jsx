/**
 * PhoneInput.jsx  —  src/components/shared/PhoneInput.jsx
 *
 * Smart phone input:
 *  1. Auto-sets dial code from selected country
 *  2. Formats number as user types (national format per country)
 *  3. Validates strictly with libphonenumber — correct length + valid for country
 *  4. Green tick when valid, red error when not — no extra panels
 *  5. Hidden input name="whatsapp" carries clean E.164 to EmailJS
 */

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { formatAsYouType, validatePhone, getDialCode } from "@/lib/phone";
import { cn } from "@/lib/utils";

// National-format placeholders — purely cosmetic UX hint per country
const PLACEHOLDERS = {
  LK: "076 330 0443",
  IN: "98765 43210",
  SG: "9123 4567",
  AU: "0412 345 678",
  JP: "090-1234-5678",
  CN: "131 2345 6789",
  MY: "012-345 6789",
  TH: "081 234 5678",
  VN: "091 234 56 78",
  ID: "0812-3456-7890",
  PH: "0917 123 4567",
  NZ: "021 123 4567",
  PK: "0301 2345678",
  BD: "01712-345678",
  GB: "07700 900123",
  DE: "0151 12345678",
  FR: "06 12 34 56 78",
  NL: "06 12345678",
  CH: "076 123 45 67",
  AT: "0650 1234567",
  BE: "0470 12 34 56",
  ES: "612 34 56 78",
  IT: "312 345 6789",
  PT: "912 345 678",
  SE: "070-123 45 67",
  NO: "406 12 345",
  DK: "20 12 34 56",
  FI: "040 1234567",
  PL: "512 345 678",
  RU: "912 345-67-89",
  US: "201 555 0123",
  CA: "204 555 0123",
  BR: "11 91234-5678",
  MX: "1 234 567 8901",
  AR: "11 1234-5678",
  AE: "050 123 4567",
  SA: "051 234 5678",
  QA: "3312 3456",
  KW: "9123 4567",
  IL: "050-123-4567",
  ZA: "071 123 4567",
  NG: "0801 234 5678",
  KE: "0712 345678",
  EG: "0100 123 4567",
  // custom codes in your countries.js — libphonenumber maps these to GB
  ENGLAND: "07700 900123",
  SCOTLAND: "07700 900123",
  WALES: "07700 900123",
};

function FieldLabel({ children, required }) {
  return (
    <label className="block font-accent text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export function PhoneInput({
  isoCode,
  value,
  onChange,
  onValidChange,
  label = "WhatsApp Number",
  required = true,
  externalError = "",
}) {
  const [touched, setTouched] = useState(false);

  const dialCode = getDialCode(isoCode);
  const result = validatePhone(value, isoCode);

  const showError = (touched || !!externalError) && !result.valid && !!value?.trim();
  const showSuccess = result.valid;

  const handleChange = (e) => {
    const formatted = isoCode ? formatAsYouType(e.target.value, isoCode) : e.target.value;

    onChange(formatted);

    // Notify parent — drives Next button gating
    const r = validatePhone(formatted, isoCode);
    onValidChange?.(r.valid ? r.e164Digits : "");
  };

  return (
    <div className="space-y-2">
      <FieldLabel required={required}>{label}</FieldLabel>

      {/* Input row */}
      <div
        className={cn(
          "flex h-[46px] w-full overflow-hidden rounded-lg border bg-white transition-all duration-300",
          showError
            ? "border-red-400 focus-within:ring-1 focus-within:ring-red-400/20"
            : showSuccess
              ? "border-green-400 focus-within:ring-1 focus-within:ring-green-400/20"
              : "border-[var(--soft-sand)] focus-within:border-[var(--ceylon-gold)] focus-within:ring-1 focus-within:ring-[var(--ceylon-gold)]/20",
        )}
      >
        {/* Dial code badge — locked, auto from country selector */}
        <div className="flex shrink-0 select-none items-center border-r border-[var(--soft-sand)] bg-[var(--cream-parchment)] px-3">
          <span className="min-w-[36px] font-mono text-sm font-bold text-foreground">
            {dialCode || "+??"}
          </span>
        </div>

        {/* Local number — user types WITHOUT the country code */}
        <input
          type="tel"
          name="whatsapp_local"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={
            isoCode ? (PLACEHOLDERS[isoCode] ?? "Enter your number") : "Select your country first"
          }
          disabled={!isoCode}
          autoComplete="tel-national"
          className="flex-1 bg-transparent px-3 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        />

        {/* Status icon only — green tick or red alert, nothing else */}
        <div className="flex items-center pr-3">
          {showSuccess && <CheckCircle2 size={16} className="animate-fade-in text-green-500" />}
          {showError && <AlertCircle size={16} className="animate-fade-in text-red-400" />}
        </div>
      </div>

      {/* Hidden field — same name="whatsapp" your EmailJS template already uses.
          Value is clean E.164 e.g. "+94763300443" — wa.me handles the + fine. */}
      <input type="hidden" name="whatsapp" value={result.valid ? result.e164 : ""} />

      {/* Error message — shown only after blur or forced by parent */}
      {(showError || (!!externalError && !result.valid)) && (
        <p className="flex animate-fade-in items-center gap-1.5 text-[11px] font-medium text-red-500">
          <AlertCircle size={11} />
          {!value?.trim()
            ? "WhatsApp number is required."
            : result.reason || "Please enter a valid number."}
        </p>
      )}

      {/* Hint shown before country is selected */}
      {!isoCode && (
        <p className="text-[10px] text-muted-foreground/50">
          Select your country above to enable this field.
        </p>
      )}
    </div>
  );
}
