import { FC } from "react";

type StarProps = {
  color?: "red" | "blue";
};

const Star: FC<StarProps> = ({ color = "red" }) => {
  const RED = "#FF492C";
  const BLUE = "#005EF6";

  const fillColor = color === "red" ? RED : BLUE;

  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="none">
        <g clipPath="url(#clip0_4661_70048)">
          <path
            d="M12 0L15.709 7.514L24 8.718L18 14.566L19.416 22.826L12 18.926L4.584 22.826L6 14.566L0 8.718L8.291 7.514L12 0Z"
            fill={fillColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_4661_70048">
            <rect width="24" height="23" fill="white" />
          </clipPath>
        </defs>
      </svg>
  );
};

export default Star;
