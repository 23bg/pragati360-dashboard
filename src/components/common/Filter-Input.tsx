/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { Input } from "@/components/ui/input";

const FilterInput = ({ table }: any) => {
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
