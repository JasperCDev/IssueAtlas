
export type TicketStatusVariants = "neutral" | "blue" | "green";

export type TicketStatus = {
  name: string;
  id: string;
  variant: TicketStatusVariants;
};



export const TICKET_STATUS_LIST: Array<TicketStatus> = [
  {
    name: "TODO",
    id: '0',
    variant: "neutral",
  },
  {
    name: "IN PROGRESS",
    id: '1',
    variant: "blue",
  },
  {
    name: "DONE",
    id: '2',
    variant: "green",
  },
];

export const STATUS_MAP_BY_ID = TICKET_STATUS_LIST.reduce<{ [key: string]: TicketStatus }>(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {},
);

export const PRIORITY_MAP: { [key: number]: string } = {
  0: "Low",
  1: "Medium",
  2: "High",
  3: "Critical",
};

export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  priority: number | null;
  statusId: string;
  assignedId: string | null;
  dueDate: Date | null;

};

export type User = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
}

export const USERS: User[] = [
  {
    id: 'u0',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
  },
  {
    id: 'u1',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
  },
  {
    id: 'u2',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
  }
];

export const TICKETS: Ticket[] = [
  {
    id: "t0",
    title: "Set up board drag interactions",
    description: "Add baseline drag-and-drop behavior for board tickets.",
    priority: 0,
    statusId: "0",
    assignedId: 'u0',
    dueDate: new Date("2026-03-18"),
  },
  {
    id: "t1",
    title: "Design ticket card layout",
    description: "Create Jira-style card structure with metadata and labels.",
    priority: 1,
    statusId: "0",
    assignedId: 'u1',
    dueDate: new Date("2026-03-21"),
  },
  {
    id: "t2",
    title: "Add keyboard drag support",
    description: "Support accessible keyboard movement between columns.",
    priority: null,
    statusId: "0",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t3",
    title: "Optimize drag performance",
    description: "Reduce re-renders while dragging cards across columns.",
    priority: 2,
    statusId: "1",
    assignedId: 'u2',
    dueDate: new Date("2026-03-16"),
  },

  {
    id: "t4",
    title: "Persist board ordering",
    description: "Save current board state to storage and restore on refresh.",
    priority: 1,
    statusId: "1",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t5",
    title: "Define board column settings",
    description: "Configure WIP limits and column-level automation rules.",
    priority: null,
    statusId: "2",
    assignedId: 'u1',
    dueDate: null,
  },
  {
    id: "t6",
    title: "Implement ticket badges",
    description: "Show priority, labels, and ticket key in card header.",
    priority: 1,
    statusId: "2",
    assignedId: 'u0',
    dueDate: new Date("2026-03-10"),
  },
  {
    id: "t7",
    title: "Add ticket filtering by assignee",
    description: "Filter board cards based on the selected team member.",
    priority: 2,
    statusId: "0",
    assignedId: 'u2',
    dueDate: new Date("2026-03-24"),
  },
  {
    id: "t8",
    title: "Create board empty-state text",
    description: "Show helpful text when a column has no tickets.",
    priority: null,
    statusId: "0",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t9",
    title: "Support quick ticket creation",
    description: "Add inline form to create tickets directly in a column.",
    priority: 1,
    statusId: "1",
    assignedId: 'u0',
    dueDate: new Date("2026-03-22"),
  },
  {
    id: "t10",
    title: "Track drag event analytics",
    description: "Record board movement events for usage insights.",
    priority: null,
    statusId: "1",
    assignedId: 'u1',
    dueDate: null,
  },
  {
    id: "t11",
    title: "Add board permissions model",
    description: "Prevent edits for read-only users on shared boards.",
    priority: 2,
    statusId: "1",
    assignedId: null,
    dueDate: new Date("2026-03-27"),
  },
  {
    id: "t12",
    title: "Implement activity timeline",
    description: "Display recent card updates and movement history.",
    priority: 0,
    statusId: "2",
    assignedId: 'u2',
    dueDate: new Date("2026-03-11"),
  },
  {
    id: "t13",
    title: "Document board keyboard shortcuts",
    description: "Provide a list of supported keyboard interactions.",
    priority: null,
    statusId: "2",
    assignedId: 'u1',
    dueDate: null,
  },
];
