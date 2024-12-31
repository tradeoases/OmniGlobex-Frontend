/**
 * @author Golgotha Aksanti
 *
 * @param {File} file
 * @return {string}
 */
export const getFileBase64 = async (file: File): Promise<string> => {
  const base64string = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) =>
      resolve((event.target?.result as string)?.split(",")[1]);
    reader.readAsDataURL(file);
  });

  return base64string;
};
