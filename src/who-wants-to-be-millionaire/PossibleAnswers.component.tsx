export const PossibleAnswers = () => {
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900">
        <span className="text-orange-500">A:</span> Third-Driven Development
      </div>
      <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900">
        <span className="text-orange-500">B:</span> Test-Driven Development
      </div>
      <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900">
        <span className="text-orange-500">C:</span> Test-Deep Development
      </div>
      <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900">
        <span className="text-orange-500">D:</span> Test-Driven Design
      </div>
    </div>
  );
};
