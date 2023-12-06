
import useTransactionsContext from "@/contexts/transactionsContext";
import { Button } from "..";

import { formatToReais } from '@/utils/formatToReais';

type TransictionCardProps = {
  description: string;
  value: number;
  type: string;
  date: string;
  sendId: string;
};

export function TransactionCard({
  description,
  value,
  type,
  date,
  sendId,
}: TransictionCardProps) {
  const { setActiveDetails, handleShowDetails } = useTransactionsContext();

  return (
    <div className="w-full text-white flex flex-row justify-center items-center py-6 px-8 rounded-lg bg-dark">
      <p className="basis-1/2">{date}</p>
      <p className="basis-3/5">{description}</p>
      <span
        className={`basis-1/2 ${
          type === 'in' ? 'text-green-500' : 'text-red-500'
        } `}
      >
        {`${
          type === 'out'
            ? `- ${formatToReais(value)}`
            : `${formatToReais(value)}`
        }`}
      </span>
      <Button
        onClick={() => {
          handleShowDetails(sendId);
          setActiveDetails(true);
        }}
        className="basis-2/5"
        variant="action"
        size="lg"
      >
        Ver detalhes
      </Button>
    </div>
  );
}
