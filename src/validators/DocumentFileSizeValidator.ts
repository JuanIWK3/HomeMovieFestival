class DocumentFileSizeValidator {
  private fileSizeInBytes: number;
  private maxFileSizeInBytes = 20971520; // 20MB

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
