import { useMemo, useState } from "react";
import { RiSearchLine, RiUserLine } from "@remixicon/react";

import { type User } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ButtonFragment } from "@/components/ui/button-fragment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function getInitials(user: User) {
  const first = user.firstName[0]?.toUpperCase() ?? "";
  const second = user.lastName[0]?.toUpperCase() ?? "";
  return `${first}${second}`;
}

export function BoardItemAssignee({
  users,
  assignedId,
}: {
  users: User[];
  assignedId: string | null;
}) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    assignedId,
  );
  const [query, setQuery] = useState("");

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return users.find((user) => user.id === selectedUserId) ?? null;
  }, [selectedUserId, users]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return users;

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, users]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <ButtonFragment
            aria-label="Open assignee details"
            className="inline-flex"
            data-interactive="true"
          />
        }
      >
        <Avatar size="sm">
          <AvatarFallback userId={selectedUser?.id}>
            {selectedUser ? (
              <span className="text-xs">{getInitials(selectedUser)}</span>
            ) : (
              <RiUserLine size="16" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" data-interactive="true">
        <div className="relative px-1 py-1" data-interactive="true">
          <RiSearchLine
            size="14"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search assignee"
            className="pl-7"
            data-interactive="true"
          />
        </div>

        {users[0] ? (
          <Button
            type="button"
            onClick={() => setSelectedUserId(users[0].id)}
            variant="link"
            data-interactive="true"
            size="sm"
            className="cursor-pointer"
          >
            assign to me
          </Button>
        ) : null}

        <DropdownMenuItem onClick={() => setSelectedUserId(null)}>
          Unassigned
        </DropdownMenuItem>
        {filteredUsers.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
          >
            {user.firstName} {user.lastName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
