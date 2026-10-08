function SkeletonCard() {
    return (
        <div className="glass-card w-full h-20 grid p-4 gap-2">
            <div className="h-4 bg-gray-200 w-20 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-200 w-10 rounded-md animate-pulse"></div>
        </div>
    )
}

export default SkeletonCard