export type TicketStatusVariants = "neutral" | "blue" | "green" | "yellow" | "violet";

export type TicketStatus = {
  name: string;
  id: string;
  variant: TicketStatusVariants;
};

export const TICKET_TYPES = ["Bug", "Task", "Story", "Epic"] as const;

export const TICKET_STATUS_LIST: Array<TicketStatus> = [
  {
    name: "TODO",
    id: "0",
    variant: "neutral",
  },
  {
    name: "IN PROGRESS",
    id: "1",
    variant: "blue",
  },
  {
    name: "PR REVIEW",
    id: "4",
    variant: "violet",
  },
  {
    name: "IN TESTING",
    id: "3",
    variant: "yellow",
  },
  {
    name: "DONE",
    id: "2",
    variant: "green",
  },
];

export const STATUS_MAP_BY_ID = TICKET_STATUS_LIST.reduce<Record<string, TicketStatus>>(
  (acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  },
  {},
);

export const STATUS_MAP_BY_NAME = TICKET_STATUS_LIST.reduce<Record<string, TicketStatus>>(
  (acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  },
  {},
);

export const PRIORITY_MAP: Record<number, string> = {
  0: "Low",
  1: "Medium",
  2: "High",
  3: "Critical",
};

export type User = {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
};

const PROJECT_DEFINITIONS = [
  { id: "atlas", code: "ATL", name: "Atlas Platform" },
  { id: "orbit", code: "ORB", name: "Orbit Commerce" },
  { id: "pulse", code: "PLS", name: "Pulse Growth" },
  { id: "forge", code: "FRG", name: "Forge Mobile" },
  { id: "harbor", code: "HBR", name: "Harbor Infrastructure" },
  { id: "lumen", code: "LMN", name: "Lumen AI" },
  { id: "shield", code: "SHD", name: "Shield Security" },
  { id: "northstar", code: "NTH", name: "Northstar Support" },
  { id: "summit", code: "SUM", name: "Summit Revenue Ops" },
  { id: "studio", code: "STD", name: "Studio Experience" },
] as const;

export type ProjectId = (typeof PROJECT_DEFINITIONS)[number]["id"];

export type Sprint = {
  id: string;
  name: string;
  start: Date;
  end: Date;
  isCurrent: boolean;
};

export type Project = {
  id: ProjectId;
  name: string;
  code: string;
  userIds: string[];
  currentSprintId: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  priority: number | null;
  statusId: string;
  assignedId: string | null;
  dueDate: Date | null;
  type: (typeof TICKET_TYPES)[number];
  projectId: ProjectId;
  sprintId: string;
};

const USERS_PER_PROJECT = 4;
const PAST_SPRINT_COUNT = 10;
const TOTAL_SPRINTS_PER_PROJECT = PAST_SPRINT_COUNT + 1;
const SPRINT_LENGTH_DAYS = 14;

const FIRST_NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "Grace",
  "Henry",
  "Isla",
  "Jack",
  "Maya",
  "Noah",
  "Olivia",
  "Liam",
  "Ava",
  "Mason",
  "Sophia",
  "Lucas",
  "Amelia",
  "Logan",
  "Harper",
  "Elijah",
  "Evelyn",
  "James",
  "Aria",
  "Benjamin",
  "Scarlett",
  "Daniel",
  "Chloe",
  "Matthew",
  "Layla",
  "Jackson",
  "Nora",
  "Sebastian",
  "Zoe",
  "Leo",
  "Mila",
  "Owen",
  "Hazel",
  "Julian",
] as const;

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Brown",
  "Miller",
  "Davis",
  "Wilson",
  "Taylor",
  "Moore",
  "Anderson",
  "Thomas",
  "Martinez",
  "Garcia",
] as const;

const ACTIONS = [
  "Refine",
  "Stabilize",
  "Automate",
  "Unify",
  "Expand",
  "Instrument",
  "Simplify",
  "Secure",
  "Reduce",
  "Rebalance",
  "Scale",
  "Accelerate",
] as const;

const SUBJECTS = [
  "workflow orchestration",
  "issue intake",
  "release controls",
  "handoff visibility",
  "reporting pipeline",
  "permission model",
  "search accuracy",
  "status transitions",
  "automation rules",
  "approval routing",
  "signal quality",
  "delivery tracing",
] as const;

const FOCUS_AREAS = [
  "cross-project planning",
  "sprint delivery",
  "customer escalation handling",
  "design system adoption",
  "deployment safety",
  "board usability",
  "forecast accuracy",
  "operational analytics",
  "self-serve reporting",
  "on-call resilience",
] as const;

const SURFACES = [
  "board interactions",
  "list workflows",
  "automation coverage",
  "release checklists",
  "dependency mapping",
  "execution telemetry",
  "capacity planning",
  "intake triage",
  "exception handling",
  "review loops",
] as const;

