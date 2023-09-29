import { FC, useMemo } from "react";
import Image from "next/image";
import { Platform, VerifiedCheck } from "@/assets/icons";
import { MasonryCardProps, RatingVersions } from "@/types/MasonryCard";
import dynamic from "next/dynamic";
const Rating = dynamic(() => import("@/components/Rating"), {
  ssr: false
});

const VerifiedUser = () => {
  return (
    <div className="w-fit flex items-center gap-[5px]">
      <VerifiedCheck />
      <p className="text-sm text-success600">Verified user</p>
    </div>
  );
};

const MasonryCard: FC<MasonryCardProps> = ({
  reviewTitle,
  name,
  platform,
  review,
  avatarSrc,
  date,
  rating,
  role,
  verified
}) => {
  const NameSubtitle = useMemo(() => {
    return verified ? (
      <VerifiedUser />
    ) : role ? (
      <p className="text-sm text-gray-700">{role}</p>
    ) : null;
  }, []);

  const random = Math.floor(Math.random() * 3) + 1;

  const RatingComponent = useMemo(() => {
    return rating ? (
      <Rating version={random as RatingVersions} rating={rating} />
    ) : null;
  }, []);

  return (
    <>
      <div className="p-7 break-inside-avoid-column border m-5 border-gray-150 rounded-3xl max-w-[362px] flex flex-col gap-4 font-inter">
        <div id="header" className="flex items-center">
          <div className="flex items-center gap-[10px] w-4/5">
            <Image
              width={48}
              height={48}
              className="object-contain rounded-full"
              src={avatarSrc || "https://thispersondoesnotexist.com/"}
              alt="avatar"
            />
            <div>
              <h2 className="text-lg text-gray-700">{name}</h2>
              {NameSubtitle}
            </div>
          </div>
          <div className="w-1/5 flex justify-end">
            <Platform />
          </div>
        </div>
        {rating ? <div>{RatingComponent}</div> : null}
        {reviewTitle ? (
          <h2 className="text-[20px] text-gray-700 font-semibold">
            {reviewTitle}
          </h2>
        ) : null}
        <div className="text-base text-gray-700 leading-[30px]">{review}</div>
      </div>
    </>
  );
};

export default MasonryCard;
