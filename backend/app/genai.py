import re
from dotenv import load_dotenv
from openai import OpenAI
from youtube_transcript_api import YouTubeTranscriptApi


load_dotenv()
client = OpenAI()


def video_transcript(video_id: str) -> str:
    raw_transcript = YouTubeTranscriptApi.get_transcript(video_id)
    sorted_transcript = sorted(raw_transcript, key=lambda x: x["start"])
    return " ".join([x["text"] for x in sorted_transcript])


def generate_website_text(url: str, name: str | None, product_name: str) -> str:
    match = re.match(r".*youtube.com/watch\?v=(.*)", url)
    if match is None:
        return "Invalid URL"
    transcript_text = video_transcript(match.group(1))

    if name is None:
        name = "NONE"

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "developer",
                "content": "You will be given a text transcript from an online influencer's content such as a video transcript or blog post. Parse the transcript given and generate a short (under 10 words) summary of why their viewers should buy the product, incorporating some of the themes or content from the transcript. You are personalizing the product page for the influencer's audience to make them more inclined to purchase the given product. Some examples are 'Recommended by Linus Tech Tips for best bass performance' or 'Great for gaming and streaming'. You should use the influencer name in the summary if provided. Do not include quotes around your response.",
            },
            {
                "role": "developer",
                "content": 'The influencer name is (ignore if "NONE"): ' + name,
            },
            {"role": "developer", "content": "The product is: " + product_name},
            {"role": "user", "content": "Here is the transcript: " + transcript_text},
        ],
    )

    return completion.choices[0].message.content
