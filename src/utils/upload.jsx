import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";
import { toast } from "react-toastify";

//dosyayı storega a yükleme fonk
const upload = async (file) => {
  //dosya resim değilse veya dosya yoksa fonk durdur
  //dosya ismi image ile başlamıyorsa kontrolü
  if (!file?.type.startsWith("image") || !file) return null;

  //dosyanın yükleneceği konumun referansını alma
  const imageRef = ref(storage, v4() + file.name);

  try {
    //ref oluşturduğumuz konuma dosya yükle
    await uploadBytes(imageRef, file);

    //yüklenen dosyanın url sini alma
    return await getDownloadURL(imageRef);
  } catch (err) {
    toast.error("Resim yüklenirken bir hata oluştu.");
  }
};

export default upload;
