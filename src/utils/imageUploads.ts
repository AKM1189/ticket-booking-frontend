export const handleUploadImg = async (file: File): Promise<string> => {
  const base64Image = await convertToBase64(file);
  if (!base64Image) throw new Error("Base64 conversion failed");

  const imageBase64 = base64Image.split(",")[1]; // remove data:image/...;base64,

  const formData = new FormData();
  formData.append("image", imageBase64);

  const response = await fetch(
    `${import.meta.env.VITE_IMG_SERVER_URL}?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!result.success) throw new Error("Image upload failed");
  console.log("Uploaded image URL:", result.data.url);
  return result.data.url;
};

const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Failed to convert to base64");
    };
    reader.onerror = () => reject("File reading failed");
    reader.readAsDataURL(file);
  });

export const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string,
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};
