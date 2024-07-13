export const getRequiredLabel = (label: string): string => `${label} *`;

export const getImportantLabel = (label: string) => {
  return (
    <>
      {label}
      <span className="text-red-500 text-xs ml-2 font-normal">(Importante)</span>
    </>
  );
};
