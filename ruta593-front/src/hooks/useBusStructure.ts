// useBusStructure.ts

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";
import { BusStructureT } from "../types"; // Usa este tipo, no LayoutBusT

export const useBusStructure = () => {
  const [loading, setLoading] = useState(false);
  const [selectBusStructures, setSelectBusStructures] = useState<BusStructureT[]>([]); // Usa el tipo correcto

 const getBusStructures = async (): Promise<BusStructureT[]> => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}busStructure`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data; // ✅ ahora sí retornamos correctamente los datos
  } catch (error) {
    toast.error(verifyError(error));
    return []; // 👈 retornamos arreglo vacío para evitar fallos
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  getBusStructures().then((data) => {
    console.log('Estructuras recibidas:', data); // 👀
    setSelectBusStructures(data); // ✅ Ahora sí funciona
  });
}, []);

  return { loading, selectBusStructures }; // ← ¡Esto es fundamental!
};
