import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pb from "~/lib/pocketbase";

type TeamMember = {
  id: string;
  name: string;
  image: string | null;
  role: string;
  text: string;
};

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const pocketBaseUrl = "http://localhost:8090"; // <-- Update this to your actual base URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const records = await pb.collection("Equipa").getFullList<any>({});
        const lang = i18n.language?.toLowerCase() || "en";

        console.log('landg...', lang);
        

        const teamData: TeamMember[] = records.map((item: any) => {
          const role = item[`role_${lang}`] || "";
          const text = item[`text_${lang}`] || "";

          const image = item.img
            ? `${pocketBaseUrl}/api/files/${item.collectionId}/${item.id}/${item.img}`
            : null;

          return {
            id: item.id,
            name: item.name,
            role,
            text,
            image,
          };
        });

        setTeam(teamData);
      } catch (err: any) {
        setError(err.message || "Failed to load team");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  return { team, loading, error };
}
