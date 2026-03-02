import { auth } from "@/services/services.firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

export default function ButtonGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  async function signInWithGoogle() {
    try {
      const resul = await signInWithPopup(auth, provider);
      const user = resul.user.email;
      toast.success(user);
    } catch (err) {
      console.log("Err");
    }
  }
  return (
    <button
      className="w-full max-w-md bg-blue-500 py-1 mb-4 rounded flex gap-5 justify-center items-center "
      onClick={signInWithGoogle}
    >
      <img src={"/google-icon.png"} className="w-12 bg-white rounded-3xl p-2" />
      <span className="text-white font-bold">Continue com o google</span>
    </button>
  );
}
