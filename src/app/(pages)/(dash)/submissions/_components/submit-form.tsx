"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { APP_CONFIG } from "@/content/config";
import { CHALLANGE_DATA } from "@/content/data";
import { SPONSOR } from "@/content/sponsor";
import { getCurrentDayNumber } from "@/lib/event";
import { parseError } from "@/lib/parse-error";
import { cn } from "@/lib/utils";
import { api } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FlaskConical, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  day: z.string().min(1, "Please select a day."),
  link: z.string().url("Please enter a valid URL.").includes("linkedin.com/posts", {
    error: "Please enter a valid linkedin post URL"
  }),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  verifyHashtags: z.boolean().refine((val) => val === true, {
    message: "You must use the required hashtags.",
  }),
  verifyMyDetails: z.boolean().refine((val) => val === true, {
    message: `You must mention ${APP_CONFIG.name} in your post.`,
  }),
  verifyGuidelines: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the guidelines.",
  }),
  verifySponsor: z.boolean().refine((val) => val === true, {
    message: "You must mention the sponsor.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const SubmitForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const submit = api.submissions.useSubmitDailyChallenge();
  const { data: submissions } = api.submissions.useGetMySubmissions();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      summary: "",
      verifyHashtags: false,
      verifyMyDetails: false,
      verifyGuidelines: false,
      verifySponsor: false,
    },
  });

  const currentDayNumber = useMemo(() => getCurrentDayNumber(), []);

  const submittedDays = useMemo(
    () => new Set(submissions?.data?.map((s) => s.day) || []),
    [submissions?.data]
  );

  const days = useMemo(
    () =>
      Array.from({ length: CHALLANGE_DATA.durationInDays }, (_, i) => i + 1),
    []
  );

  async function onSubmit(data: FormValues) {
    try {
      const res = await submit.mutateAsync({
        day: Number.parseInt(data.day),
        link: data.link,
        summary: data.summary,
      });

      toast.success(res.message);
      form.reset();
      router.push("?tab=my-submissions");
      setStep(1);
    } catch (error) {
      toast.error(parseError(error));
    }
  }

  const handleNext = async () => {
    const isValid = await form.trigger("day");
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <Card className="max-w-xl border-none shadow-none bg-transparent mx-auto">
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="sr-only">Select Day</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-4 sm:grid-cols-5 gap-3"
                      >
                        {days.map((day) => {
                          const isSubmitted = submittedDays.has(day);
                          const isDisabled =
                            day > currentDayNumber || isSubmitted;

                          return (
                            <FormItem key={day} className="space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value={day.toString()}
                                  id={`day-${day}`}
                                  disabled={isDisabled}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={`day-${day}`}
                                className={cn(
                                  "relative flex cursor-pointer aspect-square flex-col items-center justify-center rounded-xl border-2 border-muted bg-card py-4 text-center transition-all hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary shadow-sm",
                                  isDisabled &&
                                  "cursor-not-allowed opacity-40 hover:bg-card hover:text-muted-foreground",
                                  isSubmitted &&
                                  "border-primary/20 bg-primary/5 text-primary opacity-60"
                                )}
                              >
                                <span className="text-xl font-bold">{day}</span>
                                {isSubmitted && (
                                  <div className="absolute top-1 right-1">
                                    <CheckCircle2 className="size-4 text-primary" />
                                  </div>
                                )}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Select the day you want to submit your progress for. You
                      can only submit for today or past days. If you want to
                      resubmit your progress for a previous day, delete the
                      previous submission and submit again.
                    </FormDescription>
                    <FormMessage />

                    <Card className="p-2! text-muted-foreground text-sm">
                      <p>

                        If you’re confused about what to write, what things to include, or which tags to use, you can see a sample post <Link className="text-primary underline inline" href={"/sample.jpeg"} target="_blank">
                          here

                        </Link>.
                      </p>
                    </Card>

                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full mt-4"
                    >
                      Next Step
                    </Button>
                  </FormItem>
                )}
              />
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4" /> Post Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/posts/..."
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FlaskConical className="h-4 w-4" /> Learning Summary
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe what you learned today..."
                            className="min-h-[120px] bg-background resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="verifySponsor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal cursor-pointer">
                            I have mentioned{" "}
                            <a
                              href={SPONSOR.linkeinUrl}
                              target="_blank"
                              className="font-medium text-primary hover:underline underline-offset-4"
                              rel="noreferrer"
                            >
                              {SPONSOR.name}
                            </a>{" "}
                            in my post.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="verifyMyDetails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal cursor-pointer">
                            I have mentioned{" "}
                            <a
                              href={APP_CONFIG.linkedinUrl}
                              target="_blank"
                              className="font-medium text-primary hover:underline underline-offset-4"
                              rel="noreferrer"
                            >
                              {APP_CONFIG.name}
                            </a>{" "}
                            in my post.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="verifyHashtags"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal cursor-pointer">
                            I have used these hashtags:{" "}
                            <span className="font-medium text-muted-foreground block mt-1">
                              {CHALLANGE_DATA.postHashtags.join(" ")}
                            </span>
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="verifyGuidelines"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background/50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal cursor-pointer">
                            I acknowledge I have not posted anything that
                            violates the guidelines.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-1/3"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-2/3"
                    isLoading={submit.isPending}
                  >
                    Submit Progress
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
