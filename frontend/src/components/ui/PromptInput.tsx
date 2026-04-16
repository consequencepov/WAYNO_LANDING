import {
  ArrowUp,
  Plus,
  Monitor,
  Palette,
  X,
  Globe,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useStore } from "@/store/useStore";
import { CtaModal } from "@/components/ui";

export function PromptInput({ className }: { className?: string }) {
  const { promptText, setPromptText, brandMode } = useStore();
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [attachedUrls, setAttachedUrls] = useState<string[]>([]);

  const [urlModeSource, setUrlModeSource] = useState<"inner" | "outer" | null>(
    null,
  );
  const [urlText, setUrlText] = useState("");
  const [designPopupSource, setDesignPopupSource] = useState<
    "inner" | "outer" | null
  >(null);
  const [selectedDesign, setSelectedDesign] = useState<{
    name: string;
    color_1: string;
    color_2: string;
    color_3: string;
  } | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const placeholders = {
    professional: "Опишите проект, задачу или вставьте URL-референс...",
    entrepreneur: "Опишите идею продукта, оффер или гипотезу...",
  };

  const placeholderText =
    placeholders[brandMode as keyof typeof placeholders] ||
    placeholders.professional;

  const isExpanded =
    isFocused ||
    promptText.length > 0 ||
    attachedFiles.length > 0 ||
    attachedUrls.length > 0 ||
    urlModeSource === "inner" ||
    designPopupSource === "inner";

  const canSubmitLead =
    promptText.trim().length > 0 ||
    attachedFiles.length > 0 ||
    attachedUrls.length > 0 ||
    selectedDesign !== null;

  const resetPromptDraft = () => {
    setPromptText("");
    setAttachedFiles([]);
    setAttachedUrls([]);
    setUrlText("");
    setSelectedDesign(null);
    setUrlModeSource(null);
    setDesignPopupSource(null);
    setIsFocused(false);
  };

  const handleLeadCaptureOpen = () => {
    if (!canSubmitLead) {
      return;
    }

    setIsLeadModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setAttachedFiles((prev) => [...prev, selectedFile]);
    }
    // clear input so same file can be selected again if needed
    if (e.target) e.target.value = "";
  };

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setDesignPopupSource(null);
      }
    };
    if (designPopupSource)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [designPopupSource]);

  const designPresets = [
    { name: "Черно-белая (Wayno)", color_1: "#000000", color_2: "#737373", color_3: "#FFFFFF" },
    { name: "Красный рассвет", color_1: "#ef4444", color_2: "#67e8f9", color_3: "#fde047" },
    { name: "Синий ледник", color_1: "#93c5fd", color_2: "#c4b5fd", color_3: "#ffffff" },
    { name: "Изумрудный", color_1: "#10b981", color_2: "#3b82f6", color_3: "#a7f3d0" },
    { name: "Неоновый Токио", color_1: "#f43f5e", color_2: "#fde047", color_3: "#8b5cf6" },
    { name: "Терра", color_1: "#78716c", color_2: "#d6d3d1", color_3: "#44403c" },
    { name: "Закат", color_1: "#f97316", color_2: "#fb923c", color_3: "#fef08a" },
    { name: "Океан", color_1: "#06b6d4", color_2: "#3b82f6", color_3: "#e0f2fe" },
  ];

  const renderActionButtons = (inner?: boolean) => {
    const isUrlMode = urlModeSource === (inner ? "inner" : "outer");
    const isDesignPopupOpen = designPopupSource === (inner ? "inner" : "outer");

    return (
      <AnimatePresence mode="wait">
        {isUrlMode ? (
          <motion.div
            key="url-mode"
            initial={{ opacity: 0, scale: 0.95, width: 100 }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0.95, width: 100 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-[#0a0a0a]/60 backdrop-blur-[32px] border border-white/[0.08] shadow-[0_8px_40px_-4px_rgba(0,0,0,0.4),auto,inset_0_0_0_1px_rgba(255,255,255,0.03)]"
          >
            <Monitor className="w-4 h-4 text-white/50 shrink-0" />
            <input
              type="text"
              value={urlText}
              onChange={(e) => setUrlText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && urlText.trim()) {
                  e.preventDefault();
                  setAttachedUrls((prev) => [...prev, urlText.trim()]);
                  setUrlText("");
                  setUrlModeSource(null);
                  if (inner) textareaRef.current?.focus();
                }
              }}
              placeholder="Вставьте URL..."
              className="bg-transparent border-none outline-none text-[0.85rem] text-white placeholder:text-white/40 w-[180px] sm:w-[240px]"
              autoFocus
            />
            {urlText.length > 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setAttachedUrls((prev) => [...prev, urlText.trim()]);
                  setUrlText("");
                  setUrlModeSource(null);
                  if (inner) textareaRef.current?.focus();
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center bg-white hover:bg-[#eaeaea] text-black transition-all ml-1 shadow-sm shrink-0"
              >
                <ArrowUp className="w-3 h-3" strokeWidth={3} />
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setUrlModeSource(null);
                  setUrlText("");
                  if (inner) textareaRef.current?.focus();
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.1] text-white/50 hover:text-white transition-all ml-1 shadow-sm shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="normal-mode"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center gap-2",
              inner ? "opacity-100" : "opacity-100",
            )}
          >
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                setUrlModeSource(inner ? "inner" : "outer");
                setDesignPopupSource(null);
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#1c1c1c]/50 border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-95 transition-all text-xs sm:text-[0.8rem] tracking-wide font-medium text-white/70 hover:text-white backdrop-blur-md shadow-sm"
            >
              <Monitor className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span>Скопировать сайт</span>
            </button>
            <div className="relative" ref={popupRef}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  setDesignPopupSource(
                    isDesignPopupOpen ? null : inner ? "inner" : "outer",
                  );
                }}
                className={cn(
                  "flex items-center justify-center border active:scale-95 transition-all text-white/70 hover:text-white backdrop-blur-md shadow-sm h-8",
                  selectedDesign ? "px-1.5 rounded-full gap-1" : "p-2 rounded-full",
                  isDesignPopupOpen
                    ? "bg-white/[0.15] border-white/[0.25]"
                    : "bg-[#1c1c1c]/50 border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15]",
                )}
              >
                {selectedDesign ? (
                  <>
                    <div className="w-5 h-5 rounded-full overflow-hidden flex flex-col shrink-0 border border-white/10 shadow-inner">
                      <div
                        className="w-full h-1/2"
                        style={{ backgroundColor: selectedDesign.color_1 }}
                      />
                      <div className="w-full h-1/2 flex">
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: selectedDesign.color_2 }}
                        />
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: selectedDesign.color_3 }}
                        />
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-70" strokeWidth={2.5} />
                  </>
                ) : (
                  <Palette className="w-4 h-4 shrink-0" strokeWidth={2} />
                )}
              </button>

              <AnimatePresence>
                {isDesignPopupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 bg-[#050505]/95 backdrop-blur-[32px] border border-white/[0.12] shadow-[0_16px_40px_-4px_rgba(0,0,0,0.8),auto,inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-[1.25rem] p-3 w-56 bottom-full mb-3 left-0 origin-bottom-left"
                  >
                    <div className="flex items-center gap-2 mb-3 mt-1 px-2">
                      <Palette
                        className="w-4 h-4 text-white/60 shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="text-white/90 text-sm font-medium">
                        Дизайн системы
                      </span>
                    </div>
                    <div className="text-[0.65rem] text-white/40 font-medium tracking-wide uppercase mb-1 px-2">
                      Пресеты
                    </div>
                    <div
                      data-lenis-prevent
                      className="flex flex-col max-h-[200px] overflow-y-auto overscroll-contain pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full"
                    >
                      {designPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            setSelectedDesign(preset);
                            setDesignPopupSource(null);
                            if (inner) textareaRef.current?.focus();
                          }}
                          className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors text-left group"
                        >
                          <div className="w-5 h-5 rounded-full overflow-hidden flex flex-col shrink-0 border border-white/10 shadow-inner">
                            <div
                              className="w-full h-1/2"
                              style={{ backgroundColor: preset.color_1 }}
                            />
                            <div className="w-full h-1/2 flex">
                              <div
                                className="w-1/2 h-full"
                                style={{ backgroundColor: preset.color_2 }}
                              />
                              <div
                                className="w-1/2 h-full"
                                style={{ backgroundColor: preset.color_3 }}
                              />
                            </div>
                          </div>
                          <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div
      className={cn(
        "w-full mx-auto relative flex flex-col items-center",
        "max-w-[720px]",
        className,
      )}
    >
      <motion.div
        layoutId="wayno-command-bar"
        layout
        initial={{ borderRadius: 36 }}
        animate={{
          height: isExpanded ? 240 : 72,
          borderRadius: isExpanded ? 28 : 36,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 1 }}
        className={cn(
          "group relative flex w-full bg-[#0a0a0a]/60 backdrop-blur-[32px] border border-white/[0.08]",
          "shadow-[0_8px_40px_-4px_rgba(0,0,0,0.4),auto,inset_0_0_0_1px_rgba(255,255,255,0.03)]",
          "hover:border-white/[0.18] hover:bg-[#0a0a0a]/70 hover:shadow-[0_12px_60px_-8px_rgba(0,0,0,0.5),0_0_50px_rgba(255,255,255,0.03),inset_0_0_0_1px_rgba(255,255,255,0.05)]",
          "focus-within:bg-[#0a0a0a]/80 focus-within:border-white/[0.35] focus-within:shadow-[0_20px_80px_-12px_rgba(0,0,0,0.6),0_0_70px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.08)]",
          "z-20 cursor-text",
        )}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[140%] bg-white/[0.04] blur-[40px] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </div>

        <div
          className={cn(
            "absolute flex items-center gap-2.5 z-20 transition-all duration-500",
            isExpanded
              ? "left-[1.2rem] top-[1.2rem]"
              : "left-[0.9rem] top-1/2 -translate-y-1/2",
          )}
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1c1c1c] border border-white/[0.08] hover:bg-[#2a2a2a] active:scale-95 transition-all outline-none text-white/80 hover:text-white group/plus shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>

        {(attachedFiles.length > 0 || attachedUrls.length > 0) &&
          isExpanded && (
            <div className="absolute left-[4.5rem] right-[4.5rem] top-[1.2rem] z-10 flex flex-wrap gap-2 pointer-events-none">
              {attachedFiles.map((f, i) => (
                <div
                  key={`file-${i}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-white/10 pointer-events-auto shadow-sm max-w-[200px]"
                >
                  <FileText
                    className="w-4 h-4 text-white/50 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-white/80 text-[13px] font-medium truncate">
                    {f.name}
                  </span>
                  <button
                    onClick={() =>
                      setAttachedFiles((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors shrink-0"
                  >
                    <X className="w-3 h-3" strokeWidth={2} />
                  </button>
                </div>
              ))}
              {attachedUrls.map((url, i) => (
                <div
                  key={`url-${i}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-white/10 pointer-events-auto shadow-sm max-w-[200px]"
                >
                  <Globe
                    className="w-4 h-4 text-white/50 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-white/80 text-[13px] font-medium truncate">
                    {url.replace(/^https?:\/\/(www\.)?/, "")}
                  </span>
                  <button
                    onClick={() =>
                      setAttachedUrls((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors shrink-0"
                  >
                    <X className="w-3 h-3" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          )}

        <textarea
          ref={textareaRef}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholderText}
          className={cn(
            "absolute inset-0 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-[1.125rem] sm:text-[1.2rem] font-light resize-none w-full h-full placeholder:transition-opacity focus:placeholder:opacity-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-0",
            "pl-[4.5rem] pr-[4.5rem]",
            isExpanded
              ? attachedFiles.length > 0 || attachedUrls.length > 0
                ? "pt-[4.5rem]"
                : "pt-[1.4rem]"
              : "pt-[22px] top-0 h-full",
          )}
          style={{ lineHeight: "1.5" }}
          spellCheck="false"
          autoComplete="off"
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="absolute left-[18px] bottom-[14px] z-30"
            >
              {renderActionButtons(true)}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "absolute z-20 flex flex-col justify-center transition-all duration-500",
            isExpanded
              ? "right-[14px] bottom-[14px]"
              : "right-[11px] top-1/2 -translate-y-1/2",
          )}
        >
          {urlModeSource === null && (
            <button
              aria-label="Submit"
              type="button"
              disabled={!canSubmitLead}
              onClick={handleLeadCaptureOpen}
              className="w-[2.8rem] h-[2.8rem] rounded-full bg-white text-black flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-[#eaeaea] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] active:scale-[0.96] transition-all duration-300 outline-none group/send"
            >
              <ArrowUp
                className={cn(
                  "w-[1.2rem] h-[1.2rem] transition-all duration-300",
                  canSubmitLead
                    ? "opacity-90 group-hover/send:-translate-y-0.5 group-hover/send:opacity-100"
                    : "opacity-30"
                )}
                strokeWidth={2.5}
              />
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[calc(100%+1.25rem)] z-30"
          >
            {renderActionButtons(false)}
          </motion.div>
        )}
      </AnimatePresence>

      <CtaModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Оставить заявку"
        leadSource="desktop_prompt"
        promptDraft={{
          promptText: promptText.trim(),
          attachedUrls,
          attachedFileNames: attachedFiles.map((file) => file.name),
          selectedDesign: selectedDesign?.name ?? null,
        }}
        onSubmitted={() => {
          resetPromptDraft();
          setIsLeadModalOpen(false);
        }}
      />
    </div>
  );
}
