"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/button";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import useClipStore from "@/lib/store/useClipStore";
import { useGetDetailComments } from "@/services/comment/queries";
import type { IClipComment } from "@/services/features/clip/types";
import { useClipCommentsQuery } from "@/services/features/clip/queries";
import ClipCommentInput from "./clip-comment-input";
import { useSearch } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import ClipCommentSkeleton from "./clip-comment-skeleton";
import ClipCommentCard from "./clip-comment-card";

interface DetailCommentThread {
  comment: IClipComment;
  replies: IClipComment[];
}

interface DetailCommentThreadPage {
  _data: DetailCommentThread;
}

// =================== Header =================
const Header = () => {
  const { commentToggle } = useClipStore();
  return (
    <header className="flex items-center justify-end">
      <Button
        onClick={commentToggle}
        className="size-7 bg-white/10 text-white rounded-full"
        size="icon"
      >
        <IconX />
      </Button>
    </header>
  );
};

// =================== Content =================
const Content = () => {
  const { existFile, clipId } = useClipStore();
  const { commentId, detailReply } = useSearch({
    from: "/_authenticated/foryou/",
  });

  const {
    data: comments,
    fetchNextPage,
    isPending,
    isError,
    isFetchingNextPage,
  } = useClipCommentsQuery({
    size: 10,
    id: clipId as string,
    enabled: !detailReply,
  });
  const detailQuery = useGetDetailComments({
    size: 20,
    id: commentId || "",
    enabled: !!detailReply && !!commentId,
  });
  const detailThread = (detailQuery.data?.[0] as DetailCommentThreadPage | undefined)?._data;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className={cn("flex-1 overflow-y-scroll", existFile && "h-[76%]")}>
      <div className={cn("space-y-4 pb-10 h-[50%]")}>
        {((detailReply && (detailQuery.isPending || detailQuery.isError)) ||
          (!detailReply && (isPending || isError))) &&
          new Array(4)
            .fill(0)
            .map((_, idx) => <ClipCommentSkeleton key={idx} />)}
        {detailReply && detailThread ? (
          <ClipCommentCard
            clipId={clipId!}
            key={detailThread.comment.id}
            comment={detailThread.comment}
            totalReplies={detailThread.comment.total_replies}
            preloadedReplies={detailThread.replies}
          />
        ) : (
          comments?.map((comment, idx) => (
            <ClipCommentCard clipId={clipId!} key={idx} comment={comment} />
          ))
        )}
        {((detailReply && !detailThread && !detailQuery.isPending && !detailQuery.isError) ||
          (!detailReply && comments?.length === 0 && !isPending && !isError)) && (
          <p className="text-center text-white/50  text-sm mt-5">
            Be the first to comment!
          </p>
        )}

        <div ref={ref} className="h-4 w-full">
          {!detailReply && isFetchingNextPage && <ClipCommentSkeleton />}
        </div>
      </div>
    </div>
  );
};

const ForyouComment = () => {
  const { openedComment } = useClipStore();

  return (
    <aside
      className={cn(
        "w-0  bg-[#1E1E1E] opacity-0 h-screen flex flex-col  transition-all duration-500 text-white ",
        openedComment && "w-full md:w-[40%] p-3 visible opacity-100",
      )}
    >
      {/* header */}
      <Header />
      {/* content */}

      {openedComment && <Content />}
      {/* input */}
      <ClipCommentInput />
    </aside>
  );
};

export default ForyouComment;
