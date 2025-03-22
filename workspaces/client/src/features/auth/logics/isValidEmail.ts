export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  if (!email.includes('@')) return false;
  const [local] = email.split('@');
  if (local?.endsWith('.')) return false
  return /^[A-Z0-9_+-.]+@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(email);
};
