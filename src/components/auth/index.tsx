"use client";
import { directus } from "@/lib/directus";
import { useEffect } from "react";
import { LoginForm } from "./login";
import { useRouter, useSearchParams } from "next/navigation";
import { setAccessToken } from "@/services/helpers";
import { useAuth } from "@/hook/use-auth";
import useAuthForm from "@/hook/use-form";
import Modal from "../modal";


let first_send = false;
const AuthForm = () => {
  const params: any = useSearchParams();
  const router = useRouter();
  const callback = params.get("callback");
  const show = useAuthForm((state : any) => state.show);

  const setClose = () => {
    useAuthForm.setState({ show: "" });
  };

  const { getProfile, isLogin, profile } = useAuth();
  const loginByGoogle = async () => {
    try {
      const res: any = await directus.refresh();
      const { access_token, expires } = res;
      setAccessToken(access_token, expires);
      if (!access_token) return;
      await getProfile();
      if (window.location.pathname === "/") {
        router.push("/home");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (callback === "google") {
      loginByGoogle();
    }
  }, []);


  return (
    <Modal
      isOpen={show ? true : false}
      setOpen={setClose}
      className="bottom-0 left-0 md:left-1/2 md:bottom-1/2 md:-translate-x-1/2 md:translate-y-1/2"
    >
      <div className="p-4">
        <div className="w-full md:w-[20rem] md:min-w-[400px] mx-auto bg-white rounded-md p-6 relative">
          <LoginForm />
        </div>
      </div>
    </Modal>
  );
};

export default AuthForm;
