export const getFileImageSize = (file: File): Promise<{ width: number; height: number }> => {
  const imageUrl = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const img = new globalThis.Image();
    img.src = imageUrl;
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
  });
};
