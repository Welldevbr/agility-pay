"use client";

import useModalContext from "@/contexts/modalContext";
import { Button, TransactionList } from "..";

export function TransactionsHistory() {
  const { setActive } = useModalContext();

  return (
    <section className="w-full flex flex-col gap-6 items-start bg-darkAlt rounded-lg p-6 mb-12">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Histórico de transações
        </h1>
        <Button size="md" onClick={() => setActive(true)}>
          Realizar transação
        </Button>
      </div>
      <ul className="w-full">
        <TransactionList />
      </ul>
    </section>
  );
}
