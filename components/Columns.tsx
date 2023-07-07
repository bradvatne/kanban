import React from "react";
import Column from "./Column";
import { AddColumn } from "./AddColumn";
import { Column as ColumnType } from "@/types/types";

export const Columns = ({ columns }: { columns: ColumnType[] }) => {
  if (columns && columns.length > 1) {
    return columns.map((column) => <Column id={column.id} key={column.id} />);
  } else return <AddColumn />;

};
