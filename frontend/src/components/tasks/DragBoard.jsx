import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";

import TaskCard from "./TaskCard";

const columns = ["Pending", "In Progress", "Review", "Completed"];

function DraggableTask({ task, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
      data: {
        task
      }
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 999 : "auto"
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        onDelete={onDelete}
        onEdit={onEdit}
        dragListeners={listeners}
        dragAttributes={attributes}
      />
    </div>
  );
}

function DroppableColumn({ column, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column
  });

  return (
    <div
      ref={setNodeRef}
      className={`board-column ${isOver ? "column-over" : ""}`}
    >
      <h2>{column}</h2>
      <div className="column-tasks">{children}</div>
    </div>
  );
}

function DragBoard({ tasks, onMove, onDelete, onEdit }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((item) => item._id === taskId);

    if (!task) return;

    if (task.status !== newStatus) {
      onMove(taskId, newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map((column) => (
          <DroppableColumn key={column} column={column}>
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <DraggableTask
                  key={task._id}
                  task={task}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}

export default DragBoard;