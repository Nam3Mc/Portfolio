/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProperty } from "@rentafacil/interfaces/IProperty";
import { IAccountUser } from "@/interfaces/IAccount";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPropertyDB = async (): Promise<IProperty[]> => {
  try {
    const res = await fetch(`${API_URL}/property`, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Propiedades: ${res.status} ${res.statusText}`
      );
    }
    const properties: IProperty[] = await res.json();

    return properties;
  } catch (error: any) {
    console.error("Error in getPropertyDB:", error.message || error);
    throw new Error(error);
  }
};

export const getPropertyById = async (id: string): Promise<IProperty> => {
  try {
    const res = await fetch(`${API_URL}/property/unique/${id}`, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Propiedades por ID: ${res.status} ${res.statusText}`
      );
    }

    const property: IProperty[] = await res.json();

    if (Array.isArray(property) && property.length > 0) {
      return property[0];
    }
    throw new Error("No se encontró la propiedad con el ID proporcionado.");
  } catch (error: any) {
    console.error("Error in getPropertyById:", error.message || error);
    throw new Error(error);
  }
};

export const getPropertyOwner = async (id: string): Promise<IAccountUser> => {
  try {
    const res = await fetch(`${API_URL}/account/user/${id}`, {
      next: { revalidate: 1200 },
    });

    if (!res.ok) {
      throw new Error(
        `Fallo al realizar el fetch a Owner por ID: ${res.status} ${res.statusText}`
      );
    }

    const owner: IAccountUser = await res.json();
    
    return owner;
  } catch (error: any) {
    console.error("Error in getPropertyOwner:", error.message || error);
    throw new Error(error);
  }
};
