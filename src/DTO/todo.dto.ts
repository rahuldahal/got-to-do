export interface CreateTaskDTO {
  name: string;
  description: string;
  username: string;
}
export interface UpdateTaskDTO {
  name: string | undefined;
  description: string | undefined;
  completedAt: string | undefined;
}
