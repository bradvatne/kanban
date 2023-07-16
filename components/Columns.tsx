import React from "react";
import { ColumnCard } from "./ColumnCard";
import { AddColumn } from "./AddColumn";
import { Column as ColumnType } from "@/types/types";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import { useStore } from "@/lib/store";
import { DropArgument } from "net";
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

  const handleDragEnd = async (e: any) => {
    try {
      const newCol = e.destination.droppableId;
      const newPos = e.destination.index;
      const currentCol = allCols[newCol]?.id;
      const filteredTasks = allTasks.filter(
        (task) => task.columnid === currentCol
      );
      const taskid = parseInt(e.draggableId);
      console.log("filteredtasks", filteredTasks);
      console.log("taskid", taskid);
      const movingTask = allTasks.filter((task) => task.id === taskid)[0];
      const taskBelowPosition = filteredTasks[newPos]?.position;
      const calculateBelowPosition = () => {
        if (!filteredTasks[newPos - 1]?.position) {
          return null;
        }
        return filteredTasks[newPos - 1]?.position;
      };

      const calculateAbovePosition = () => {
        if (!filteredTasks[newPos]?.position) {
          return null;
        }
        return filteredTasks[newPos]?.position;
      };
      const below = calculateBelowPosition();
      const above = calculateAbovePosition();
      console.log("below", below, "above", above);
      const newKey = generateKeyBetween(below, above);

      console.log("ADDING", {
        ...movingTask,
        columnid: currentCol,
        position: newKey,
      });

      addTask({ ...movingTask, columnid: currentCol, position: newKey! });
      try {
        const { data, error } = await supabase
          .from("task")
          .update({ ...movingTask, columnid: currentCol, position: newKey! })
          .eq("id", taskid);
      } catch (err) {
        console.log(err);
        addTask({ ...movingTask });
      }
    } catch (error) {
      console.log("", error);
    }
    //insert the new one
  };

  const logging = async (e: any) => {
    //get that column that is being dropped into
    const newCol = e.destination.droppableId;
    const newPos = e.destination.index;
    const currentCol = allCols[newCol]?.id;
    const filteredTasks = allTasks.filter(
      (task) => task.columnid === currentCol
    );
    const taskid = e.draggableId;
    const movingTask = filteredTasks.find((task) => task.id === taskid);
    console.log(parseInt(taskid));
    const taskBelowPosition = filteredTasks[newPos]?.position || null;
    const taskAbovePosition = filteredTasks[newPos + 1]?.position || null;
    const newKey = generateKeyBetween(taskBelowPosition, taskAbovePosition);
    console.log(
      "column id",
      currentCol,
      "\n task below",
      taskBelowPosition,
      "\n task above",
      taskAbovePosition
    );

    removeTask(taskid);
    addTask({ ...movingTask!, position: newKey });
    //use the array# to get the position of the items below and above the ones being dropped
    try {
      const { data, error } = await supabase
        .from("task")
        .delete()
        .eq("id", taskid);
    } catch (err) {
      console.log(err);
    }
    //delete the old one

    //insert the new one
    console.log(filteredTasks);
    console.log(e);
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
