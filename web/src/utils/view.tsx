const mapToOutlinedBox = <T extends React.ReactNode = React.ReactNode>(args: {
  value?: Array<T>;
  preMap?: (t: T, index: number) => T;
}) => {
  const { value, preMap } = args;

  let valueToRender = value;

  if (preMap) {
    valueToRender = valueToRender?.map(preMap);
  }

  return valueToRender?.map((v, index) => (
    <div
      key={index}
      className="text-nowrap border border-gray-500 rounded-2xl px-1 text-center w-fit m-0.5"
    >
      {v}
    </div>
  ));
};

export interface KeyValueListItem {
  label: React.ReactNode;
  value?: React.ReactNode;
}
const keyValueList = (list: Array<KeyValueListItem>) => {
  return (
    <div className="flex flex-col gap-1">
      {list.map(({ label, value }, index) => {
        return (
          <div key={index} className="flex justify-between items-center">
            <div className="font-bold text-nowrap">{label}</div>
            {value && <div className="ml-2 text-nowrap">{value}</div>}
          </div>
        );
      })}
    </div>
  );
};

export const viewUtils = {
  mapToOutlinedBox,
  keyValueList,
};
