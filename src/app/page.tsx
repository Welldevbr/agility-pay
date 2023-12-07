"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

import Logo from "@/assets/logo.svg";
import { Button } from "@/components";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import ReactLoad from "react-loading";

const schema = z.object({
  email: string().email("E-mail obrigatório!"),
  senha: string().min(1, "Senha obrigatória!"),
});

const initialData = {
  email: "",
  senha: "",
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  async function handleLogin(data: any) {
    try {
      setLoading(true);
      const res = await api.post("/login", {
        email: data.email,
        password: data.senha,
      });

      Cookie.set("auth_token", res.data.data.token, { expires: 7 });
      router.push("/dashboard");
      toast.success("Bem-vindo ao Agility Pay");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      // return toast.error(`${err.response?.data.message}`);
    } finally {
      setLoading(false);
    }
  }

  const login = watch("email");
  const senha = watch("senha");

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-sm h-screen flex flex-col justify-center gap-10">
        <div className="flex flex-col items-center justify-center">
          <Image src={Logo} alt="Logo" width={220} height={48} />
          <div className="text-white text-center mt-16">
            <h1 className="text-2xl font-bold mb-2">Bem-vindo ao AgilityPay</h1>
            <p className="text-base font-normal text-light">
              O seu parceiro financeiro
            </p>
          </div>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full space-y-4">
            <div>
              <label className="text-[#A6A0BB] text-sm font-normal">
                E-mail
              </label>
              <input
                type="text"
                className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-red-600  text-sm font-medium">
                    {errors.email.message}
                  </p>
                </div>
              )}
            </div>
            <div>
              <label className="text-[#A6A0BB] text-sm font-normal">
                Login
              </label>
              <input
                type="password"
                className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
                placeholder="Digite sua senha"
                {...register("senha")}
              />
              {errors.senha && (
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-red-600  text-sm font-medium">
                    {errors.senha.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" disabled={login === "" || senha === ""}>
            {loading ? (
              <ReactLoad
                type="bubbles"
                color="#FFFFFF"
                width={32}
                height={32}
              />
            ) : (
              "Acessar"
            )}
          </Button>
        </form>
        <button
          type="button"
          className="w-full text-white hover:text-purple-normal transition ease-in-out duration-300"
          onClick={() => router.push("/register")}
        >
          Cadastre-se
        </button>
      </div>
    </section>
  );
}
