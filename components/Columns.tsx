import React from "react";
import { ColumnCard } from "./ColumnCard";
import { AddColumn } from "./AddColumn";
import { Column as ColumnType } from "@/types/types";
import { DragDropContext } from "react-beautiful-dnd";
import { useStore } from "@/lib/store";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { generateKeyBetween } from "fractional-indexing";

export const Columns = ({ columns }: { columns: ColumnType[] }) => {
  const supabase = getSupabaseClient();
  const [allCols, allTasks, addTask] = useStore((state) => [
    Object.values(state.columns).filter(
      (col) => col.boardid === state.currentBoard
    ),
    Object.values(state.tasks),
    state.addTask,
  ]);

  const handleDragEnd = async (e: any) => {
    try {
      const destinationColumnIndex = e.destination.droppableId;
      const destinationColumnUID = allCols[destinationColumnIndex]?.id;
      const newPositionIndex = e.destination.index;
      const destinationColumnTasksArray = allTasks.filter(
        (task) => task.columnid === destinationColumnUID
      );
      const draggedTaskUID = parseInt(e.draggableId);
      const draggedTaskObject = allTasks.find(
        (task) => task.id === draggedTaskUID
      );

      const calculateBelowPosition = () => {
        if (
          destinationColumnTasksArray[newPositionIndex - 1]?.position ===
            undefined ||
          destinationColumnTasksArray[newPositionIndex - 1]?.position === null
        ) {
          return "a0";
        }
        return destinationColumnTasksArray[newPositionIndex - 1]?.position;
      };

      const calculateAbovePosition = () => {
        if (
          destinationColumnTasksArray[newPositionIndex]?.position ===
            undefined ||
          destinationColumnTasksArray[newPositionIndex]?.position === null
        ) {
          return null;
        }
        return destinationColumnTasksArray[newPositionIndex]?.position;
      };

      const itemBelowPositionValue = calculateBelowPosition();
      const itemAbovePositionValue = calculateAbovePosition();

      let draggedItemNewPositionValue;
      try {
        draggedItemNewPositionValue = generateKeyBetween(
          itemBelowPositionValue,
          itemAbovePositionValue
        );
      } catch (err) {
        console.log(err);
        draggedItemNewPositionValue = "a0";
      }

      const updatedTask = {
        ...draggedTaskObject!,
        columnid: destinationColumnUID!,
        position: draggedItemNewPositionValue!,
      };

      addTask(updatedTask);

      try {
        await supabase
          .from("task")
          .update(updatedTask)
          .eq("id", draggedTaskUID);
      } catch (error) {
        console.log(error);
        addTask({ ...draggedTaskObject! });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {columns && columns.length > 1 ? (
        columns.map((column, idx) => (
          <ColumnCard id={column.id} key={idx} pos={idx} />
        ))
      ) : (
        <AddColumn />
      )}
    </DragDropContext>
  );
};
