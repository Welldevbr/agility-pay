"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

import Logo from "@/assets/logo.svg";

import { Profile } from "./Profile";
import { Button } from "..";
import { LogoutIcon } from "../Icons/LogoutIcon";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { formatToReais } from "@/utils/formatToReais";
import { useStore } from "@/store/app.store";
import ReactLoad from "react-loading";
import useTransactionsContext from "@/contexts/transactionsContext";

type HeaderProps = {
  balance: string;
  user: string;
};

export function Header() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HeaderProps>({} as HeaderProps);
  const router = useRouter();
  const token = Cookie.get("auth_token");
  const { setBalance, reload, setReload } = useStore();

  const { setBalanceValue } = useTransactionsContext();

  async function handleLogout() {
    try {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Cookie.remove("auth_token");
      router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return toast.error(`${err.response?.data.message}`);
    }
  }

  async function handleLoadValue() {
    try {
      setLoading(true);
      const { data } = await api.get("/dadosConta", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(data.data);
      setBalance(data.data);
      setBalanceValue(data.data.balance);
      setReload(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return toast.error(`${err.response?.data.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleLoadValue();
  }, [reload]);

  return (
    <header className="mx-auto mb-6 py-6">
      <div className="w-full flex items-center justify-between">
        <Image src={Logo} alt="Logo do agility Pay" width={147} height={32} />
        <nav className="flex items-center gap-4">
          <div className="w-[258px] h-[40px] flex items-center rounded-full bg-zinc text-white text-sm font-bold px-4 py-[9.5px] space-x-2 relative">
            {loading ? (
              <ReactLoad type="spin" color="#FFFFFF" width={24} height={24} />
            ) : (
              <h2>{data.balance && formatToReais(Number(data.balance))}</h2>
            )}
            <Profile name={data.user} />
          </div>

          <Button variant="toggle" size="sm" onClick={handleLogout}>
            <LogoutIcon className="group-hover:stroke-red-600 transition ease-in-out duration-300" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
