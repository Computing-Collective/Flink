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
import { API_URL } from "@/App";

const formSchema = z.object({
  videoUrl: z
    .string()
    .regex(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
      {
        message: "Invalid YouTube Url.",
      }
    ),
  productName: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  redirectUrl: z.string().url({
    message: "Invalid URL.",
  }),
});

export default function Generate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "youtube.com/watch?v=E76CUtSHMrU",
      productName: "Apple iPhone 16 Pro",
      redirectUrl: "https://apple.com",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    handleGenerate(values.videoUrl, values.productName, values.redirectUrl);
  }

  const handleGenerate = async (
    videoUrl: string,
    productName: string,
    redirectUrl: string
  ) => {
    setIsLoading(true);
    // Simulate an async operation
    const response = await fetch(`${API_URL}/create_link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("userId"),
        product: productName,
        source_url: videoUrl,
        redirect_url: redirectUrl,
      }),
    });

    const json = await response.json();

    setLink(json.code);

    setIsLoading(false);
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
                    name="videoUrl"
                    render={({ field }) => (
                      <>
                        <FormItem className="text-left">
                          <FormLabel className="text-left">Video URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The video URL from YouTube
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
                  <FormField
                    control={form.control}
                    name="redirectUrl"
                    render={({ field }) => (
                      <>
                        <FormItem className="text-left">
                          <FormLabel className="text-left">
                            Redirect URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://dbrand.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The URL to redirect the user to
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
