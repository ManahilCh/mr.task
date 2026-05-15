const generateTaskSuggestions = ({ title = "", description = "" }) => {
  const text = `${title} ${description}`.toLowerCase();

  let priority = "Medium";
  let estimatedHours = 4;

  if (text.includes("urgent") || text.includes("asap") || text.includes("deadline")) {
    priority = "Urgent";
    estimatedHours = 2;
  } else if (text.includes("api") || text.includes("backend") || text.includes("database")) {
    priority = "High";
    estimatedHours = 6;
  } else if (text.includes("ui") || text.includes("design")) {
    priority = "Medium";
    estimatedHours = 3;
  }

  return {
    aiName: "Mr.Task AI Butler",
    summary: `AI analyzed "${title}" and prepared a smart execution plan.`,
    suggestedPriority: priority,
    estimatedHours,
    suggestedChecklist: [
      "Understand requirement clearly",
      "Break task into smaller steps",
      "Assign responsible team member",
      "Set deadline",
      "Complete implementation",
      "Test functionality",
      "Move task to Review",
      "Mark Completed after approval"
    ],
    automation: [
      "If deadline is near, mark task as Urgent",
      "If checklist is completed, move task to Review",
      "If task is overdue, notify manager",
      "Send email reminder one day before due date"
    ]
  };
};

module.exports = { generateTaskSuggestions };