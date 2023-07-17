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
  const [allCols, allTasks, removeTask, addTask] = useStore((state) => [
    Object.values(state.columns).filter(
      (col) => col.boardid === state.currentBoard
    ),
    Object.values(state.tasks),
    state.removeTask,
    state.addTask,
  ]);

  //handles optimistic logic for state + db updates according to drag events
  const handleDragEnd = async (e: any) => {
    try {
      const destinationColumnIndex = e.destination.droppableId;
      const destinationColumnUID = allCols[destinationColumnIndex]?.id;
      const newPositionIndex = e.destination.index;
      const destinationColumnTasksArray = allTasks.filter(
        (task) => task.columnid === destinationColumnUID
      );
      const draggedTaskUID = parseInt(e.draggableId);
      const draggedTaskObject = allTasks.filter(
        (task) => task.id === draggedTaskUID
      )[0];
      const calculateBelowPosition = () => {
        if (
          destinationColumnTasksArray[newPositionIndex - 1]?.position ===
          undefined
        ) {
          return null;
        }
        return destinationColumnTasksArray[newPositionIndex - 1]?.position;
      };

      const calculateAbovePosition = () => {
        if (
          destinationColumnTasksArray[newPositionIndex + 1]?.position ===
          undefined
        ) {
          return null;
        }
        return destinationColumnTasksArray[newPositionIndex + 1]?.position;
      };
      const itemBelowPositionValue = calculateBelowPosition();
      const itemAbovePositionValue = calculateAbovePosition();

      let draggedItemNewPositionValue = "a0";
      try {
        draggedItemNewPositionValue = generateKeyBetween(
          itemBelowPositionValue,
          itemAbovePositionValue
        );
      } catch (err) {
        draggedItemNewPositionValue = "a0";
      }
      addTask({
        ...draggedTaskObject,
        columnid: destinationColumnUID,
        position: draggedItemNewPositionValue!,
      });
      try {
        await supabase
          .from("task")
          .update({
            ...draggedTaskObject,
            columnid: destinationColumnUID,
            position: draggedItemNewPositionValue!,
          })
          .eq("id", draggedTaskUID);
      } catch (error) {
        console.log(error);
        addTask({ ...draggedTaskObject });
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
