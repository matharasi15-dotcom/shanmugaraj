import { Check, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { REMEDY_LEDGER } from "../data/horoscopeData";
import { LanguageMode, OracleReading } from "../types/horoscope";

interface RemediesSectionProps {
  language: LanguageMode;
  completedRemedies: string[];
  onToggleRemedy: (id: string) => void;
  savedReadings: OracleReading[];
  onRemoveSaved: (id: string) => void;
}

export function RemediesSection({
  language,
  completedRemedies,
  onToggleRemedy,
  savedReadings,
  onRemoveSaved,
}: RemediesSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showEn = language === "bilingual" || language === "en";
  const showTa = language === "bilingual" || language === "ta";

  const totalKarma = REMEDY_LEDGER.reduce(
    (sum, item) =>
      completedRemedies.includes(item.id) ? sum + item.karmaPoints : sum,
    0
  );

  const handleCopySaved = async (item: OracleReading) => {
    const shareText = [
      `*shanmugarj — ${item.cosmicTitleEn}*`,
      `${item.cosmicTitleTa}`,
      `${item.studentName} (${item.rasiEnglish} / ${item.rasiTamil})`,
      item.predictionEn,
      item.predictionTa,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <>
      <section
        id="remedies"
        className="border-t border-white/10 py-16 md:py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
                Tuition Parigaram Ledger
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Sacred Exam Remedies
              </h2>
            </div>

            <div className="text-sm text-slate-300">
              Completed Karma:{" "}
              <span className="font-mono-tabular font-semibold text-amber-400">
                {totalKarma} / 100 pts
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {REMEDY_LEDGER.map((remedy) => {
              const done = completedRemedies.includes(remedy.id);
              return (
                <div
                  key={remedy.id}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="max-w-2xl space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-tabular text-xs text-amber-400">
                        {remedy.indexLabel}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {remedy.titleEn}
                      </h3>
                    </div>

                    {showTa && (
                      <p className="text-sm font-medium text-amber-200/90">
                        {remedy.titleTa}
                      </p>
                    )}

                    {showEn && (
                      <p className="text-sm leading-relaxed text-slate-300">
                        {remedy.descriptionEn}
                      </p>
                    )}

                    {showTa && (
                      <p className="text-sm leading-relaxed text-slate-400">
                        {remedy.descriptionTa}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:pt-1">
                    <span className="font-mono-tabular text-xs text-slate-400">
                      +{remedy.karmaPoints} pts
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleRemedy(remedy.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        done
                          ? "border-amber-400 bg-amber-400 text-[#08070E]"
                          : "border-white/15 bg-[#110F1B] text-slate-200 hover:border-amber-400/60"
                      }`}
                    >
                      {done && <Check className="h-3.5 w-3.5" />}
                      {done ? "Done" : "Mark Done"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="saved"
        className="border-t border-white/10 py-16 md:py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
                Personal Archive
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Saved Readings
              </h2>
            </div>
            <span className="font-mono-tabular text-xs text-slate-400">
              {savedReadings.length} saved
            </span>
          </div>

          {savedReadings.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#110F1B] p-8 text-center">
              <p className="text-sm text-slate-300">
                No saved readings yet. Generate a cosmic reading above and click
                &ldquo;Save Reading&rdquo; to keep it for the squad.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {savedReadings.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#110F1B] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                      <span>
                        {item.studentName} · {item.rasiEnglish}
                      </span>
                      <span className="font-mono-tabular text-amber-400">
                        #{item.luckyNumber} · {item.vivaSurvivalChance}%
                      </span>
                    </div>

                    {showEn && (
                      <h3 className="mt-2.5 font-display text-lg font-semibold text-white">
                        {item.cosmicTitleEn}
                      </h3>
                    )}
                    {showTa && (
                      <p className="mt-1 text-sm font-medium text-amber-200">
                        {item.cosmicTitleTa}
                      </p>
                    )}

                    {showEn && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {item.predictionEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {item.predictionTa}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => handleCopySaved(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-amber-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveSaved(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
