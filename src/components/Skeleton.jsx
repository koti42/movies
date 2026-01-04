const SkeletonCard = () => {
    return (
        <div className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0">
            <div className="skeleton aspect-[2/3] rounded-lg" />
        </div>
    );
};

const SkeletonRow = () => {
    return (
        <div className="mb-8 md:mb-12">
            <div className="skeleton h-8 w-48 mb-4 mx-4 md:mx-12 rounded" />
            <div className="flex gap-2 md:gap-4 px-4 md:px-12">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
};

const SkeletonHero = () => {
    return (
        <div className="relative h-[50vh] md:h-[80vh] bg-netflix-gray animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-12 max-w-2xl">
                <div className="skeleton h-12 w-3/4 mb-4 rounded" />
                <div className="skeleton h-20 w-full mb-6 rounded" />
                <div className="flex gap-4">
                    <div className="skeleton h-12 w-32 rounded" />
                    <div className="skeleton h-12 w-32 rounded" />
                </div>
            </div>
        </div>
    );
};

const SkeletonGrid = ({ count = 20 }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-12">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="skeleton aspect-[2/3] rounded-lg" />
            ))}
        </div>
    );
};

export { SkeletonCard, SkeletonRow, SkeletonHero, SkeletonGrid };
