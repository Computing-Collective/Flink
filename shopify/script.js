document.addEventListener("DOMContentLoaded", async () => {
  console.log("Personalize script loaded");
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (!code) {
    return
  }
  console.log("Code:", code);

  try {
    const response = await fetch(`http://localhost:8000/link/${code}/decode`);
    if (!response.ok) {
      console.error("HTTP error:", response.status);
    }
    const json = await response.json();
    const summary = json.website_text;

    const bannerHeading = document.querySelector(".banner__heading");
    if (bannerHeading) {
      bannerHeading.textContent = summary;
    } else {
      console.error("Banner heading element not found");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
});
