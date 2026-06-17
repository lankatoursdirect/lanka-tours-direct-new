/**
 * phone.js  —  src/lib/phone.js
 *
 * All phone-number logic lives here. Zero logic in components.
 * Uses libphonenumber-js (Google's metadata) so you never
 * maintain country rules yourself.
 *
 * Install once:  npm install libphonenumber-js
 */

import { parsePhoneNumberFromString, AsYouType, getCountryCallingCode } from "libphonenumber-js";

// ─────────────────────────────────────────────────────────────────────────────
// ISO OVERRIDE MAP
// Your countries.js uses "ENGLAND" / "SCOTLAND" / "WALES" as custom codes.
// libphonenumber only knows "GB" — map them here. Add more if needed.
// ─────────────────────────────────────────────────────────────────────────────
const ISO_OVERRIDE = {
  ENGLAND: "GB",
  SCOTLAND: "GB",
  WALES: "GB",
};

/**
 * Resolves a custom country code to a valid libphonenumber ISO2 code.
 * @param {string} isoCode  e.g. "LK", "ENGLAND", "US"
 * @returns {string}        e.g. "LK", "GB",      "US"
 */
function resolveIso(isoCode) {
  if (!isoCode) return "";
  return ISO_OVERRIDE[isoCode] ?? isoCode;
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the international dial code prefix for a country.
 * e.g. getDialCode("LK") → "+94"
 *      getDialCode("ENGLAND") → "+44"
 *
 * @param {string} isoCode
 * @returns {string}  e.g. "+94"  or "" if unknown
 */
export function getDialCode(isoCode) {
  try {
    const resolved = resolveIso(isoCode);
    if (!resolved) return "";
    return `+${getCountryCallingCode(resolved)}`;
  } catch {
    return "";
  }
}

/**
 * Formats the user's input in real-time using national format for their country.
 * Strips non-digits first so pasting messy numbers still works cleanly.
 *
 * e.g. formatAsYouType("0763300443", "LK") → "076 330 0443"
 *      formatAsYouType("07700900123", "GB") → "07700 900123"
 *
 * @param {string} input    Raw string from the input field
 * @param {string} isoCode  Country ISO2 code
 * @returns {string}        Formatted string
 */
export function formatAsYouType(input, isoCode) {
  if (!input || !isoCode) return input ?? "";
  const resolved = resolveIso(isoCode);
  if (!resolved) return input;

  // Strip everything except digits and leading + so AsYouType works cleanly
  const cleaned = input.replace(/[^\d]/g, "");
  return new AsYouType(resolved).input(cleaned);
}

/**
 * Strict validation using libphonenumber's full metadata.
 * Both isPossible() AND isValid() must pass.
 *
 * Returns a result object — never throws.
 *
 * @param {string} localNumber  What the user typed, e.g. "076 330 0443"
 * @param {string} isoCode      Country ISO2 code, e.g. "LK"
 *
 * @returns {{
 *   valid: boolean,
 *   e164: string,             // "+94763300443"  — with + prefix
 *   e164Digits: string,       // "94763300443"   — digits only for wa.me
 *   international: string,    // "+94 76 330 0443"
 *   national: string,         // "076 330 0443"
 *   reason: string,           // human-readable error or ""
 * }}
 */
export function validatePhone(localNumber, isoCode) {
  const empty = {
    valid: false,
    e164: "",
    e164Digits: "",
    international: "",
    national: "",
    reason: "",
  };

  if (!localNumber?.trim() || !isoCode) return empty;

  const resolved = resolveIso(isoCode);
  if (!resolved) return { ...empty, reason: "Unknown country code." };

  let parsed;
  try {
    parsed = parsePhoneNumberFromString(localNumber, resolved);
  } catch {
    return { ...empty, reason: "Could not read this number." };
  }

  if (!parsed) {
    return { ...empty, reason: "Not a valid number for this country." };
  }

  if (!parsed.isPossible()) {
    // Give a length-aware message instead of a generic error
    const digits = localNumber.replace(/\D/g, "").replace(/^0+/, "");
    const hint = digits.length < 6 ? "too short" : "too long";
    return {
      ...empty,
      reason: `Number is ${hint} for ${resolved === "GB" ? "UK" : resolved}.`,
    };
  }

  if (!parsed.isValid()) {
    return {
      ...empty,
      reason: "This number is not valid for the selected country.",
    };
  }

  // All checks passed
  const e164 = parsed.format("E.164"); // "+94763300443"
  return {
    valid: true,
    e164,
    e164Digits: e164.replace("+", ""), // "94763300443"  ← used in wa.me URL
    international: parsed.formatInternational(), // "+94 76 330 0443"
    national: parsed.formatNational(), // "076 330 0443"
    reason: "",
  };
}

/**
 * Builds a wa.me WhatsApp deep-link URL.
 *
 * @param {string} e164Digits   Digits-only E.164, e.g. "94763300443"
 * @param {string} [message]    Optional pre-filled message text
 * @returns {string|null}       Full URL or null if invalid input
 */
export function buildWhatsAppUrl(e164Digits, message = "") {
  if (!e164Digits || e164Digits.length < 7) return null;
  const base = `https://wa.me/${e164Digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
