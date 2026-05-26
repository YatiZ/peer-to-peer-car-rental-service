import Image from "next/image";
import { Calendar, Clock, Shield, Star } from "lucide-react";

interface OwnerInfoProps {
  owner: {
    username: string;
    avatar: string;
    joined_date: string;
    is_verified: boolean;
    rating: number;
  };
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">About the Host</h2>
      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            {owner.avatar ? (
              <Image
                src={owner.avatar}
                alt={owner.username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xl font-bold text-slate-500">
                {owner.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-slate-950">
              {owner.username}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {owner.rating || "New"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Joined {formatDate(owner.joined_date)}
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-sky-600" />
            <span>Responds within a few hours</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            <Shield className="h-4 w-4 text-sky-600" />
            <span>
              {owner.is_verified ? "Verified identity" : "Identity not verified"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
