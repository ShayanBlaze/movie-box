import React, { FC } from "react";

const MovieDetailSkeleton: FC = () => {
  return (
    <div className="animate-pulse">
      {/* Backdrop Skeleton */}
      <div className="w-full h-[50vh] sm:h-[60vh] bg-gray-800"></div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-32 sm:-mt-48">
        <div className="md:flex md:items-start md:space-x-8">
          {/* Poster Skeleton */}
          <div className="w-48 sm:w-64 mx-auto md:mx-0 shrink-0 bg-gray-700 h-72 sm:h-96 rounded-xl shadow-2xl"></div>

          {/* Details Skeleton */}
          <div className="mt-6 md:mt-0 flex-grow">
            <div className="h-10 bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2 mt-3"></div>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="h-8 w-24 bg-gray-700 rounded-full"></div>
              <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-11/12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;
