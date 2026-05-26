"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import {SessionProvider} from "next-auth/react";
import AiChatbot from "@/components/ai-chatbot";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      {children}
      <AiChatbot />
    </QueryClientProvider>
    </SessionProvider>

  );
}
