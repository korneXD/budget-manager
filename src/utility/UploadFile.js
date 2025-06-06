import axios from "axios";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
  console.log(formData.get(file));

  try {
    const response = await axios.post(url, formData);
    return { url: response.data.secure_url, id: response.data.public_id };
  } catch (error) {
    console.log(error);
  }
};
const url = "http://localhost:3000/post/";
//const url = 'https://blog-server-wwms.onrender.com/post/'
export const delPhoto = async (id) => {
  try {
    await axios.delete(url + id);
  } catch (error) {
    console.log(error);
  }
};
