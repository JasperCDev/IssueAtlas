
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
  },
  {
    id: 'u3',
    firstName: 'Diana',
    lastName: 'Miller',
    email: 'diana.miller@example.com',
  },
  {
    id: 'u4',
    firstName: 'Ethan',
    lastName: 'Davis',
    email: 'ethan.davis@example.com',
  },
  {
    id: 'u5',
    firstName: 'Fiona',
    lastName: 'Wilson',
    email: 'fiona.wilson@example.com',
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
  {
    id: "t14",
    title: "Add swimlane grouping",
    description: "Group board tickets by assignee to improve visual scanning.",
    priority: 0,
    statusId: "0",
    assignedId: 'u3',
    dueDate: new Date("2026-03-29"),
  },
  {
    id: "t15",
    title: "Create ticket dependency links",
    description: "Allow tickets to reference blockers and related work items.",
    priority: 2,
    statusId: "0",
    assignedId: 'u4',
    dueDate: new Date("2026-03-30"),
  },
  {
    id: "t16",
    title: "Add archived column state",
    description: "Support hiding completed tickets in an archived board view.",
    priority: null,
    statusId: "0",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t17",
    title: "Enable card estimate points",
    description: "Show and edit story points directly on ticket cards.",
    priority: 1,
    statusId: "1",
    assignedId: 'u5',
    dueDate: new Date("2026-03-25"),
  },
  {
    id: "t18",
    title: "Highlight overdue tickets",
    description: "Visually emphasize cards that are past their due date.",
    priority: 3,
    statusId: "1",
    assignedId: 'u3',
    dueDate: new Date("2026-03-12"),
  },
  {
    id: "t19",
    title: "Add board activity summary",
    description: "Display daily counts for created, moved, and completed tickets.",
    priority: 1,
    statusId: "1",
    assignedId: 'u4',
    dueDate: new Date("2026-03-31"),
  },
  {
    id: "t20",
    title: "Support multi-select moves",
    description: "Move several selected cards to another status in one action.",
    priority: null,
    statusId: "1",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t21",
    title: "Add ticket watchlist",
    description: "Let users follow tickets and receive update notifications.",
    priority: 2,
    statusId: "2",
    assignedId: 'u5',
    dueDate: new Date("2026-03-20"),
  },
  {
    id: "t22",
    title: "Create board export JSON",
    description: "Export board data for backup and offline analysis.",
    priority: 0,
    statusId: "2",
    assignedId: 'u3',
    dueDate: null,
  },
  {
    id: "t23",
    title: "Add duplicate ticket action",
    description: "Allow creating a copy of a card including metadata.",
    priority: null,
    statusId: "2",
    assignedId: 'u4',
    dueDate: null,
  },
  {
    id: "t24",
    title: "Improve ticket search relevance",
    description: "Rank title and description matches for better quick-find.",
    priority: 1,
    statusId: "0",
    assignedId: 'u5',
    dueDate: new Date("2026-04-02"),
  },
  {
    id: "t25",
    title: "Add reusable card templates",
    description: "Save preset ticket content for common recurring tasks.",
    priority: 0,
    statusId: "0",
    assignedId: null,
    dueDate: null,
  },
  {
    id: "t26",
    title: "Build sprint burnup widget",
    description: "Show completed versus total scope across the active sprint.",
    priority: 2,
    statusId: "1",
    assignedId: 'u3',
    dueDate: new Date("2026-04-01"),
  },
  {
    id: "t27",
    title: "Add team load balancing hints",
    description: "Suggest reassignments when one user has too many active cards.",
    priority: 1,
    statusId: "2",
    assignedId: 'u4',
    dueDate: new Date("2026-03-28"),
  },
];
