document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  try {
    const response = await fetch(`http://localhost:8000/link/${code}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    const summary = json.summary;

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
