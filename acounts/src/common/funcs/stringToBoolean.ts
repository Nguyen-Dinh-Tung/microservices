export const stringToBoolean = (string: string) => {
  const boolean = {
    false: false,
    true: true,
  };
  return boolean[string];
};
