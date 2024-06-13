import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  //form gönderme
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //kaydol modunda hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error("Bir sorun oluştu: " + err.code));
    } else {
      // giriş modunda hesaba giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesaba giriş yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("Bir sorun oluştu: " + err.code);
          if (err.code === "auth/invalid-credential") setIsError(true);
        });
    }
  };

  //şifremi unuttum basıldığında
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.info(
          "Şifre sıfırlama epostası gönderildi. Mailinizi kontrol edin"
        )
      )
      .catch((err) => toast.error("Bir hata oluştu" + err.code));
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Hesaba giriş yapıldı");
        navigate("/home");
      })
      .catch((err) => toast.error("Bir sorun oluştu: " + err.code));
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[70px]" src="/x-logo.webp" alt="" />
        </div>

        <h1 className="text-lg font-bold text-center">Twitter'a giriş yap</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black  whitespace-nowrap"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          Google ile Giriş Yap
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />

          <label className="mt-5">Şifre</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />

          <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kaydolun" : "Giriş Yapın"}
          </button>
        </form>
        <p className="mt-5">
          <span className="text-gray-500">
            {isSignUp ? "Hesabınız Varsa" : "Hesabınız yoksa"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="ms-2 text-blue-500 cursor-pointer"
          >
            {isSignUp ? "Giriş Yapın" : "Kaydolun"}
          </span>
        </p>
        {isError && (
          <p
            onClick={handleReset}
            className="text-red-500 text-center cursor-pointer"
          >
            Şifrenizi mi unuttunuz ?
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
