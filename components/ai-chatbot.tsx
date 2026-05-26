/** @format */

"use client";

import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ChevronDown,
  Copy,
  MessageCircleMore,
  Mic,
  Paperclip,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type Feedback = "up" | "down" | null;

const chatbotCopy = {
  launcherLabel: "Ask AI",
  title: "AI Assistant",
  subtitle: "Rides, plans, support, and app guidance",
  greeting:
    "Hi. I can help with booking rides, downloading the app, business plans, and general support questions.",
  placeholder: "Ask anything",
  quickPrompts: [
    "How do I book a ride?",
    "Show business plans",
    "Where can I download the app?",
    "What safety features do you offer?",
  ],
  fastLabel: "Fast",
  note: "Demo UI for a future live assistant",
};

const copy = chatbotCopy;

const createInitialMessages = (): ChatMessage[] => [
  {
    id: "assistant-welcome",
    role: "assistant",
    text: copy.greeting,
  },
];

function buildAssistantReply(prompt: string) {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes("book") ||
    normalized.includes("ride") ||
    normalized.includes("trip")
  ) {
    return "You can start from the Ride section or the user guide, then download the app and choose your pickup, destination, and ride type.";
  }

  if (
    normalized.includes("business") ||
    normalized.includes("plan") ||
    normalized.includes("pricing")
  ) {
    return "The Business page covers plan comparisons, admin tools, security, and payment details.";
  }

  if (
    normalized.includes("download") ||
    normalized.includes("app") ||
    normalized.includes("android") ||
    normalized.includes("iphone") ||
    normalized.includes("ios")
  ) {
    return "The Download page is the fastest place to grab the app.";
  }

  if (
    normalized.includes("safe") ||
    normalized.includes("safety") ||
    normalized.includes("secure")
  ) {
    return "Safety is highlighted through tracking and support features.";
  }

  if (
    normalized.includes("about") ||
    normalized.includes("company") ||
    normalized.includes("fary")
  ) {
    return "The About page is the best place to explore Fary's mission, values, and company story.";
  }

  return "Ask me about ride booking, business plans, app downloads, or general support.";
}

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    createInitialMessages(),
  );
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [copied, setCopied] = useState(false);

  const messageIdRef = useRef(1);
  const replyTimeoutRef = useRef<number | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const desktopOpenTimeoutRef = useRef<number | null>(null);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    desktopOpenTimeoutRef.current = window.setTimeout(() => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsOpen(true);
      }
    }, 420);

    return () => {
      if (desktopOpenTimeoutRef.current) {
        window.clearTimeout(desktopOpenTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const viewport = scrollViewportRef.current;

    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [isTyping, messages]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
      }

      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const createMessage = (role: ChatMessage["role"], text: string) => {
    messageIdRef.current += 1;

    return {
      id: `message-${messageIdRef.current}`,
      role,
      text,
    } satisfies ChatMessage;
  };

  const copyTranscript = async () => {
    const transcript = messages
      .map(
        (message) =>
          `${message.role === "assistant" ? "AI" : "You"}: ${message.text}`,
      )
      .join("\n");

    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);

      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(
        () => setCopied(false),
        1600,
      );
    } catch {
      setCopied(false);
    }
  };

  const queueAssistantReply = (prompt: string) => {
    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
    }

    setIsTyping(true);
    setFeedback(null);

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", buildAssistantReply(prompt)),
      ]);
      setIsTyping(false);
    }, 720);
  };

  const handleSend = (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) return;

    setIsOpen(true);
    setInputValue("");
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", trimmedPrompt),
    ]);
    queueAssistantReply(trimmedPrompt);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleReset = () => {
    if (replyTimeoutRef.current) {
      window.clearTimeout(replyTimeoutRef.current);
    }

    setIsTyping(false);
    setInputValue("");
    setFeedback(null);
    setMessages(createInitialMessages());
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) return;

    queueAssistantReply(lastUserMessage.text);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-end px-2.5 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] pt-2.5 sm:p-4">
      <div className="flex items-end gap-2.5">
        <div
          className={cn(
            "pointer-events-auto hidden rounded-full border border-white/12 bg-[#07090d]/92 px-3 py-1 text-xs font-medium text-white/82 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 sm:flex",
            isOpen
              ? "translate-y-3 opacity-0"
              : "chatbot-float translate-y-0 opacity-100",
          )}
        >
          {copy.launcherLabel}
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div
            className={cn(
              "origin-bottom-right transition-all duration-300",
              isOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible translate-y-4 scale-95 opacity-0",
            )}
          >
            <div className="chatbot-shell relative flex max-h-[calc(100dvh-5.5rem)] w-[min(21rem,calc(100vw-1rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050608]/95 text-white sm:max-h-[calc(100dvh-6rem)] sm:w-[21rem]">
              <div className="absolute inset-x-10 top-0 h-20 rounded-full bg-cyan-400/8 blur-3xl" />
              <div className="relative shrink-0 px-3.5 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-cyan-400 via-sky-500 to-emerald-400 text-black shadow-[0_10px_24px_rgba(34,211,238,0.25)]">
                      <Sparkles className="size-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-wide text-white">
                        {copy.title}
                      </p>
                      <p className="text-[11px] text-white/58">
                        {copy.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/72">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                      aria-label="Reset chat"
                    >
                      <RotateCcw className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={copyTranscript}
                      className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                      aria-label="Copy chat transcript"
                    >
                      <Copy className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                      aria-label="Minimize chatbot"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {copy.quickPrompts.map((prompt, index) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className={cn(
                        "rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-white/80 transition hover:border-cyan-300/30 hover:bg-cyan-300/10",
                        index > 1 && "max-sm:hidden",
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shrink-0 px-3.5 pt-2.5" />

              <div
                ref={scrollViewportRef}
                className="min-h-0 flex-1 overflow-y-auto px-3.5 py-2.5"
              >
                <div className="flex min-h-full flex-col gap-3">
                  {messages.map((message, index) => {
                    const isLastAssistantMessage =
                      message.role === "assistant" &&
                      index === messages.length - 1 &&
                      !isTyping;

                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "max-w-[85%]",
                          message.role === "user" ? "ml-auto" : "mr-auto",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-[1.25rem] px-3.5 py-2.5 text-sm leading-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
                            message.role === "assistant"
                              ? "border border-white/8 bg-white/[0.04] text-white/88"
                              : "border border-white/8 bg-white/[0.10] text-white",
                          )}
                        >
                          {message.text}
                        </div>

                        {isLastAssistantMessage ? (
                          <div className="mt-2 flex items-center gap-1 text-white/60">
                            <button
                              type="button"
                              onClick={handleRetry}
                              className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/8 hover:text-white"
                              aria-label="Retry answer"
                            >
                              <RotateCcw className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={copyTranscript}
                              className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/8 hover:text-white"
                              aria-label="Copy transcript"
                            >
                              <Copy className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setFeedback("up")}
                              className={cn(
                                "flex size-8 items-center justify-center rounded-full transition hover:bg-white/8 hover:text-white",
                                feedback === "up" &&
                                  "bg-emerald-400/14 text-emerald-300",
                              )}
                              aria-label="Rate answer positively"
                            >
                              <ThumbsUp className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setFeedback("down")}
                              className={cn(
                                "flex size-8 items-center justify-center rounded-full transition hover:bg-white/8 hover:text-white",
                                feedback === "down" &&
                                  "bg-rose-400/14 text-rose-300",
                              )}
                              aria-label="Rate answer negatively"
                            >
                              <ThumbsDown className="size-3.5" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  {isTyping ? (
                    <div className="max-w-[78%]">
                      <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-3.5 py-3 text-white/80">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-cyan-300 chatbot-dot-delay-1" />
                          <span className="size-2 rounded-full bg-cyan-300 chatbot-dot-delay-2" />
                          <span className="size-2 rounded-full bg-cyan-300 chatbot-dot-delay-3" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="shrink-0 px-3.5 pb-3.5 pt-1">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[1.45rem] border border-white/14 bg-black/70 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={2}
                      placeholder={copy.placeholder}
                      className="min-h-[56px] w-full resize-none border-none bg-transparent pr-12 text-sm text-white placeholder:text-white/34 outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-emerald-400 text-black shadow-[0_14px_28px_rgba(56,189,248,0.35)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={!inputValue.trim()}
                      aria-label="Send message"
                    >
                      <ArrowUp className="size-4.5" />
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-2.5 text-white/70">
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/10"
                      aria-label="Attach file"
                    >
                      <Paperclip className="size-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-semibold text-white/84">
                        <Zap className="size-3.5" />
                        {copy.fastLabel}
                        <ChevronDown className="size-3.5" />
                      </div>
                      <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-[1.02]"
                        aria-label="Voice input"
                      >
                        <Mic className="size-4.5" />
                      </button>
                    </div>
                  </div>
                </form>

                <p className="mt-2 px-1 text-[11px] text-white/38">
                  {copied ? "Transcript copied" : copy.note}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((currentValue) => !currentValue)}
            className="chatbot-launcher chatbot-float relative flex size-[4.15rem] items-center justify-center rounded-[1.45rem] border border-white/12 bg-[#050608]/95 text-white shadow-[0_24px_50px_rgba(0,0,0,0.55)] transition hover:scale-[1.02]"
            aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
          >
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 text-[9px] font-bold text-black shadow-[0_10px_18px_rgba(34,211,238,0.35)]">
              AI
            </span>
            {isOpen ? (
              <X className="size-6" />
            ) : (
              <MessageCircleMore className="size-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatbot;
