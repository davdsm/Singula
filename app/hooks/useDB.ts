import PocketBase from "pocketbase";
import { useState } from "react";

const useDB = () => {
  const db = new PocketBase("https://singula.pt/admin");

  const [loading, setLoading] = useState(false);

  const addData = async (collection: string, data: any) => {
    setLoading(true);
    try {
      const docRef = await db.collection(collection).create(data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { addData, loading };
};

export default useDB;
