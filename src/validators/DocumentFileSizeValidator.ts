class DocumentFileSizeValidator {
  private fileSizeInBytes: number;
  private maxFileSizeInBytes = 4 * 1024 * 1024; // 4MB

  constructor(fileSize: number) {
    this.fileSizeInBytes = fileSize;
  }

  validateFileSize(): boolean {
    return this.fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage(): string {
    return "Maximum file size accepted is 20MB";
  }
}

export default DocumentFileSizeValidator;
