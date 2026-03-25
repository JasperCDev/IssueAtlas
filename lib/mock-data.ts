
export type TicketStatusVariants = "neutral" | "blue" | "green" | "yellow";

export type TicketStatus = {
  name: string;
  id: string;
  variant: TicketStatusVariants;
};


export const TICKET_TYPES = ["Bug", "Task", "Story", "Epic"] as const;


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
  {
    name: "IN TESTING",
    id: '3',
    variant: "yellow",
  },
];

export const STATUS_MAP_BY_ID = TICKET_STATUS_LIST.reduce<{ [key: string]: TicketStatus }>(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {},
);

export const STATUS_MAP_BY_NAME = TICKET_STATUS_LIST.reduce<{ [key: string]: TicketStatus }>(
  (acc, curr) => {
    acc[curr.name] = curr;
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
  type: typeof TICKET_TYPES[number];
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

const BASE_TICKETS: Ticket[] = [
  // TODO
  {
    id: "t0",
    title: "Set up board drag interactions",
    description: "Add baseline drag-and-drop behavior for board tickets.",
    priority: 0,
    statusId: "0",
    assignedId: 'u0',
    dueDate: new Date("2026-03-18"),
    type: "Bug",
  },
  {
    id: "t1",
    title: "Design ticket card layout",
    description: "Create Jira-style card structure with metadata and labels.",
    priority: 1,
    statusId: "0",
    assignedId: 'u1',
    dueDate: new Date("2026-03-21"),
    type: "Task",
  },
  {
    id: "t2",
    title: "Add keyboard drag support",
    description: "Support accessible keyboard movement between columns.",
    priority: null,
    statusId: "0",
    assignedId: null,
    dueDate: null,
    type: "Story",
  },
  {
    id: "t7",
    title: "Add ticket filtering by assignee",
    description: "Filter board cards based on the selected team member.",
    priority: 2,
    statusId: "0",
    assignedId: 'u2',
    dueDate: new Date("2026-03-24"),
    type: "Story",
  },
  {
    id: "t14",
    title: "Add swimlane grouping",
    description: "Group board tickets by assignee to improve visual scanning.",
    priority: 0,
    statusId: "0",
    assignedId: 'u3',
    dueDate: new Date("2026-03-29"),
    type: "Story",
  },
  {
    id: "t15",
    title: "Create ticket dependency links",
    description: "Allow tickets to reference blockers and related work items.",
    priority: 2,
    statusId: "0",
    assignedId: 'u4',
    dueDate: new Date("2026-03-30"),
    type: "Story",
  },
  {
    id: "t24",
    title: "Improve ticket search relevance",
    description: "Rank title and description matches for better quick-find.",
    priority: 1,
    statusId: "0",
    assignedId: 'u5',
    dueDate: new Date("2026-04-02"),
    type: "Bug",
  },
  // IN PROGRESS
  {
    id: "t3",
    title: "Optimize drag performance",
    description: "Reduce re-renders while dragging cards across columns.",
    priority: 2,
    statusId: "1",
    assignedId: 'u2',
    dueDate: new Date("2026-03-16"),
    type: "Task",
  },
  {
    id: "t9",
    title: "Support quick ticket creation",
    description: "Add inline form to create tickets directly in a column.",
    priority: 1,
    statusId: "1",
    assignedId: 'u0',
    dueDate: new Date("2026-03-22"),
    type: "Story",
  },
  {
    id: "t17",
    title: "Enable card estimate points",
    description: "Show and edit story points directly on ticket cards.",
    priority: 1,
    statusId: "1",
    assignedId: 'u5',
    dueDate: new Date("2026-03-25"),
    type: "Task",
  },
  {
    id: "t18",
    title: "Highlight overdue tickets",
    description: "Visually emphasize cards that are past their due date.",
    priority: 3,
    statusId: "1",
    assignedId: 'u3',
    dueDate: new Date("2026-03-12"),
    type: "Bug",
  },
  {
    id: "t26",
    title: "Build sprint burnup widget",
    description: "Show completed versus total scope across the active sprint.",
    priority: 2,
    statusId: "1",
    assignedId: 'u3',
    dueDate: new Date("2026-04-01"),
    type: "Epic",
  },
  {
    id: "t42",
    title: "Implement sprint goal field",
    description: "Add a dedicated goal input to the sprint creation form.",
    priority: 1,
    statusId: "1",
    assignedId: null,
    dueDate: new Date("2026-04-07"),
    type: "Story",
  },
  // IN TESTING
  {
    id: "t56",
    title: "Add sprint velocity chart",
    description: "Plot completed story points per sprint to surface velocity trends.",
    priority: 2,
    statusId: "3",
    assignedId: 'u0',
    dueDate: new Date("2026-04-05"),
    type: "Epic",
  },
  {
    id: "t58",
    title: "Create cumulative flow diagram",
    description: "Visualise the flow of tickets through each status over time.",
    priority: 1,
    statusId: "3",
    assignedId: 'u1',
    dueDate: new Date("2026-04-12"),
    type: "Task",
  },
  {
    id: "t59",
    title: "Fix drag-over column highlight",
    description: "Column highlight flickers when dragging a card over its own column.",
    priority: 2,
    statusId: "3",
    assignedId: 'u2',
    dueDate: new Date("2026-04-04"),
    type: "Bug",
  },
  {
    id: "t61",
    title: "Add sprint capacity planning",
    description: "Define per-user capacity for a sprint and visualise remaining headroom.",
    priority: 3,
    statusId: "3",
    assignedId: 'u4',
    dueDate: new Date("2026-04-16"),
    type: "Epic",
  },
  {
    id: "t62",
    title: "Add board column reordering",
    description: "Allow users to drag and rearrange board columns to match their workflow.",
    priority: 1,
    statusId: "3",
    assignedId: null,
    dueDate: new Date("2026-04-13"),
    type: "Story",
  },
  {
    id: "t66",
    title: "Add board usage analytics",
    description: "Track how frequently each column and feature is used by the team.",
    priority: 1,
    statusId: "3",
    assignedId: 'u3',
    dueDate: new Date("2026-04-15"),
    type: "Story",
  },
  {
    id: "t68",
    title: "Add board guest access",
    description: "Allow external stakeholders to view a board in read-only mode.",
    priority: 1,
    statusId: "3",
    assignedId: 'u5',
    dueDate: new Date("2026-04-20"),
    type: "Story",
  },
  // DONE
  {
    id: "t5",
    title: "Define board column settings",
    description: "Configure WIP limits and column-level automation rules.",
    priority: null,
    statusId: "2",
    assignedId: 'u1',
    dueDate: null,
    type: "Task",
  },
  {
    id: "t6",
    title: "Implement ticket badges",
    description: "Show priority, labels, and ticket key in card header.",
    priority: 1,
    statusId: "2",
    assignedId: 'u0',
    dueDate: new Date("2026-03-10"),
    type: "Task",
  },
  {
    id: "t12",
    title: "Implement activity timeline",
    description: "Display recent card updates and movement history.",
    priority: 0,
    statusId: "2",
    assignedId: 'u2',
    dueDate: new Date("2026-03-11"),
    type: "Story",
  },
  {
    id: "t21",
    title: "Add ticket watchlist",
    description: "Let users follow tickets and receive update notifications.",
    priority: 2,
    statusId: "2",
    assignedId: 'u5',
    dueDate: new Date("2026-03-20"),
    type: "Story",
  },
  {
    id: "t74",
    title: "Fix status badge color flash",
    description: "Status badge briefly renders the wrong colour during hydration.",
    priority: 3,
    statusId: "2",
    assignedId: 'u4',
    dueDate: new Date("2026-04-01"),
    type: "Bug",
  },
  {
    id: "t77",
    title: "Fix drag-drop on mobile",
    description: "Touch drag does not initiate consistently on iOS Safari.",
    priority: 3,
    statusId: "2",
    assignedId: null,
    dueDate: new Date("2026-04-03"),
    type: "Bug",
  },
];

export const TICKETS: Ticket[] = [
  ...BASE_TICKETS,
  ...BASE_TICKETS.map((ticket, index) => ({
    ...ticket,
    id: `t${1000 + index}`,
    title: `${ticket.title} (Copy 2)`,
  })),
  ...BASE_TICKETS.map((ticket, index) => ({
    ...ticket,
    id: `t${2000 + index}`,
    title: `${ticket.title} (Copy 3)`,
  })),
];
