import { Card, CardContent } from "./ui/card";

interface SponsorCardProps {
  name: string;
  href?: string;
  banner?: string;
  logo?: string;
}

const SponsorCard = ({ name, href, logo }: SponsorCardProps) => {
  return (
    <Card className="min-w-xs overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0 flex items-center gap-4 bg-card/50">
        <div className="h-16 w-16 shrink-0 bg-muted flex items-center justify-center">
          {logo ? (
            <img src={logo} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground">Logo</span>
          )}
        </div>
        <div className="p-4 pl-0">
          <p className="font-semibold">{name}</p>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:underline"
            >
              Visit Website
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { SponsorCard };
