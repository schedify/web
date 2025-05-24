import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { codeToHtml, BundledLanguage } from "shiki";

export async function highlightCode(lang: BundledLanguage, code: string) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
      },
    ],
  });
  return html;
}

export function isValidJSON(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidDateObject(value: string | Date): boolean {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  // Only accept ISO 8601 strings (YYYY-MM-DD or full ISO)
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}(T.*)?$/;

  if (typeof value === "string" && iso8601Regex.test(value)) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  return false;
}

const abbrevMap = new Set([
  "ACDT",
  "ACST",
  "ACT",
  "ADT",
  "AEDT",
  "AEST",
  "AFT",
  "AKDT",
  "AKST",
  "ALMT",
  "AMST",
  "AMT",
  "ANAST",
  "ANAT",
  "AQTT",
  "ART",
  "AST",
  "AWST",
  "AZOST",
  "AZOT",
  "AZT",
  "BDT",
  "BIOT",
  "BIT",
  "BOT",
  "BRST",
  "BRT",
  "BST",
  "BTT",
  "CAT",
  "CCT",
  "CDT",
  "CEST",
  "CET",
  "CHADT",
  "CHAST",
  "CHOT",
  "CHOST",
  "CHST",
  "CHUT",
  "CIST",
  "CKT",
  "CLST",
  "CLT",
  "COST",
  "COT",
  "CST",
  "CT",
  "CVT",
  "CWST",
  "CXT",
  "DAVT",
  "DDUT",
  "DFT",
  "EASST",
  "EAST",
  "EAT",
  "ECT",
  "EDT",
  "EEST",
  "EET",
  "EGST",
  "EGT",
  "EIT",
  "EST",
  "FET",
  "FJT",
  "FKST",
  "FKT",
  "FNT",
  "GALT",
  "GAMT",
  "GET",
  "GFT",
  "GILT",
  "GIT",
  "GMT",
  "GST",
  "GYT",
  "HADT",
  "HAST",
  "HKT",
  "HMT",
  "HOVT",
  "HST",
  "ICT",
  "IDT",
  "IOT",
  "IRDT",
  "IRKT",
  "IRST",
  "IST",
  "JST",
  "KALT",
  "KGT",
  "KOST",
  "KRAT",
  "KST",
  "LHST",
  "LINT",
  "MAGT",
  "MART",
  "MAWT",
  "MDT",
  "MET",
  "MEST",
  "MHT",
  "MIST",
  "MIT",
  "MMT",
  "MSK",
  "MST",
  "MUT",
  "MVT",
  "MYT",
  "NCT",
  "NDT",
  "NFT",
  "NPT",
  "NST",
  "NT",
  "NUT",
  "NZDT",
  "NZST",
  "OMST",
  "ORAT",
  "PDT",
  "PET",
  "PETT",
  "PGT",
  "PHOT",
  "PHT",
  "PKT",
  "PMDT",
  "PMST",
  "PONT",
  "PST",
  "PYST",
  "PYT",
  "RET",
  "ROTT",
  "SAKT",
  "SAMT",
  "SAST",
  "SBT",
  "SCT",
  "SGT",
  "SLST",
  "SRET",
  "SRT",
  "SST",
  "SYOT",
  "TAHT",
  "THA",
  "TFT",
  "TJT",
  "TKT",
  "TLT",
  "TMT",
  "TRT",
  "TOT",
  "TVT",
  "ULAST",
  "ULAT",
  "UTC",
  "UYST",
  "UYT",
  "UZT",
  "VET",
  "VLAT",
  "VOLT",
  "VOST",
  "VUT",
  "WAKT",
  "WAST",
  "WAT",
  "WEST",
  "WET",
  "WIT",
  "WST",
  "YAKT",
  "YEKT",
]);

export function valueContainsTimezone(value: string) {
  const upperText = value.toUpperCase();

  // 1. Check full IANA timezone names
  const timezones = moment.tz.names();
  if (timezones.some((tz) => value.includes(tz))) {
    return true;
  }

  // 2. Check abbreviations
  const words = upperText.split(/\s+/);
  if (words.some((word) => abbrevMap.has(word))) {
    return true;
  }

  return false;
}

export function appendUserTimezoneIfMissing(input: string) {
  if (valueContainsTimezone(input)) {
    return input;
  }

  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return `${input} ${userTz}`;
}
