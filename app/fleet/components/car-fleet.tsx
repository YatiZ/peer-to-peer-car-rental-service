"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
//   Car,
  Users,
  Fuel,
  Settings,
  Star,
  Heart,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import { useGetCarList } from "@/services/cars-api/queries";
import { Car } from "@/services/cars-api/types";

export default function CarList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-low");


  const {data: carsData=[]} = useGetCarList();
  console.log("Cars Data:", carsData);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Explore Cars
          </h1>
          <p className="text-muted-foreground">
            Find the perfect car for your next trip
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest First</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Map View
          </Button>
        </div>

        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carsData.map((car:Car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {car.instant_book && (
                  <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                    Instant Book
                  </Badge>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {car.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{car.distance}</span>
                      <span>•</span>
                      <span>{car.review_count} reviews</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.seats}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.fuel}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={`https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50`}
                    alt={car.owner}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">
                    Hosted by {car.owner.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{car.owner.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${car.price}
                    </span>
                    <span className="text-muted-foreground">/day</span>
                  </div>
                  <Button size="sm">
                    {car.instant_book ? "Book Instantly" : "Request"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
