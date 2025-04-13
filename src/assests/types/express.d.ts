declare namespace Express {
    export interface Request {
      file?: Express.Multer.File;  // Add the 'file' property
    }
  }
  