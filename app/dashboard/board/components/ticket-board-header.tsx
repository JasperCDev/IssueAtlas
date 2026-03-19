import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { ButtonFragment } from "@/components/ui/button-fragment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/mock-data";
import { RiUserLine } from "@remixicon/react";
import { UNASSIGNED_ASSIGNEE_ID } from "@/app/dashboard/board/components/ticket-board";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]?.toUpperCase() ?? ""}${lastName[0]?.toUpperCase() ?? ""}`;
}

export function TicketBoardHeader({
  users,
  selectedAssigneeIds,
  onAssigneeToggle,
  onAddTicketClick,
}: {
  users: User[];
  selectedAssigneeIds: string[];
  onAssigneeToggle: (assigneeId: string) => void;
  onAddTicketClick: () => void;
}) {
  const visibleUsers = users.slice(0, 5);
  const hiddenUsers = users.slice(5);
  const hiddenUsersCount = Math.max(users.length - visibleUsers.length, 0);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-1">
      <div className="flex flex-row gap-2 items-center">
        <Input
          type="search"
          placeholder="Search tickets"
          aria-label="Search tickets"
          className="max-w-sm"
        />
        <AvatarGroup className="gap-0.5">
          <button
            type="button"
            onClick={() => onAssigneeToggle(UNASSIGNED_ASSIGNEE_ID)}
            aria-pressed={selectedAssigneeIds.includes(UNASSIGNED_ASSIGNEE_ID)}
            aria-label="Filter by unassigned"
            title="Unassigned"
            className={cn(
              "rounded-full outline-none cursor-pointer",
              selectedAssigneeIds.includes(UNASSIGNED_ASSIGNEE_ID) &&
                "ring-1 ring-primary ring-offset-background",
            )}
          >
            <Avatar size="sm">
              <AvatarFallback>
                <RiUserLine size={14} />
              </AvatarFallback>
            </Avatar>
          </button>
          {visibleUsers.map((user) => {
            const isSelected = selectedAssigneeIds.includes(user.id);

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => onAssigneeToggle(user.id)}
                aria-pressed={isSelected}
                aria-label={`Filter by ${user.firstName} ${user.lastName}`}
                title={`${user.firstName} ${user.lastName}`}
                className={cn(
                  "rounded-full outline-none cursor-pointer",
                  isSelected &&
                    "ring-1 ring-primary ring-offset-background",
                )}
              >
                <Avatar size="sm">
                  <AvatarFallback userId={user.id}>
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </button>
            );
          })}
          {hiddenUsersCount > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <ButtonFragment
                    aria-label="Open assignee checklist"
                    className="inline-flex rounded-full"
                  />
                }
              >
                <AvatarGroupCount>+{hiddenUsersCount}</AvatarGroupCount>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Assignees</DropdownMenuLabel>
                  {hiddenUsers.map((user) => {
                    const isChecked = selectedAssigneeIds.includes(user.id);

                    return (
                      <DropdownMenuItem
                        key={user.id}
                        onClick={() => onAssigneeToggle(user.id)}
                        closeOnClick={false}
                        className="gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          tabIndex={-1}
                          className="pointer-events-none"
                        />
                        {user.firstName} {user.lastName}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </AvatarGroup>
      </div>
      <Button size="sm" type="button" onClick={onAddTicketClick}>Add Ticket</Button>
    </div>
  );
}
