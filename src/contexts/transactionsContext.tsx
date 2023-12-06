"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

import { api } from "@/services/api";
import { TransactionProps } from "@/types/iconTypes";

type TransactionsProps = {
  transactions: TransactionProps[];
  activeDetails: boolean;
  seeMore: boolean;
  inputs: number;
  outputs: number;
  balanceValue: number;
  details: TransactionProps[];
  setActiveDetails: (value: boolean) => void;
  setSeeMore: (value: boolean) => void;
  setInputs: (value: number) => void;
  setOutputs: (value: number) => void;
  setBalanceValue: (value: number) => void;
  handleShowDetails: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsProps>(
  {} as TransactionsProps
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [activeDetails, setActiveDetails] = useState<boolean>(false);
  const [details, setDetails] = useState<TransactionProps[]>([]);
  const [inputs, setInputs] = useState<number>(0);
  const [outputs, setOutputs] = useState<number>(0);
  const [balanceValue, setBalanceValue] = useState<number>(0);

  const token = Cookie.get("auth_token");

  async function handleGetTransictions() {
    try {
      const { data } = await api.get("/listTransaction", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setTransactions(data.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return toast.error(`${err.response?.data.message}`);
    }
  }

  function handleShowDetails(id: string) {
    const data = transactions.filter((item) => item.id.toString() === id);
    setDetails(data);
  }

  useEffect(() => {
    handleGetTransictions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        activeDetails,
        seeMore,
        details,
        inputs,
        outputs,
        setSeeMore,
        setInputs,
        setOutputs,
        balanceValue,
        setBalanceValue,
        setActiveDetails,
        handleShowDetails,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export default function useTransactionsContext() {
  const value = useContext(TransactionsContext);

  return value;
}
