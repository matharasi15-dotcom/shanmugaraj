import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { OracleSection } from "./components/OracleSection";
import { RasiGridSection } from "./components/RasiGridSection";
import { RemediesSection } from "./components/RemediesSection";
import { RASI_PROFILES } from "./data/horoscopeData";
import {
  AcademicStream,
  LanguageMode,
  OracleReading,
  RasiProfile,
} from "./types/horoscope";

const HERO_IMAGE =
  "/src/assets/images/hero_celestial_astrolabe_1795080018751.jpg";
const SAVED_STORAGE_KEY = "shanmugarj_saved_readings";
const REMEDIES_STORAGE_KEY = "shanmugarj_completed_remedies";

export default function App() {
  const [language, setLanguage] = useState<LanguageMode>("bilingual");
  const [selectedRasiId, setSelectedRasiId] = useState<string>(
    RASI_PROFILES[0].id
  );
  const [selectedStream, setSelectedStream] = useState<AcademicStream>("cs");
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const [savedReadings, setSavedReadings] = useState<OracleReading[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as OracleReading[]) : [];
    } catch {
      return [];
    }
  });

  const [completedRemedies, setCompletedRemedies] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(REMEDIES_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedReadings));
    } catch {
      // Ignore storage quota issues
    }
  }, [savedReadings]);

  useEffect(() => {
    try {
      localStorage.setItem(
        REMEDIES_STORAGE_KEY,
        JSON.stringify(completedRemedies)
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [completedRemedies]);

  const savedIds = useMemo(
    () => new Set(savedReadings.map((item) => item.id)),
    [savedReadings]
  );

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChooseRasi = (rasi: RasiProfile) => {
    setSelectedRasiId(rasi.id);
    setSelectedStream(rasi.streamAffinity);
    scrollToSection("oracle");
  };

  const handleSaveReading = (reading: OracleReading) => {
    setSavedReadings((prev) =>
      prev.some((item) => item.id === reading.id) ? prev : [reading, ...prev]
    );
  };

  const handleRemoveSaved = (id: string) => {
    setSavedReadings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleRemedy = (id: string) => {
    setCompletedRemedies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const showEn = language === "bilingual" || language === "en";
  const showTa = language === "bilingual" || language === "ta";

  return (
    <div className="min-h-screen bg-[#08070E] text-white">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08070E]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            shanmugarj
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            <a
              href="#oracle"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              Oracle
            </a>
            <a
              href="#rasis"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              Rasis
            </a>
            <a
              href="#remedies"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              Remedies
            </a>
            <a
              href="#saved"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              Saved
            </a>
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("oracle")}
            className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-[#08070E] transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reveal Destiny
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
              <div className="space-y-5">
                <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
                  Shanmuga&apos;s Horoscope · 12th Tuition Special Edition
                </p>

                <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white [text-wrap:balance]">
                  We Know Your Future... But Not Your Board Exam Marks.
                </h1>

                {showTa && (
                  <p className="text-lg font-semibold leading-relaxed text-amber-300">
                    உன் எதிர்காலம் எங்களுக்குத் தெரியும்... ஆனா உன் MARKS மட்டும்
                    தெரியாது!
                  </p>
                )}

                {showEn && (
                  <p className="max-w-xl text-base leading-relaxed text-slate-300">
                    Bilingual English and Tamil horoscope entertainment built for
                    12th Computer Science and Bio-Maths tuition friends. Pick
                    your Rasi, brace for practical viva odds, and share your
                    reading in the group chat.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("oracle")}
                  className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-[#08070E] transition-colors hover:bg-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Ask the Cosmic Oracle
                </button>

                <div
                  role="group"
                  aria-label="Display Language"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#110F1B] p-1"
                >
                  <button
                    type="button"
                    onClick={() => setLanguage("bilingual")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      language === "bilingual"
                        ? "bg-white/15 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Bilingual
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      language === "en"
                        ? "bg-white/15 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("ta")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      language === "ta"
                        ? "bg-white/15 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl border border-white/10 bg-[#110F1B]">
                {!heroImgFailed ? (
                  <img
                    src={HERO_IMAGE}
                    alt="Antique brushed brass astrolabe and celestial star chart on dark slate desk"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center bg-gradient-to-br from-[#161324] via-[#110F1B] to-[#08070E] p-8 text-center">
                    <Compass className="h-12 w-12 text-amber-400" />
                    <p className="mt-4 font-display text-lg text-white">
                      shanmugarj Celestial Chart
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070E]/80 via-[#08070E]/15 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-slate-300">
                  <span>The Dominators · Tuition Special</span>
                  <span className="font-mono-tabular text-amber-300">
                    12 Rasis Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-column summary strip directly below Hero split */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Zodiac Signs
              </p>
              <p className="mt-1 font-mono-tabular text-2xl font-semibold text-white">
                12
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Tuition Streams
              </p>
              <p className="mt-1 font-mono-tabular text-2xl font-semibold text-white">
                CS &amp; Bio-Maths
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Languages
              </p>
              <p className="mt-1 font-mono-tabular text-2xl font-semibold text-amber-400">
                EN + தமிழ்
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Saved Readings
              </p>
              <p className="mt-1 font-mono-tabular text-2xl font-semibold text-white">
                {savedReadings.length}
              </p>
            </div>
          </div>
        </section>

        <OracleSection
          language={language}
          selectedRasiId={selectedRasiId}
          onSelectRasiId={setSelectedRasiId}
          selectedStream={selectedStream}
          onSelectStream={setSelectedStream}
          onSaveReading={handleSaveReading}
          savedIds={savedIds}
        />

        <RasiGridSection
          language={language}
          selectedRasiId={selectedRasiId}
          onChooseRasi={handleChooseRasi}
        />

        <RemediesSection
          language={language}
          completedRemedies={completedRemedies}
          onToggleRemedy={handleToggleRemedy}
          savedReadings={savedReadings}
          onRemoveSaved={handleRemoveSaved}
        />
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-display text-base font-bold text-white">
              shanmugarj
            </p>
            <p className="text-xs text-slate-400">
              For lighthearted entertainment among 12th tuition friends — actual
              board exam marks still require studying.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#oracle" className="hover:text-white transition-colors">
              Oracle
            </a>
            <a href="#rasis" className="hover:text-white transition-colors">
              Rasis
            </a>
            <a href="#remedies" className="hover:text-white transition-colors">
              Remedies
            </a>
            <a href="#saved" className="hover:text-white transition-colors">
              Saved
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
