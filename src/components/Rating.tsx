import { Star } from "@/assets/icons";
import { RatingType, RatingVersions } from "@/types/MasonryCard";
import { FC } from "react";
import dynamic from "next/dynamic";

const AppSumo = dynamic(() => import("@/assets/icons/AppSumo"), {
  ssr: false
});

type RatingProps = {
  version: RatingVersions;
  rating: RatingType;
};

const Rating: FC<RatingProps> = ({ version, rating }) => {
  const RatingItem = ({ version }: { version: RatingVersions }) => {
    switch (version) {
      case 1:
        return <Star />;
      case 2:
        return <Star color="blue" />;
      case 3:
        return <AppSumo />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: rating }, (_, index) => (
        <RatingItem key={index} version={version} />
      ))}
    </div>
  );
};

export default Rating;
