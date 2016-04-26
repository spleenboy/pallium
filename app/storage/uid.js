export const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function uid(length = 16) {
  return 'x'.repeat(length).replace(/[x]/g, c => {
    return pool[Math.floor(Math.random() * pool.length)];
  });
}
