import { FC } from "react";

export const FavoriteSkeletonCard: FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-[2/3] w-full bg-gray-700"></div>
    </div>
  );
};
