import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvauw0des/auto/upload";
const SAGESHELF_UPLOAD_PRESET = "sageshelf_unsigned";

export const uploadFile = async (file, folderPath) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", SAGESHELF_UPLOAD_PRESET);
  formData.append("folder", folderPath);

  const response = await axios.post(CLOUDINARY_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.secure_url;
};
