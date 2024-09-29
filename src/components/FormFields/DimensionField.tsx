interface DimensionFieldProps {
  width: number;
  height: number;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
}

const DimensionField: React.FC<DimensionFieldProps> = ({
  width,
  height,
  setWidth,
  setHeight,
}: DimensionFieldProps) => (
  <div className="flex justify-between mb-4">
    <div className="w-1/2 mr-2">
      <label className="block text-left mb-2 font-medium">Width</label>
      <input
        type="number"
        className="w-full border p-2 rounded"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
      />
    </div>

    <div className="w-1/2 ml-2">
      <label className="block text-left mb-2 font-medium">Height</label>
      <input
        type="number"
        className="w-full border p-2 rounded"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
    </div>
  </div>
);

export default DimensionField;
