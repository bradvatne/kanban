import React from "react";
import { ColumnCard } from "./ColumnCard";
import { AddColumn } from "./AddColumn";
import { Column as ColumnType } from "@/types/types";
import { DragDropContext } from "react-beautiful-dnd";

export const Columns = ({ columns }: { columns: ColumnType[] }) => {
  const handleDragEnd = (e: any) => {
    console.log(e);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {columns && columns.length > 1 ? (
        columns.map((column) => <ColumnCard id={column.id} key={column.id} />)
      ) : (
        <AddColumn />
      )}
    </DragDropContext>
  );
};
