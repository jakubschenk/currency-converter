import Link from "next/link";
import { Bank } from "@/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";

type BankItemProps = {
  bank: Bank;
  params: Record<string, unknown>;
};

const BankItem = ({ bank, params }: BankItemProps) => {
  return (
    <Link
      href={{
        query: {
          ...params,
          bankId: bank.id.toString(),
        },
      }}
      scroll={false}
      prefetch={false}
    >
      <div className="flex gap-2 items-center justify-start">
        <img
          src={bank.logoUrl}
          alt={bank.id.toString()}
          width={32}
          height={32}
        />
        <span>{bank.name}</span>
      </div>
    </Link>
  );
};

export default BankItem;
