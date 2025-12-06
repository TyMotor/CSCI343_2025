import { createContext, useState } from "react";

export const GearContext = createContext();

export function GearProvider({children}) {
    const [cameras, setCameras] = useState(["Canon EOS R8"]);
    const [lenses, setLenses] = useState(["Canon EF 24-105mm f4L"]);
    const [accessories, setAccessories] = useState(["Speedlight"]);

    function addCamera(item) {
        setCameras(prev => [...prev, item]);
    }

    function addLens(item) {
        setLenses(prev => [...prev, item]);
    }

    function addAccessory(item) {
        setAccessories(prev => [...prev, item]);
    }

    function deleteCamera(item) {
        setCameras(prev => prev.filter(i => i !== item));
    }

    function deleteLens(item) {
        setLenses(prev => prev.filter(i => i !== item));
    }

    function deleteAccessory(item) {
        setAccessories(prev => prev.filter(i => i !== item));
    }

    return (
    <GearContext.Provider value={{
      cameras,
      lenses,
      accessories,
      addCamera,
      addLens,
      addAccessory,
      deleteCamera,
      deleteLens,
      deleteAccessory
    }}>
      {children}
    </GearContext.Provider>
  );

}