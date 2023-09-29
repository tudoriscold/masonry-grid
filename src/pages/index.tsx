import Masonry from "@/components/ReactMasonry";
import MasonryCard from "@/components/MasonryCard";
import gridData from "@/constants/gridData";
import { RatingType } from "@/types/MasonryCard";

export default function Home() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="bg-white">
      <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto max-w-[1600px] mx-auto">
        {gridData.map((review, index) => {
          return (
            <MasonryCard
              key={index}
              name={review.name}
              platform={review.platform}
              review={review.review}
              reviewTitle={review["review title"]}
              avatarSrc={review.photo}
              date={0}
              rating={Number(review.rating.split(" ")[0]) as RatingType}
              role={review.role}
              verified={index % 2 === 0 ? true : false}
            />
          );
        })}
      </Masonry>
    </div>
  );
}
