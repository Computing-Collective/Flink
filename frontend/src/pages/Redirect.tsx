// frontend/src/pages/Redirect.tsx
import { API_URL } from "@/App";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    const redirectToLink = async () => {
      try {
        const response = await fetch(`${API_URL}/link/${code}`);
        if (response.ok) {
          const { redirect_url } = await response.json();
          window.location.href = redirect_url;
        } else {
          console.error("Failed to fetch the link");
        }
      } catch (error) {
        console.error("Error fetching the link:", error);
      }
    };

    redirectToLink();
  }, [code]);

  return <div>Redirecting...</div>;
};

export default Redirect;
