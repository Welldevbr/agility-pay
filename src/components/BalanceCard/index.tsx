import Image from "next/image";

import DollarIcon from "@/assets/dollar.svg";
import { formatToReais } from "@/utils/formatToReais";

interface BalanceCardProps {
  icon?: string;
  title: string;
  value: number;
}

export function BalanceCard({ icon, title, value }: BalanceCardProps) {
  return (
    <div className="p-6 space-y-6 rounded-lg bg-darkAlt">
      <div className="flex justify-between">
        <p className="text-xl font-normal">{title}</p>
        <Image
          src={icon ? icon : DollarIcon}
          alt="Icone do card"
          width={24}
          height={24}
        />
      </div>
      <h2 className="text-[40px] font-bold">{formatToReais(value)}</h2>
    </div>
  );
}
