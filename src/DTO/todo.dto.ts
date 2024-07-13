export interface CreateTaskDTO {
  name: string;
  description: string;
}
export interface UpdateTaskDTO {
  name: string | undefined;
  description: string | undefined;
  completedAt: string | undefined;
}
