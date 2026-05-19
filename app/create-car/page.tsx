import React from "react";
import { CarCreationForm } from "./components/CarCreationForm";

const UploadCar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Car Rental Listing</h1>
          <p className="text-lg text-muted-foreground">
            Create a new car listing and start earning with your vehicle
          </p>
        </div>

        <CarCreationForm />
      </div>
    </div>
  );
};

export default UploadCar;
