import { ColumnsRow } from "@/types/supabase";
import React from "react";

const Column = ({ column }: { column: ColumnsRow }) => {
  return <div>{column.title}</div>;
};

export default Column;
