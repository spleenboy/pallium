export default function uid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b);
}
