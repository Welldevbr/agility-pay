"use client";

import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { format } from "date-fns";

import { Button, CardHeader, TransactionCard } from "..";

import { api } from "@/services/api";
import { useStore } from "@/store/app.store";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useTransactionsContext from "@/contexts/transactionsContext";

type TransationProps = {
  account_receiver: string;
  account_sender: string;
  amount: string;
  created_at: string;
  description: string;
  id: number;
  sender_id: number;
  sender_name: string;
  type: string;
  updated_at: string;
};

export function TransactionList() {
  const [transactions, setTransactions] = useState<TransationProps[]>([]);
  const token = Cookie.get("auth_token");
  const { reload, setReload } = useStore();
  const [itensVisiveis, setItensVisiveis] = useState(4);

  const { setInputs, setOutputs } = useTransactionsContext();

  async function handleGetTransictions() {
    try {
      const { data } = await api.get("/listTransaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataInputs = data.data
        .filter((item: any) => item.type === "in" && Number(item.amount))
        .reduce((i: any, item: any) => i + Number(item.amount), 0);

      const dataOutputs = data.data
        .filter((item: any) => item.type === "out" && Number(item.amount))
        .reduce((i: any, item: any) => i + Number(item.amount), 0);

      setInputs(dataInputs);
      setOutputs(dataOutputs);

      setTransactions(data.data);
      setReload(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return toast.error(`${err.response?.data.message}`);
    }
  }

  const handleVerMais = () => {
    setItensVisiveis((prevItensVisiveis) => prevItensVisiveis + 5);
  };

  useEffect(() => {
    handleGetTransictions();
  }, [reload]);

  return (
    <div className="w-full flex flex-col gap-2">
      <CardHeader />
      {transactions &&
        transactions
          .slice(0, itensVisiveis)
          ?.map((item: any) => (
            <TransactionCard
              key={item.id}
              description={item.description}
              value={Number(item.amount)}
              type={item.type}
              date={format(
                new Date(item.created_at),
                "dd/MM/yyyy 'as' HH:mm:ss"
              )}
              sendId={item.id.toString()}
            />
          ))}

      {itensVisiveis < transactions.length && (
        <Button
          onClick={handleVerMais}
          className="min-w-16 mx-auto p-2"
          variant="action"
          size="lg"
        >
          Ver mais
        </Button>
      )}
    </div>
  );
}
