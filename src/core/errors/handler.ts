export class AppError extends Error {
  public code: string;
  public isOperational: boolean;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', isOperational: boolean = true) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const ErrorHandler = {
  handle: (error: any) => {
    if (error instanceof AppError) {
      // Handle known operational errors (e.g. show toast, log to analytics)
      console.warn(`[Operational Error]: ${error.code} - ${error.message}`);
    } else {
      // Handle unknown/programming errors
      console.error(`[Critical Error]:`, error);
      // Send to Crashlytics / Sentry
    }
  }
};
