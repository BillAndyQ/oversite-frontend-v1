import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FloatingInput, FloatingLabel } from '@/app/components/floating-label-input';

interface SearchInputProps {
  filtro: string;
  setFiltro: (value: string) => void;
}

export default function SearchInput({ filtro, setFiltro }: SearchInputProps) {
  return (
    <div className="flex w-full items-center gap-2 mb-4">


      <div className="relative w-full">
        <FloatingInput id="floating-customize"
          value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full" />
        <FloatingLabel htmlFor="floating-customize">Buscar empresa...</FloatingLabel>
      </div>
    </div>
  );
}
