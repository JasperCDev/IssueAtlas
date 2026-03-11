
export const API_TICKET_PRIORITIES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;

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

export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: number;
  statusId: string;
  assignedId: string | null;
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
    priority: API_TICKET_PRIORITIES.LOW,
    statusId: "0",
    assignedId: 'u0',
  },
  {
    id: "t1",
    title: "Design ticket card layout",
    description: "Create Jira-style card structure with metadata and labels.",
    priority: API_TICKET_PRIORITIES.MEDIUM,
    statusId: "0",
    assignedId: 'u1',
  },
  {
    id: "t2",
    title: "Add keyboard drag support",
    description: "Support accessible keyboard movement between columns.",
    priority: API_TICKET_PRIORITIES.HIGH,
    statusId: "0",
    assignedId: null,
  },
  {
    id: "t3",
    title: "Optimize drag performance",
    description: "Reduce re-renders while dragging cards across columns.",
    priority: API_TICKET_PRIORITIES.HIGH,
    statusId: "1",
    assignedId: 'u2',
  },

  {
    id: "t4",
    title: "Persist board ordering",
    description: "Save current board state to storage and restore on refresh.",
    priority: API_TICKET_PRIORITIES.MEDIUM,
    statusId: "1",
    assignedId: null,
  },
  {
    id: "t5",
    title: "Define board column settings",
    description: "Configure WIP limits and column-level automation rules.",
    priority: API_TICKET_PRIORITIES.LOW,
    statusId: "2",
    assignedId: 'u1',
  },
  {
    id: "t6",
    title: "Implement ticket badges",
    description: "Show priority, labels, and ticket key in card header.",
    priority: API_TICKET_PRIORITIES.MEDIUM,
    statusId: "2",
    assignedId: 'u0',
  },
];
