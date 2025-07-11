
import React from "react";
import CarList from "./components/car-fleet";

const CarListPage = () => {
  // const { data: cars = [] } = useGetCarList();

  return (
    <div>
      {/* {cars.map((car: Car) => (
        <p key={car.id}>{car.brand}</p>
      ))} */}
      <CarList/>
    </div>
  );
};

export default CarListPage;
