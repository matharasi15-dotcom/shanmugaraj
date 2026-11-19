import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { RASI_PROFILES } from "../data/horoscopeData";
import { AcademicStream, LanguageMode, RasiProfile } from "../types/horoscope";

interface RasiGridSectionProps {
  language: LanguageMode;
  selectedRasiId: string;
  onChooseRasi: (rasi: RasiProfile) => void;
}

type RasiFilter = "all" | AcademicStream;

export function RasiGridSection({
  language,
  selectedRasiId,
  onChooseRasi,
}: RasiGridSectionProps) {
  const [filter, setFilter] = useState<RasiFilter>("all");

  const filteredRasis = RASI_PROFILES.filter((rasi) =>
    filter === "all" ? true : rasi.streamAffinity === filter
  );

  const showEn = language === "bilingual" || language === "en";
  const showTa = language === "bilingual" || language === "ta";

  return (
    <section
      id="rasis"
      className="border-t border-white/10 py-16 md:py-20 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
              12 Zodiac Tuition Profiles
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Rasi Forecast Directory
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#110F1B] p-1 self-start">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === "all"
                  ? "bg-amber-400 text-[#08070E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              All 12 Rasis
            </button>
            <button
              type="button"
              onClick={() => setFilter("cs")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === "cs"
                  ? "bg-amber-400 text-[#08070E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              CS Squad
            </button>
            <button
              type="button"
              onClick={() => setFilter("biomaths")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filter === "biomaths"
                  ? "bg-amber-400 text-[#08070E]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Bio-Maths Squad
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRasis.map((rasi) => {
            const isSelected = rasi.id === selectedRasiId;
            return (
              <article
                key={rasi.id}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-colors ${
                  isSelected
                    ? "border-amber-400/60 bg-[#161324]"
                    : "border-white/10 bg-[#110F1B] hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                    <span>
                      {rasi.westernSign} · {rasi.element}
                    </span>
                    <span className="font-mono-tabular text-amber-400">
                      {rasi.vivaOdds}% Viva
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {rasi.englishName}{" "}
                    <span className="font-sans text-base font-medium text-amber-300">
                      {rasi.tamilName}
                    </span>
                  </h3>

                  <div className="mt-3 space-y-2.5">
                    {showEn && (
                      <p className="text-sm leading-relaxed text-slate-300">
                        {rasi.forecastEn}
                      </p>
                    )}
                    {showTa && (
                      <p className="text-sm leading-relaxed text-slate-400">
                        {rasi.forecastTa}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-slate-400">
                    {rasi.streamAffinity === "cs"
                      ? "12th Computer Science"
                      : "12th Bio-Maths"}
                  </span>

                  <button
                    type="button"
                    onClick={() => onChooseRasi(rasi)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Consult Oracle
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
