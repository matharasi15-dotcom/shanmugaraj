import { useState } from "react";
import { Compass, Copy, Check, Bookmark, RotateCcw, AlertCircle } from "lucide-react";
import {
  AcademicStream,
  LanguageMode,
  OracleReading,
  RasiProfile,
} from "../types/horoscope";
import { QUESTION_FOCUSES, RASI_PROFILES } from "../data/horoscopeData";

interface OracleSectionProps {
  language: LanguageMode;
  selectedRasiId: string;
  onSelectRasiId: (id: string) => void;
  selectedStream: AcademicStream;
  onSelectStream: (stream: AcademicStream) => void;
  onSaveReading: (reading: OracleReading) => void;
  savedIds: Set<string>;
}

const ORACLE_IMAGE =
  "/src/assets/images/oracle_celestial_compass_1795080018931.jpg";

export function OracleSection({
  language,
  selectedRasiId,
  onSelectRasiId,
  selectedStream,
  onSelectStream,
  onSaveReading,
  savedIds,
}: OracleSectionProps) {
  const [studentName, setStudentName] = useState("");
  const [focus, setFocus] = useState<string>(QUESTION_FOCUSES[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<OracleReading | null>(null);
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const activeRasi: RasiProfile =
    RASI_PROFILES.find((r) => r.id === selectedRasiId) ?? RASI_PROFILES[0];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim() || "Dominator Student",
          rasiEnglish: `${activeRasi.englishName} (${activeRasi.westernSign})`,
          rasiTamil: activeRasi.tamilName,
          stream: selectedStream,
          focus,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(
          payload?.error || "Unable to fetch cosmic reading right now."
        );
      }

      const nextReading: OracleReading = {
        ...payload,
        id: `${activeRasi.id}-${Date.now()}`,
      };
      setReading(nextReading);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Cosmic signal interrupted. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyWhatsApp = async () => {
    if (!reading) return;
    const text = [
      `*shanmugarj — ${reading.cosmicTitleEn}*`,
      `${reading.cosmicTitleTa}`,
      `Student: ${reading.studentName} | ${reading.rasiEnglish} (${reading.rasiTamil})`,
      "",
      reading.predictionEn,
      reading.predictionTa,
      "",
      `Warning: ${reading.warningEn}`,
      `Lucky Item: ${reading.luckyItemEn} | Lucky #: ${reading.luckyNumber} | Viva Survival: ${reading.vivaSurvivalChance}%`,
      `Parigaram: ${reading.parigaramEn}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const showEn = language === "bilingual" || language === "en";
  const showTa = language === "bilingual" || language === "ta";
  const isSaved = reading ? savedIds.has(reading.id) : false;

  return (
    <section
      id="oracle"
      className="border-t border-white/10 py-16 md:py-20 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-amber-400">
              Interactive Tuition Oracle
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Personal Cosmic Reading
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Select your Rasi, 12th stream, and exam worry for a custom bilingual
            English &amp; Tamil forecast.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Oracle Form + Visual Artifact */}
          <div className="space-y-6 lg:col-span-5">
            <form
              onSubmit={handleGenerate}
              className="rounded-xl border border-white/10 bg-[#110F1B] p-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-medium text-slate-200"
                >
                  Student Name or Nickname
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Karthik, Divya, Backbench Boss"
                  maxLength={50}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#08070E] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-200">
                  12th Standard Stream
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-[#08070E] p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectStream("cs")}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedStream === "cs"
                        ? "bg-amber-400 text-[#08070E]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Computer Science
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStream("biomaths")}
                    className={`rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedStream === "biomaths"
                        ? "bg-amber-400 text-[#08070E]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    Bio-Maths
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rasi-select"
                  className="block text-sm font-medium text-slate-200"
                >
                  Your Rasi (Zodiac Sign)
                </label>
                <select
                  id="rasi-select"
                  value={selectedRasiId}
                  onChange={(e) => onSelectRasiId(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#08070E] px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                >
                  {RASI_PROFILES.map((rasi) => (
                    <option key={rasi.id} value={rasi.id}>
                      {rasi.englishName} ({rasi.westernSign}) — {rasi.tamilName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="focus-select"
                  className="block text-sm font-medium text-slate-200"
                >
                  Question Focus
                </label>
                <select
                  id="focus-select"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-[#08070E] px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                >
                  {QUESTION_FOCUSES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.labelEn} — {item.labelTa}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-[#08070E] transition-colors hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
              >
                {loading ? "Consulting the Stars..." : "Get Cosmic Reading"}
              </button>
            </form>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#110F1B]">
              <div className="relative aspect-[4/3] w-full">
                {!imgFailed ? (
                  <img
                    src={ORACLE_IMAGE}
                    alt="Smoked obsidian sphere and antique brass compass on volcanic stone"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#161324] via-[#110F1B] to-[#08070E] p-6 text-center">
                    <Compass className="h-10 w-10 text-amber-400/80" />
                    <p className="mt-3 font-display text-sm text-slate-300">
                      shanmugarj Celestial Dial
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070E]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-slate-300">
                  <span>{activeRasi.englishName} · {activeRasi.tamilName}</span>
                  <span className="font-mono-tabular text-amber-300">
                    Roll #{activeRasi.luckyRoll}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reading Output Canvas */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#110F1B] p-6 md:p-8 min-h-[480px] flex flex-col justify-between">
              {error && (
                <div
                  role="alert"
                  className="mb-6 flex flex-col gap-3 rounded-lg border border-rose-500/30 bg-rose-950/30 p-4 text-sm text-rose-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGenerate()}
                    className="inline-flex items-center gap-1.5 rounded-md border border-rose-400/40 px-3 py-1.5 text-xs font-medium text-rose-100 hover:bg-rose-500/20 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retry
                  </button>
                </div>
              )}

              {loading ? (
                <div className="my-auto space-y-5 py-10">
                  <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
                  <div className="h-8 w-3/4 rounded bg-white/10 animate-pulse" />
                  <div className="space-y-2.5 pt-2">
                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-11/12 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-20 rounded-lg bg-white/5 animate-pulse" />
                    <div className="h-20 rounded-lg bg-white/5 animate-pulse" />
                  </div>
                </div>
              ) : reading ? (
                <div className="space-y-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{reading.studentName}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {reading.rasiEnglish} ({reading.rasiTamil})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {reading.stream === "cs"
                          ? "12th Computer Science"
                          : "12th Bio-Maths"}
                      </span>
                    </div>

                    {showEn && (
                      <h3 className="mt-3 font-display text-2xl font-semibold text-amber-300 md:text-3xl">
                        {reading.cosmicTitleEn}
                      </h3>
                    )}
                    {showTa && (
                      <p className="mt-1.5 text-lg font-semibold text-white">
                        {reading.cosmicTitleTa}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-6">
                    {showEn && (
                      <p className="text-base leading-relaxed text-slate-200">
                        {reading.predictionEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="text-base leading-relaxed text-amber-100/90">
                        {reading.predictionTa}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Tuition Warning
                      </p>
                      {showEn && (
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                          {reading.warningEn}
                        </p>
                      )}
                      {showTa && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {reading.warningTa}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        Lucky Exam Item
                      </p>
                      {showEn && (
                        <p className="mt-1.5 text-sm font-medium text-amber-300">
                          {reading.luckyItemEn}
                        </p>
                      )}
                      {showTa && (
                        <p className="mt-1 text-sm text-slate-300">
                          {reading.luckyItemTa}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Lucky Roll Number
                      </p>
                      <p className="mt-1 font-mono-tabular text-2xl font-medium text-white">
                        #{reading.luckyNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Viva Survival Odds
                      </p>
                      <p className="mt-1 font-mono-tabular text-2xl font-medium text-amber-400">
                        {reading.vivaSurvivalChance}%
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Recommended Parigaram (Remedy)
                    </p>
                    {showEn && (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                        {reading.parigaramEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {reading.parigaramTa}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                    <button
                      type="button"
                      onClick={handleCopyWhatsApp}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#08070E] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-amber-400/60 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-amber-400" />
                          Copied for WhatsApp
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy for WhatsApp
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSaveReading(reading)}
                      disabled={isSaved}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#08070E] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-amber-400/60 hover:text-amber-300 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {isSaved ? "Saved to Archive" : "Save Reading"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-auto space-y-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>Preview Forecast</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeRasi.englishName} ({activeRasi.tamilName})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeRasi.element}</span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {activeRasi.englishName} Weekly Tuition Outlook
                  </h3>

                  <div className="space-y-4">
                    {showEn && (
                      <p className="text-base leading-relaxed text-slate-200">
                        {activeRasi.forecastEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="text-base leading-relaxed text-amber-100/90">
                        {activeRasi.forecastTa}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Lucky Roll #
                      </p>
                      <p className="mt-1 font-mono-tabular text-2xl font-medium text-white">
                        #{activeRasi.luckyRoll}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Viva Survival
                      </p>
                      <p className="mt-1 font-mono-tabular text-2xl font-medium text-amber-400">
                        {activeRasi.vivaOdds}%
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Quick Parigaram
                    </p>
                    {showEn && (
                      <p className="mt-1.5 text-sm text-slate-300">
                        {activeRasi.remedyEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="mt-1 text-sm text-slate-400">
                        {activeRasi.remedyTa}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-500">
                    Click &ldquo;Get Cosmic Reading&rdquo; on the left for a fresh
                    personalized prediction powered by our oracle.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
