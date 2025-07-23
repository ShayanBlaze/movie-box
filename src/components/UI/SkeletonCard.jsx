const SkeletonCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="animate-pulse">
        {/* Image Placeholder */}
        <div className="bg-gray-700 w-full h-96"></div>
        <div className="p-4">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
          {/* Overview Placeholder */}
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
          {/* Rating Placeholder */}
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-700 rounded-full w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
