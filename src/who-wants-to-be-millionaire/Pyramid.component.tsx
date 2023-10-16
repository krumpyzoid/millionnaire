export const Pyramid = () => {
  return (
    <div className="mt-3 justify-center rounded-lg text-yellow-500">
      <div className="flex flex-col justify-center">
        <ul className="flex flex-col mx-auto">
          <li className="mb-3">1 MILLION €</li>
          <li className="mb-3">150.000 €</li>
          <li className="mb-3">500 €</li>
          <li className="mb-3">200 €</li>
          <li className="mb-3 text-white font-bold">
            <div className="p-2 rounded-full bg-orange-500">0 €</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
