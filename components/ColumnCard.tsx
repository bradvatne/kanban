"use client";
import React from "react";
import { useStore } from "@/lib/store";
import { TaskCard } from "./TaskCard";
import { AddFirstTask } from "./AddFirstTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sortArrayByPosition } from "@/lib/hooks";

export const ColumnCard = ({ id, pos }: { id: number; pos: number }) => {
  const tasks = useStore((state) =>
    Object.values(state.tasks).filter((task) => task.columnid === id)
  );
  const column = useStore((state) => state.getColumnById(id)(state));
  const test = useStore((state) => state.columns);
  const onDragEnd = () => {
    //do logic here
  };

  return (
    <Droppable droppableId={pos.toString()}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col gap-5 w-[17.5rem] overflow-y-auto scrollbar-hide shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-full w-[15px] h-[15px] ${column.color}`} />
            <span
              className="text-xs uppercase text-mediumgrey tracking-widest font-bold"
              onClick={() => console.log(column)}
            >
              {column.title} ({tasks?.length})
            </span>
          </div>
          {tasks.length > 0 ? (
            sortArrayByPosition(tasks).map((task, index) => (
              <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard id={task.id} key={task.id} />
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <AddFirstTask column={column.id} />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
