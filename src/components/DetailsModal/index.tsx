"use client";

import { format } from "date-fns";
import { CloseIcon } from "..";
import useTransactionsContext from "@/contexts/transactionsContext";
import { formatToReais } from "@/utils/formatToReais";

export function DetailsModal() {
  const { details, setActiveDetails } = useTransactionsContext();

  return (
    <div className="w-screen absolute z-50 flex -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 items-center justify-center h-screen bg-black/60 backdrop-blur">
      {details.map((item) => (
        <div
          key={item.id}
          className="p-6 pb-8 relative flex flex-col gap-8 bg-darkAlt rounded-lg w-[432px] min-h-[394px]:"
        >
          <button
            className="group absolute end-6 top-6"
            onClick={() => setActiveDetails(false)}
          >
            <CloseIcon className="group-hover:stroke-red-500 transition ease-out duration-300" />
          </button>
          <span className="flex flex-col items-center mb-8">
            <h2 className="text-xl font-bold">Detalhes da Transferência</h2>
            <p className="text-light text-xs font-normal">
              {format(new Date(item.created_at), "dd/MM/yyyy - HH:mm:ss")}
            </p>
          </span>
          <ul className="space-y-6">
            <li className="w-full flex items-center justify-between">
              <h4 className="text-light text-base font-normal">
                Proprietário da conta
              </h4>
              <p className="text-base font-medium text-white">
                {item.sender_name}
              </p>
            </li>
            <li className="w-full flex items-center justify-between">
              <h4 className="text-light text-base font-normal">
                Número da conta
              </h4>
              <p className="text-base font-medium text-white">
                {item.account_sender}
              </p>
            </li>
            <li className="w-full flex items-center justify-between">
              <h4 className="text-light text-base font-normal">Destinatario</h4>
              <p className="text-base font-medium text-white">
                {item.account_receiver}
              </p>
            </li>
            <li className="w-full flex items-center justify-between">
              <h4 className="text-light text-base font-normal">
                Valor da transferência
              </h4>
              <p className="text-base font-medium text-white">
                {formatToReais(Number(item.amount))}
              </p>
            </li>
            <li className="w-full flex items-center justify-between">
              <h4 className="text-light text-base font-normal">
                Data da transferência
              </h4>
              <p className="text-base font-medium text-white">
                {format(new Date(item.created_at), "dd'/'MM'/'yyyy")}
              </p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
