import ClipLayout from "@/components/templates/clip-layout";
import ForyouPage from "@/features/(clip)/foryou";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const ForyouSearchSchema = z.object({
  cid: z.string().optional(),
  ref: z.string().optional(),
  detailReply: z.boolean().optional(),
  commentId: z.string().optional(),
  show: z.boolean().optional(),
});

export const Route = createFileRoute("/_authenticated/foryou/")({
  validateSearch: zodValidator(ForyouSearchSchema),
  component: () => (
    <ClipLayout>
      <ForyouPage />
    </ClipLayout>
  ),
});
