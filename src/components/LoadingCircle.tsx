const LoadingCircle = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-b from-purple-600 to-transparent animate-spin">
        <div className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full"></div>
      </div>
      <div>Generating...</div>
    </div>
  );
};

export default LoadingCircle;
