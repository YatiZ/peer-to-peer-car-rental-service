"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Heart,
  Loader2,
  MapPin,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCarDetails } from "@/services/cars-api/queries";
import type { Car, CarImage } from "@/services/cars-api/types";
import DatePicker from "@/app/components/ui/date-picker";
import useDatePicker from "@/app/hooks/use-datepicker";

const glassCard =
  "rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl";

const createFallbackCar = (plateNo: string): Car => ({
  id: 0,
  plate_number: plateNo,
  name: "Car Details",
  owner: {
    id: 0,
    email: "",
    username: "Host",
    user_type: "owner",
    avatar: "",
    phone: "",
    location: "",
    rating: 0,
    joined_date: "",
    is_verified: false,
  },
  location: "Pickup location",
  latitude: 0,
  longitude: 0,
  price: "199.99",
  preview_image:
    "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1400",
  seats: 4,
  transmission: "automatic",
  fuel: "gasoline",
  instant_book: true,
  images: [
    {
      id: 1,
      image_url:
        "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      id: 2,
      image_url:
        "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      id: 3,
      image_url:
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
  ],
  features: [
    { feature: "Verified host" },
    { feature: "Clean interior" },
    { feature: "Flexible pickup" },
    { feature: "Support ready" },
  ],
  pickup: [],
});

export default function Page() {
  const {date, setDate} = useDatePicker();
  const params = useParams<{ id: string }>();
  const plateNo = params.id;
  const { data, isLoading, isError } = useGetCarDetails(plateNo);
  const liveCar = data as Car | undefined;
  const car = liveCar ?? createFallbackCar(plateNo);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages = useMemo<CarImage[]>(() => {
    return [
      { id: 0, image_url: car.preview_image },
      ...car.images.filter((image) => image.image_url !== car.preview_image),
    ];
  }, [car]);

  const selectedImage =
    galleryImages[selectedImageIndex]?.image_url ?? car.preview_image;
  const primaryPickup =
    car.pickup.find((location) => location.is_default) ?? car.pickup[0];
  const featureNames = car.features.map((feature) => feature.feature);
  const displayFeatures =
    featureNames.length > 0
      ? featureNames.slice(0, 4)
      : ["Verified host", "Clean interior", "Flexible pickup", "Support ready"];
  const leftSpecs = [
    { label: "Type", value: "Rental", icon: CarFront },
    { label: "Seat", value: `${car.seats} Seats`, icon: Users },
    { label: "Location", value: car.location, icon: MapPin },
    { label: "Transmission", value: car.transmission, icon: Settings },
  ];
  const rightSpecs = [
    {
      label: "Instant Book",
      value: car.instant_book ? "Available" : "Request",
      icon: Zap,
    },
    { label: "Power", value: "Owner listed", icon: Sparkles },
    { label: "Plate", value: car.plate_number, icon: ShieldCheck },
    { label: "Fuel Type", value: car.fuel, icon: Fuel },
  ];

  const showPreviousImage = () => {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <main className="min-h-screen overflow-hidden ">
      <div className="pointer-events-none fixed inset-0 " />
      <div className="relative mx-auto flex min-h-screen max-w-screen-2xl flex-col px-4 py-5 sm:px-6 lg:px-10">
        <header className="grid gap-5 lg:grid-cols-3 lg:items-start">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl border border-white/10 bg-white/10  hover:bg-white/15 hover:"
          >
            <Link href="/fleet" aria-label="Back to fleet">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>

          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm /45">
              <span>Cars</span>
              <span>•</span>
              <span>{car.fuel}</span>
              <span>•</span>
              <span>{car.transmission}</span>
              <span>•</span>
              <span>{car.name}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {car.name}
              </h1>
              <span className="pb-1 text-2xl /50">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {(isLoading || isError) && (
              <div
                className={`${glassCard} flex h-12 items-center gap-2 px-4 text-sm`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                )}
                <span className="/70">
                  {isLoading ? "Loading live details" : "Showing preview data"}
                </span>
              </div>
            )}
            <div className={`${glassCard} flex h-12 items-center gap-2 px-4`}>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{car.owner.rating || "New"}</span>
              <span className="text-sm /55">(host rating)</span>
            </div>
            <button
              type="button"
              className={`${glassCard} flex h-12 items-center gap-2 px-4 /80 transition hover:bg-white/20`}
            >
              <Heart className="h-5 w-5" />
              Add to favorite
            </button>
          </div>
        </header>

        <section className="mt-8 grid flex-1 gap-6 xl:grid-cols-3 xl:items-center">
          <SpecColumn specs={leftSpecs} />

          <div className="relative">
            <div className="relative max-h-[200px] mx-auto flex h-full max-w-4xl items-center justify-center">
              <img
                src={selectedImage}
                alt={car.name}
                className=" w-full object-cover drop-shadow-2xl"
              />
            </div>
            {/* {galleryImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-white/10 bg-white/10 p-1 shadow-2xl backdrop-blur-xl">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full /55 transition hover:bg-white/10 hover:"
                  aria-label="Previous car image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full  text-zinc-950 transition hover:scale-105"
                  aria-label="Next car image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )} */}
          </div>

          <SpecColumn specs={rightSpecs} />
        </section>

        <section className="mt-7 grid gap-4 lg:grid-cols-3">
          <ImageStrip
            images={galleryImages}
            selectedImageIndex={selectedImageIndex}
            carName={car.name}
            onSelect={setSelectedImageIndex}
          />

          <div className={`${glassCard} min-h-64 p-5`}>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Pickup Location</h2>
              {primaryPickup && (
                <span className="rounded-full border  px-4 py-2 text-sm ">
                  Default pickup
                </span>
              )}
            </div>
            <div className="mt-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border  bg-zinc-800">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-zinc-700 opacity-40" />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange-600 shadow-2xl">
                  <MapPin className="h-6 w-6  " />
                </div>
                <div className="absolute inset-x-8 bottom-5 h-8 rounded-full border " />
              </div>
            </div>
            <p className="mt-3 truncate text-sm ">
              {primaryPickup?.address ??
                "Pickup location will be confirmed after booking."}
            </p>
          </div>

          <div className={`${glassCard} p-5`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Price Range</h2>
                <div className="mt-5 inline-flex rounded-full bg-black p-1 text-sm ">
                  <span className="px-4 py-2 text-white">Hourly</span>
                  <span className="rounded-full bg-orange-600 px-4 py-2 font-semibold ">
                    Daily
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-semibold">${car.price}</span>
                <span className="text-lg ">/day</span>
              </div>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5 ">
              <h3 className="text-lg font-semibold">Booking</h3>
              <div className="mt-4 grid grid-cols-3 items-center gap-3">
                <DatePill label="From" value="Today" />
                {/* <DatePicker value={date} setValue={setDate}/> */}
                <span className="">To</span>
                <DatePill label="Until" value="Select date"/>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm ">Total Price</p>
                  <p className="mt-1 text-3xl font-semibold">
                    ${(Number(car.price) * 2 || Number(car.price)).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-orange-600 px-8 py-4 font-semibold  shadow-2xl transition hover:bg-orange-500"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayFeatures.map((feature) => (
            <div key={feature} className={`${glassCard} px-4 py-3 text-sm `}>
              <Check className="mr-2 inline h-4 w-4 text-orange-400" />
              {feature}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

type SpecItem = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

function SpecColumn({ specs }: { specs: SpecItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      {specs.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className={`${glassCard} flex min-h-20 items-center gap-3 p-4`}
        >
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm ">{label}</p>
            <p className="truncate text-base font-semibold capitalize ">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageStrip({
  images,
  selectedImageIndex,
  carName,
  onSelect,
}: {
  images: { id: number; image_url: string }[];
  selectedImageIndex: number;
  carName: string;
  onSelect: (index: number) => void;
}) {
  return (
    <div className={`${glassCard} min-h-64 p-5`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Car Images</h2>
        <span className="text-sm ">{images.length} photos</span>
      </div>
      <div className="mt-4 grid h-48 grid-cols-2 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`relative overflow-hidden rounded-2xl border transition ${
              selectedImageIndex === index
                ? "border-orange-400 ring-2 ring-orange-400/25"
                : "border-white/10 hover:border-white/30"
            }`}
            aria-label={`Show ${carName} image ${index + 1}`}
          >
            <img
              src={image.image_url}
              alt={`${carName} detail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function DatePill({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm ">{label}</p>
      <div className="flex h-14 items-center bg-black text-white justify-between rounded-2xl  px-4 text-sm font-medium ">
        {value}
        <CalendarDays className="h-4 w-4 " />
      </div>
    </div>
  );
}
