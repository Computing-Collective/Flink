// frontend/src/pages/Redirect.tsx
import { API_URL } from "@/App";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    const redirectToLink = async () => {
      try {
        const response = await fetch(`${API_URL}/link/${code}/decode`);
        if (response.status === 404) {
          console.error("Failed to fetch the link");
          window.location.href = "/";
        } else {
          window.location.assign(`${API_URL}/link/${code}`);
        }
      } catch (error) {
        console.error("Error fetching the link:", error);
        window.location.href = "/";
      }
    };

    redirectToLink();
  }, [code]);

  return <div>Redirecting...</div>;
};

export default Redirect;
