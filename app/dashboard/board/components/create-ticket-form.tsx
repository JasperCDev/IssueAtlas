"use client";

import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TICKET_STATUS_LIST, TICKET_TYPES, USERS } from "@/lib/mock-data";

export type CreateTicketInput = {
  title: string;
  description: string | null;
  statusId: string;
  priority: number | null;
  assignedId: string | null;
  dueDate: Date | null;
  type: (typeof TICKET_TYPES)[number];
};

const SELECT_CLASS =
  "h-7 w-full rounded-md border border-input bg-input/20 px-2 text-xs/relaxed outline-none dark:bg-input/30";

export function CreateTicketForm({
  onCreateTicket,
  onClose,
}: {
  onCreateTicket: (input: CreateTicketInput) => void;
  onClose: () => void;
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      statusId: TICKET_STATUS_LIST[0]?.id ?? "0",
      priority: "1",
      assignedId: "",
      dueDate: "",
      type: "Task" as (typeof TICKET_TYPES)[number],
    },
    onSubmit: ({ value, formApi }) => {
      onCreateTicket({
        title: value.title.trim(),
        description: value.description.trim() || null,
        statusId: value.statusId,
        priority: value.priority === "" ? null : Number(value.priority),
        assignedId: value.assignedId === "" ? null : value.assignedId,
        dueDate: value.dueDate ? new Date(`${value.dueDate}T00:00:00`) : null,
        type: value.type,
      });
      formApi.reset();
      onClose();
    },
  });

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="flex-1 space-y-3 overflow-y-auto">
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) =>
              value.trim().length > 0 ? undefined : "Title is required",
          }}
        >
          {(field) => (
            <div className="grid gap-1.5">
              <Label htmlFor="new-ticket-title">Title</Label>
              <Input
                id="new-ticket-title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ticket title"
              />
              {field.state.meta.isTouched && field.state.meta.errors[0] ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className="grid gap-1.5">
              <Label htmlFor="new-ticket-description">Description</Label>
              <Textarea
                id="new-ticket-description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe the work"
                className="min-h-20"
              />
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="statusId">
            {(field) => (
              <div className="grid gap-1.5">
                <Label htmlFor="new-ticket-status">Status</Label>
                <select
                  id="new-ticket-status"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={SELECT_CLASS}
                >
                  {TICKET_STATUS_LIST.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <form.Field name="priority">
            {(field) => (
              <div className="grid gap-1.5">
                <Label htmlFor="new-ticket-priority">Priority</Label>
                <select
                  id="new-ticket-priority"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                  <option value="3">Critical</option>
                </select>
              </div>
            )}
          </form.Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="type">
            {(field) => (
              <div className="grid gap-1.5">
                <Label htmlFor="new-ticket-type">Type</Label>
                <select
                  id="new-ticket-type"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as (typeof TICKET_TYPES)[number],
                    )
                  }
                  className={SELECT_CLASS}
                >
                  {TICKET_TYPES.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <form.Field name="assignedId">
            {(field) => (
              <div className="grid gap-1.5">
                <Label htmlFor="new-ticket-assignee">Assignee</Label>
                <select
                  id="new-ticket-assignee"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="">Unassigned</option>
                  {USERS.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="dueDate">
          {(field) => (
            <div className="grid gap-1.5">
              <Label htmlFor="new-ticket-due-date">Due date</Label>
              <Input
                id="new-ticket-due-date"
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {(state) => (
            <Button
              type="submit"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              Create ticket
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
