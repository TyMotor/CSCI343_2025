import { createContext, useState } from "react";

export const ShootContext = createContext();

export function ShootProvider({ children }) {
  const [shoots, setShoots] = useState([
    {
      id: 1,
      clientName: "Joe Schmoe",
      date: "2026-01-01",
      location: "Charleston, SC",
      price: 350,
      status: "upcoming",
      notes: "Engagement photos",
      gear: {
        camera: "Canon EOS R8",
        lenses: ["Canon EF 24-105mm f4L"],
        accessories: ["Speedlight"]
      },
    },
    {
      id: 2,
      clientName: "Jane Adams",
      date: "2026-01-03",
      location: "Myrtle Beach, SC",
      price: 150,
      status: "upcoming",
      notes: "Business photos",
      gear: {
        camera: "Canon EOS R8",
        lenses: ["Canon EF 24-105mm f4L"],
        accessories: []
      },
    },
  ]);

  function addShoot(shoot) {
    setShoots((prev) => [...prev, { ...shoot, id: prev.length + 1 }]);
  }

  function editShoot(id, updatedShoot) {
    setShoots((prev) =>
      prev.map((shoot) =>
        shoot.id === id ? { ...shoot, ...updatedShoot } : shoot
      )
    );
  }

  function deleteShoot(id) {
    setShoots((prev) => prev.filter((shoot) => shoot.id !== id));
  }

  const totalRevenue = shoots
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.price, 0)

  return (
    <ShootContext.Provider value={{ shoots, addShoot, editShoot, deleteShoot, totalRevenue }}>
      {children}
    </ShootContext.Provider>
  );
}
