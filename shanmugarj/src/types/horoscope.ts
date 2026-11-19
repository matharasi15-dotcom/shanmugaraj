export type LanguageMode = "bilingual" | "en" | "ta";

export type AcademicStream = "cs" | "biomaths";

export interface RasiProfile {
  id: string;
  englishName: string;
  westernSign: string;
  tamilName: string;
  element: string;
  streamAffinity: AcademicStream;
  luckyRoll: number;
  vivaOdds: number;
  forecastEn: string;
  forecastTa: string;
  remedyEn: string;
  remedyTa: string;
}

export interface OracleReading {
  id: string;
  studentName: string;
  rasiEnglish: string;
  rasiTamil: string;
  stream: AcademicStream;
  focus: string;
  cosmicTitleEn: string;
  cosmicTitleTa: string;
  predictionEn: string;
  predictionTa: string;
  warningEn: string;
  warningTa: string;
  luckyItemEn: string;
  luckyItemTa: string;
  parigaramEn: string;
  parigaramTa: string;
  luckyNumber: number;
  vivaSurvivalChance: number;
  createdAt: string;
}

export interface RemedyItem {
  id: string;
  indexLabel: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  karmaPoints: number;
}
