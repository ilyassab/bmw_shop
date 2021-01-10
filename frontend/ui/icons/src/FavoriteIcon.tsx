import React from "react";
export const FavoriteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 23 20" fill="none" {...props}>
    <path
      d="M10.7864 4.13196L11.5 4.859L12.2136 4.13196L13.8978 2.41623C15.7513 0.527922 18.7487 0.527922 20.6022 2.41623C22.4659 4.31491 22.4659 7.40082 20.6022 9.29949L11.5 18.5725L2.39778 9.29949C0.534073 7.40082 0.534072 4.31491 2.39778 2.41623C4.25132 0.527922 7.24867 0.527922 9.10222 2.41623L10.7864 4.13196Z"
      stroke={props.color || "#262626"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
