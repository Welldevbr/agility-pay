export function CardHeader() {
  return (
    <div className="w-full flex flex-row items-center text-light py-6 px-8 mb-2 rounded-lg bg-zinc/80">
      <p className="basis-3/5">Data</p>
      <p className="basis-3/5">Descrição</p>
      <p className="basis-3/4">Transferência</p>
      <p className="basis-1/3">Ação</p>
    </div>
  );
}
