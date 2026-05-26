// app/cars/[id]/components/PickupLocations.tsx
import { MapPin } from "lucide-react";

interface PickupLocationsProps {
  pickup: {
    address: string;
    latitude: number;
    longitude: number;
    is_default: boolean;
  }[];
}

export default function PickupLocations({ pickup }: PickupLocationsProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-950">
          Pickup Locations
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose the most convenient handoff point.
        </p>
      </div>
      {pickup.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Pickup location will be confirmed after booking.
        </p>
      ) : (
        <div className="space-y-3">
          {pickup.map((location, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-lg border p-4 ${
                location.is_default
                  ? "border-sky-200 bg-sky-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white shadow-sm ${
                  location.is_default ? "text-sky-600" : "text-slate-500"
                }`}
              >
                <MapPin className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800">{location.address}</p>
                {location.is_default && (
                  <span className="mt-1 inline-flex text-xs font-medium text-sky-700">
                    Default pickup point
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
