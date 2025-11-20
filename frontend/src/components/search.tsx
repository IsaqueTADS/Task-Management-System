import { Input } from "./ui/input";

import { Search } from "lucide-react";

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFiltro = ({ value, setValue }: SearchProps) => {
  return (
    <div className="flex items-center gap-3 ">
      <Input
        type="text"
        className="w-[400px]"
        placeholder="Titulo da task..."
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
      />

      <Search className="h-15" />
    </div>
  );
};

export default SearchFiltro;
