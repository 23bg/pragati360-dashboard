import * as React from "react";
import { Table } from "@tanstack/react-table"; // Import Table type

import { Input } from "@/components/ui/input";

interface FilterInputProps<TData> {
  table: Table<TData>;
}

const FilterInput = <TData,>({ table }: FilterInputProps<TData>) => {
  return (
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
};

export default FilterInput;
