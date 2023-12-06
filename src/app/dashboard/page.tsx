"use client";

import {
  BalanceCard,
  TransactionsHistory,
  TransactionModal,
} from "@/components";

import useModalContext from "@/contexts/modalContext";
import InputsIcon from "@/assets/inputsIcon.svg";
import OutputsIcon from "@/assets/outputsIcon.svg";
import useTransactionsContext from "@/contexts/transactionsContext";
import { DetailsModal } from "@/components/DetailsModal";
import { useEffect } from "react";

export default function Dashboard() {
  const { active } = useModalContext();
  const { activeDetails, inputs, outputs, balanceValue } =
    useTransactionsContext();

  return (
    <section className="w-full mx-auto flex flex-col gap-8 justify-center">
      <div className="grid gap-8 grid-cols-3 min-h-36">
        <BalanceCard icon={InputsIcon} title="Entradas" value={inputs} />
        <BalanceCard icon={OutputsIcon} title="Saídas" value={outputs} />
        <BalanceCard title="Total" value={balanceValue} />
      </div>
      <TransactionsHistory />
      {active && <TransactionModal />}
      {activeDetails && <DetailsModal />}
    </section>
  );
}