const OUTCOMES = [
  "faster triage",
  "clearer ownership",
  "lower rollover risk",
  "more predictable throughput",
  "better stakeholder visibility",
  "less manual cleanup",
  "tighter sprint scope",
  "cleaner handoffs",
  "safer launches",
  "higher signal quality",
] as const;

function startOfDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function addDays(value: Date, days: number): Date {
  const next = new Date(value);
  next.setDate(next.getDate() + days);
  return next;
}

function createRng(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createSeed(...parts: number[]): number {
  let seed = 0x9e3779b9;

  for (const part of parts) {
    seed ^= part + 0x7f4a7c15 + (seed << 6) + (seed >> 2);
    seed = Math.imul(seed, 0x85ebca6b) >>> 0;
  }

  return seed >>> 0;
}

function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function sample<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

function buildUserId(projectIndex: number, memberIndex: number): string {
  return `u${projectIndex * USERS_PER_PROJECT + memberIndex}`;
}

function extractTicketNumber(ticketId: string): number {
  const match = /(\d+)$/.exec(ticketId);
  return match ? Number.parseInt(match[1], 10) : 0;
}

export function formatTicketId(projectCode: string, ticketNumber: number): string {
  return `${projectCode}-${String(ticketNumber).padStart(3, "0")}`;
}

function createProjectUsers(projectIndex: number): User[] {
  return Array.from({ length: USERS_PER_PROJECT }, (_, memberIndex) => {
    const firstName = FIRST_NAMES[projectIndex * USERS_PER_PROJECT + memberIndex]!;
    const lastName = LAST_NAMES[(projectIndex + memberIndex) % LAST_NAMES.length]!;
    const id = buildUserId(projectIndex, memberIndex);
    const email = `${firstName}.${lastName}`.toLowerCase();

    return {
      id,
      firstName,
      lastName,
      email: `${email}@example.com`,
    };
  });
}

function createProjectSprints(): Sprint[] {
  const currentSprintStart = startOfDay(new Date());

  return Array.from({ length: TOTAL_SPRINTS_PER_PROJECT }, (_, sprintIndex) => {
    const sprintNumber = sprintIndex + 1;
    const isCurrent = sprintIndex === TOTAL_SPRINTS_PER_PROJECT - 1;
    const start = addDays(
      currentSprintStart,
      (sprintIndex - (TOTAL_SPRINTS_PER_PROJECT - 1)) * SPRINT_LENGTH_DAYS,
    );
    const end = addDays(start, SPRINT_LENGTH_DAYS - 1);

    return {
      id: `sprint-${sprintNumber}`,
      name: isCurrent ? `Sprint ${sprintNumber} Current` : `Sprint ${sprintNumber}`,
      start,
      end,
      isCurrent,
    };
  });
}

function createTicketTitle(rng: () => number): string {
  const action = sample(rng, ACTIONS);
  const subject = sample(rng, SUBJECTS);
  const focus = sample(rng, FOCUS_AREAS);

  return `${action} ${subject} for ${focus}`;
}

function createTicketDescription(rng: () => number, project: Project, sprint: Sprint): string | null {
  if (rng() < 0.14) {
    return null;
  }

  const surface = sample(rng, SURFACES);
  const outcome = sample(rng, OUTCOMES);

  return `${project.name} work in ${sprint.name.toLowerCase()} focused on ${surface} to drive ${outcome}.`;
}

function createProjectTickets(project: Project, sprints: Sprint[], projectIndex: number): Ticket[] {
  let nextTicketNumber = 1;

  return sprints.flatMap((sprint, sprintIndex) => {
    const rng = createRng(createSeed(projectIndex + 1, sprintIndex + 1, 2026));
    const baseTicketCount = sprint.isCurrent
      ? (12 + projectIndex * 8) * 3
      : (6 + ((projectIndex + sprintIndex) % 5) * 3) * 3;
    const ticketCount = Math.max(
      sprint.isCurrent ? 36 : 18,
      baseTicketCount + randomInt(rng, sprint.isCurrent ? -6 : -4, sprint.isCurrent ? 12 : 8),
    );

    return Array.from({ length: ticketCount }, () => {
      const ticketNumber = nextTicketNumber++;
      const statusRoll = rng();
      const statusId =
        statusRoll < 0.22
          ? STATUS_MAP_BY_NAME.TODO.id
          : statusRoll < 0.49
            ? STATUS_MAP_BY_NAME["IN PROGRESS"].id
            : statusRoll < 0.67
              ? STATUS_MAP_BY_NAME["PR REVIEW"].id
              : statusRoll < 0.83
                ? STATUS_MAP_BY_NAME["IN TESTING"].id
                : STATUS_MAP_BY_NAME.DONE.id;
      const assignedId =
        rng() < 0.16 ? null : sample(rng, project.userIds);
      const dueDate =
        rng() < 0.08
          ? null
          : statusId === STATUS_MAP_BY_NAME.DONE.id
            ? addDays(sprint.end, -randomInt(rng, 0, 5))
            : addDays(sprint.start, randomInt(rng, 1, SPRINT_LENGTH_DAYS + 3));

      return {
        id: formatTicketId(project.code, ticketNumber),
        title: createTicketTitle(rng),
        description: createTicketDescription(rng, project, sprint),
        priority: rng() < 0.1 ? null : randomInt(rng, 0, 3),
        statusId,
        assignedId,
        dueDate,
        type: sample(rng, TICKET_TYPES),
        projectId: project.id,
        sprintId: sprint.id,
      };
    });
  });
}

export const SPRINTS: Sprint[] = createProjectSprints();

const PROJECT_BLUEPRINTS = PROJECT_DEFINITIONS.map((definition, projectIndex) => {
  const userIds = Array.from({ length: USERS_PER_PROJECT }, (_, memberIndex) =>
    buildUserId(projectIndex, memberIndex),
  );
  const currentSprintId = SPRINTS[SPRINTS.length - 1]!.id;

  return {
    project: {
      id: definition.id,
      name: definition.name,
      code: definition.code,
      userIds,
      currentSprintId,
    } satisfies Project,
  };
});

export const PROJECT_LIST: Project[] = PROJECT_BLUEPRINTS.map((entry) => entry.project);

export const DEFAULT_PROJECT_ID: ProjectId = PROJECT_LIST[0]!.id;

export const USERS: User[] = PROJECT_BLUEPRINTS.flatMap((_, projectIndex) =>
  createProjectUsers(projectIndex),
);

export const TICKETS: Ticket[] = PROJECT_BLUEPRINTS.flatMap((entry, projectIndex) =>
  createProjectTickets(entry.project, SPRINTS, projectIndex),
);

export const BASE_TICKETS: Ticket[] = TICKETS;

const PROJECT_ID_SET = new Set<ProjectId>(PROJECT_LIST.map((project) => project.id));

const PROJECT_USERS_BY_ID = PROJECT_LIST.reduce<Record<ProjectId, User[]>>((acc, project) => {
  acc[project.id] = USERS.filter((user) => project.userIds.includes(user.id));
  return acc;
}, {} as Record<ProjectId, User[]>);

const PROJECT_SPRINTS_BY_ID = PROJECT_LIST.reduce<Record<ProjectId, Sprint[]>>(
  (acc, project) => {
    acc[project.id] = SPRINTS;
    return acc;
  },
  {} as Record<ProjectId, Sprint[]>,
);

const PROJECT_CURRENT_TICKETS_BY_ID = PROJECT_LIST.reduce<Record<ProjectId, Ticket[]>>(
  (acc, project) => {
    acc[project.id] = TICKETS.filter(
      (ticket) =>
        ticket.projectId === project.id && ticket.sprintId === project.currentSprintId,
    );
    return acc;
  },
  {} as Record<ProjectId, Ticket[]>,
);

const PROJECT_ALL_TICKETS_BY_ID = PROJECT_LIST.reduce<Record<ProjectId, Ticket[]>>(
  (acc, project) => {
    acc[project.id] = TICKETS.filter((ticket) => ticket.projectId === project.id);
    return acc;
  },
  {} as Record<ProjectId, Ticket[]>,
);

export function resolveProjectId(projectId: string | undefined): ProjectId {
  if (projectId && PROJECT_ID_SET.has(projectId as ProjectId)) {
    return projectId as ProjectId;
  }

  return DEFAULT_PROJECT_ID;
}

export function getProjectUsers(projectId: string | undefined): User[] {
  const resolved = resolveProjectId(projectId);
  return PROJECT_USERS_BY_ID[resolved] ?? [];
}

export function getProjectTickets(projectId: string | undefined): Ticket[] {
  const resolved = resolveProjectId(projectId);
  return PROJECT_CURRENT_TICKETS_BY_ID[resolved] ?? [];
}

export function getProjectAllTickets(projectId: string | undefined): Ticket[] {
  const resolved = resolveProjectId(projectId);
  return PROJECT_ALL_TICKETS_BY_ID[resolved] ?? [];
}

export function getProjectData(projectId: string | undefined) {
  const resolved = resolveProjectId(projectId);
  const project = PROJECT_LIST.find((item) => item.id === resolved) ?? PROJECT_LIST[0]!;
  const sprints = PROJECT_SPRINTS_BY_ID[resolved] ?? [];
  const currentSprint = sprints.find((sprint) => sprint.id === project.currentSprintId) ?? null;

  return {
    project,
    users: PROJECT_USERS_BY_ID[resolved] ?? [],
    tickets: PROJECT_CURRENT_TICKETS_BY_ID[resolved] ?? [],
    allTickets: PROJECT_ALL_TICKETS_BY_ID[resolved] ?? [],
    sprints,
    currentSprint,
  };
}

export function getLatestTicketNumber(ticketIds: string[]): number {
  return ticketIds.reduce((max, ticketId) => Math.max(max, extractTicketNumber(ticketId)), 0);
}