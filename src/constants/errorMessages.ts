export const validationErrors = {
  fieldIsRequired(field: string) {
    return `The field "${field}" is required.`;
  },
  shortLength(field: string, length: number) {
    return `The "${field}" field must be at least of ${length} length.`;
  },
};
