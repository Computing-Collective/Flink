import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  videoId: z
    .string()
    .regex(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
      {
        message: "Invalid YouTube video ID.",
      }
    )
    .or(
      z.string().length(11, {
        message: "Video ID must be exactly 11 characters.",
      })
    ),
  productName: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
});

export default function Generate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  function youtubeParser(url: string): string | false {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId: "",
      productName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    let videoId = values.videoId;
    if (values.videoId.length > 11) {
      const id = youtubeParser(values.videoId);
      if (id === false) {
        console.error("Invalid YouTube video ID.");
        return;
      }
      console.log("Video ID: ", id);
      videoId = id;
    }
    console.log("Video ID: ", videoId);
    handleGenerate(videoId, values.productName);
  }

  const handleGenerate = (video: string, productName: string) => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
      setLink("https://example.com/affiliate-link");
      // Add your generate logic here
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-md mx-auto p-8">
        <h2 className="text-2xl font-bold pb-8">
          Generate customized affiliate links
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <LoadingSpinner className="m-auto" />
          ) : (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8">
                  <FormField
                    control={form.control}
                    name="videoId"
                    render={({ field }) => (
                      <>
                        <FormItem className="text-left">
                          <FormLabel className="text-left">Video ID</FormLabel>
                          <FormControl>
                            <Input placeholder="dQw4w9WgXcQ" {...field} />
                          </FormControl>
                          <FormDescription>
                            The video ID from YouTube
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <>
                        <FormItem className="text-left">
                          <FormLabel className="text-left">
                            Product Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="iPhone 16 Pro Max" {...field} />
                          </FormControl>
                          <FormDescription>
                            The product name to be displayed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Generate
                  </Button>
                </form>
              </Form>
              {link && (
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-lg font-bold pb-4">
                    Personalized Affiliate Link
                  </h3>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline">
                    {link}
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
