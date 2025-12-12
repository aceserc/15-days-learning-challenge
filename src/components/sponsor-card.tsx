import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SPONSOR } from "@/content/sponsor";
import { Heart } from "lucide-react";

const SponsorCard = () => {
  return (
    <Card className="gap-0! min-w-xs overflow-hidden border-2 border-primary/10 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Heart className="h-4 w-4 fill-primary text-primary" />
          Sponsored by
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <a
            href={SPONSOR.href}
            target="_blank"
            rel="noreferrer"
            className="block group"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary/40 transition-all">
              {SPONSOR.name}
            </h3>
          </a>
          <p className="text-xs text-muted-foreground">
            by{" "}
            <a
              href={SPONSOR.byHref}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline underline-offset-2"
            >
              {SPONSOR.byName}
            </a>
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
          {SPONSOR.tagline}
        </p>

        <div className="pt-2">
          <a
            href={SPONSOR.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center text-xs font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            Learn more →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export { SponsorCard };
