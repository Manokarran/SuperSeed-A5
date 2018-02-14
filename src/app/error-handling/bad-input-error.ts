import { AppError } from "./app-error";

export class BadInputError implements AppError {
  constructor(public originalError?: any) {}
}
