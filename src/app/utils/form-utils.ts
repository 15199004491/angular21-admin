import { NgForm } from '@angular/forms';
export function generateCode(length: number = 12): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export function getCurrentDateTimeString(): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0];
  return `${dateStr} ${timeStr}`;
}

export function resetForm(form: NgForm | undefined): void {
  Promise.resolve().then(() => {
    form?.reset();
  });
}