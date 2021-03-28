export const to_YYYY_MM_DD = (date: Date): string => {
  return formatDate(
    new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    ).toISOString(),
  );
};

export const formatDate = (date: string): string => {
  return date.split('T')[0].trim();
};

export const toUTC = (date: Date): Date => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};
