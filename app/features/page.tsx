"use client";
import { useGetCarList } from "@/services/cars-api/queries";
import { Car } from "@/services/cars-api/types";
import React from "react";

const CarListPage = () => {
  const { data: cars = [] } = useGetCarList();

  return (
    <div>
      CarListPage
      {cars.map((car: Car) => (
        <p key={car.id}>{car.brand}</p>
      ))}
    </div>
  );
};

export default CarListPage;
