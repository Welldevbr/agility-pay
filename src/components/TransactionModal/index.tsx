"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "..";

import { CloseIcon } from "..";
import Transfer from "@/assets/transfer.svg";
import useModalContext from "@/contexts/modalContext";
import { string, z } from "zod";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { formatToReais } from "@/utils/formatToReais";
import { useStore } from "@/store/app.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactLoad from "react-loading";
import Cookie from "js-cookie";

const schema = z.object({
  value: string(),
  pix: string().min(1, "Chave obrigatória!"),
  description: string().min(1, "Descrição obrigatória!"),
});

const initialData = {
  value: "",
  pix: "",
  description: "",
};

export function TransactionModal() {
  const [loading, setLoading] = useState(false);
  const { balance, setReload } = useStore();
  const token = Cookie.get("auth_token");

  const { setActive } = useModalContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  async function handleTransaction(data: any) {
    try {
      setLoading(true);

      await api.post(
        "/createTransaction",
        {
          key: data.pix,
          value: data.value,
          description: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReload(true);
      toast.success("Transferência realizada com sucesso.");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return toast.error(`${err.response?.data.message}`);
    } finally {
      setLoading(false);
      setActive(false);
    }
  }

  const value = watch("value");
  const pix = watch("pix");
  const description = watch("description");

  return (
    <div className="w-screen absolute z-50 flex -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 items-center justify-center h-screen bg-black/60 backdrop-blur">
      <div className="p-6 pb-8 relative flex flex-col gap-8 bg-darkAlt rounded-lg w-[432px] h-fit">
        <button
          className="group absolute end-6 top-6"
          onClick={() => setActive(false)}
        >
          <CloseIcon className="group-hover:stroke-red-500 transition ease-out duration-300" />
        </button>
        <span className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Transferir dinheiro</h2>
        </span>
        <form className="w-full" onSubmit={handleSubmit(handleTransaction)}>
          <div>
            <label className="text-[#A6A0BB] text-sm font-normal">
              Valor a ser transferido
            </label>
            <input
              type="text"
              className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
              placeholder="Digite aqui"
              {...register("value")}
            />
            <p className="text-light font-normal text-sm mt-2">
              Saldo: {formatToReais(Number(balance.balance))}
            </p>
            {errors.value && (
              <div className="flex items-center gap-1 mt-2">
                <p className="text-red-600  text-sm font-medium">
                  {errors.value.message}
                </p>
              </div>
            )}
          </div>

          <div className="w-full relative flex items-center justify-center h-10 before:absolute before:z-40 before:w-full before:bg-dark before:h-[1px]">
            <span className="w-10 h-10 bg-dark relative z-50 rounded-full flex items-center justify-center">
              <Image
                src={Transfer}
                width={24}
                height={24}
                alt="icone de transferência"
              />
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[#A6A0BB] text-sm font-normal">
                Digite a chave pix
              </label>
              <input
                type="text"
                className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
                placeholder="Digite aqui"
                {...register("pix")}
              />

              {errors.pix && (
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-red-600  text-sm font-medium">
                    {errors.pix.message}
                  </p>
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="text-[#A6A0BB] text-sm font-normal">
                Descrição
              </label>
              <input
                type="text"
                className="rounded-lg w-full h-14 bg-[#1C1924] text-white outline-none transition-all ease-in-out duration-300 focus:outline-2 focus:outline-indigo-500 rounded-2  px-4 mt-1 placeholder:font-normal placeholder:text-sm"
                placeholder="Digite aqui"
                {...register("description")}
              />

              {errors.description && (
                <div className="flex items-center gap-1 mt-2">
                  <p className="text-red-600  text-sm font-medium">
                    {errors.description.message}
                  </p>
                </div>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-8"
            disabled={value === "" || pix === "" || description === ""}
          >
            {loading ? (
              <ReactLoad
                type="bubbles"
                color="#FFFFFF"
                width={32}
                height={32}
              />
            ) : (
              "Realizar Transferência"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
