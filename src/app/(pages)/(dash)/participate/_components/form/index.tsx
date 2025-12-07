"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { participateAction } from "@/app/actions/participate";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DOMAINS } from "@/content/domains";

const formSchema = z.object({
  domain: z.string().min(1, "Please select a domain."),
  agreeToRules: z.boolean().refine((val) => val === true, {
    message: "You must agree to the rules to participate.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ParticipationForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      agreeToRules: false,
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const result = await participateAction(data.domain);

      if (result.success) {
        toast.success("You have successfully enrolled in the challenge!");
        // Optional: Redirect or update UI state here if needed,
        // though the server action already revalidates.
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Select your Domain</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {DOMAINS.map((domain) => (
                      <FormItem key={domain.id} className="space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value={domain.id}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                          <domain.icon className="mb-3 h-6 w-6" />
                          <div className="text-center">
                            <div className="font-semibold">{domain.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {domain.description}
                            </div>
                          </div>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeToRules"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the rules and regulations</FormLabel>
                    <FormDescription>
                      By checking this box, you agree to follow the{" "}
                      <Link
                        href="/guidelines"
                        className="text-primary underline"
                        target="_blank"
                      >
                        rules and guidelines
                      </Link>{" "}
                      of the 15-Day Learning Challenge.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Enrolling..." : "Submit & Enroll"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
