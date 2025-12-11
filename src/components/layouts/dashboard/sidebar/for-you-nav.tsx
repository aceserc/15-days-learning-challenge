import { Calendar, FileBadge } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetMyParticipation } from "@/queries/participate/hooks";
import { Nav, type Navlink } from "./nav";

const FOR_YOU_LINKS: Navlink[] = [];

const ForYouNav = () => {
  const myParticipation = useGetMyParticipation();
  const [links, setLinks] = useState(FOR_YOU_LINKS);

  useEffect(() => {
    if (myParticipation.isLoading) return;
    if (!myParticipation.data?.data) {
      setLinks(() => [
        ...FOR_YOU_LINKS,
        {
          name: "Participate",
          url: "/participate",
          icon: Calendar,
        },
      ]);
    } else {
      setLinks(() => [
        ...FOR_YOU_LINKS,
        {
          name: "Submissions",
          url: "/submissions",
          icon: FileBadge,
        },
      ]);
    }
  }, [myParticipation.isLoading, myParticipation.data]);

  if (links.length === 0) return null;
  return <Nav link={links} label="For You" />;
};

export { ForYouNav };
