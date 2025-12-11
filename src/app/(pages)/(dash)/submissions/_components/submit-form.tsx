"use client";

import { Button } from "@/components/ui/button";
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
import { CHALLANGE_DATA } from "@/content/data";
import {
  useGetMySubmissions,
  useSubmitDailyChallenge,
} from "@/queries/submissions/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, startOfDay } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { parseError } from "@/lib/parse-error";
import { useRouter } from "nextjs-toploader/app";

const formSchema = z.object({
  day: z.string().min(1, "Please select a day."),
  link: z.string().url("Please enter a valid URL."),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  verifyHashtags: z.boolean().refine((val) => val === true, {
    message: "You must use the required hashtags.",
  }),
  verifyMyDetails: z.boolean().refine((val) => val === true, {
    message: `You must mention ${CHALLANGE_DATA.myDetails.name} in your post.`,
  }),
  verifyGuidelines: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the guidelines.",
  }),
  // We'll manage sponsors verification as an array of booleans
  sponsors: z
    .array(z.boolean())
    .refine((items) => items.every((item) => item === true), {
      message: "You must mention all sponsors.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export const SubmitForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const submit = useSubmitDailyChallenge();
  const { data: submissions } = useGetMySubmissions();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      summary: "",
      verifyHashtags: false,
      verifyMyDetails: false,
      verifyGuidelines: false,
      sponsors: CHALLANGE_DATA.sponspors.map(() => false),
    },
  });

  // Calculate current day number relative to start date
  const today = startOfDay(new Date());
  const startDate = startOfDay(CHALLANGE_DATA.startDate);
  // differenceInDays returns integer difference.
  // If today == startDate, diff is 0, so Day 1.
  const currentDayNumber = differenceInDays(today, startDate) + 1;
  const submittedDays = submissions?.data?.map((s) => s.day) || [];

  async function onSubmit(data: FormValues) {
    try {
      const res = await submit.mutateAsync({
        day: parseInt(data.day),
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

  const days = Array.from(
    { length: CHALLANGE_DATA.durationInDays },
    (_, i) => i + 1
  );

  return (
    <div className="max-w-xl mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Day</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-5 gap-3"
                    >
                      {days.map((day) => {
                        const isSubmitted = submittedDays.includes(day);
                        const isDisabled =
                          day > currentDayNumber || isSubmitted;

                        return (
                          <FormItem
                            key={day}
                            className="flex items-center space-x-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={day.toString()}
                                id={`day-${day}`}
                                disabled={isDisabled}
                                className="peer sr-only "
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`day-${day}`}
                              className={cn(
                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer w-full aspect-square text-center",
                                isDisabled &&
                                  "opacity-50 cursor-not-allowed hover:bg-popover hover:text-muted-foreground",
                                isSubmitted &&
                                  "bg-primary/5 border-primary/20 text-muted-foreground"
                              )}
                            >
                              <span className="text-xl font-bold">{day}</span>
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Choose the day number corresponding to your submission. You
                    can only submit for current or past days. Days you have
                    already submitted are disabled.
                  </FormDescription>
                  <FormMessage />
                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full"
                    >
                      Next
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share a link to your post (LinkedIn)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What did you learn?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary of your learnings today..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm text-foreground">
                    Verification Checklist
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Please verify that you have followed the guidelines.
                  </p>
                </div>

                {CHALLANGE_DATA.sponspors.map((sponsor, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`sponsors.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            I have mentioned{" "}
                            <a
                              href={sponsor.href}
                              target="_blank"
                              className="font-semibold text-primary underline hover:text-primary/80"
                              rel="noreferrer"
                            >
                              {sponsor.name}
                            </a>{" "}
                            in my post.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name="verifyMyDetails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I have mentioned{" "}
                          <a
                            href={CHALLANGE_DATA.myDetails.href}
                            target="_blank"
                            className="font-semibold text-primary underline hover:text-primary/80"
                            rel="noreferrer"
                          >
                            {CHALLANGE_DATA.myDetails.name}
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I have used these hashtags:{" "}
                          <span className="font-medium text-muted-foreground">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I acknowledge I have not posted anything that violates
                          the guidelines.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-2/3"
                  isLoading={submit.isPending}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};
