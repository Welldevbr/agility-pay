import { Initials } from "@/utils/Initials";

type ProfileProps = {
  name: string;
};

export function Profile({ name, ...props }: ProfileProps) {
  return (
    <div
      className="absolute text-sm font-bold top-0 right-0 w-[149px] h-full space-x-2 flex items-center justify-between px-4 py-2 rounded-full bg-dark"
      {...props}
    >
      <h2 className="text-purple-normal">{name}</h2>
      <span className=" flex items-center justify-center w-6 h-6 bg-purple-normal rounded-full">
        <p className="text-white text-xs leading-none">{Initials(name)}</p>
      </span>
    </div>
  );
}
