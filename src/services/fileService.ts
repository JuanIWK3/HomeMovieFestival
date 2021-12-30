interface UploadFileResponse {
  success: boolean;
  message: string;
}
class FileService {
  private file: File;
  constructor(file: File) {
    this.file = file;
  }
  static getFileExtension(fileName: string): string {
    const fileNames: Array<string> = fileName.split('.');
    if (fileNames.length === 0) {
      return '';
    }
    // console.log(fileNames[fileNames.length - 1]);

    return fileNames[fileNames.length - 1];
  }

  async uploadFile(): Promise<UploadFileResponse> {
    const uploadResponse = await fetch('', {
      method: 'POST',
      body: this.getFormData(),
    });

    return {
      success: true,
      message: '',
    };
  }

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append('file', this.file);
    return formData;
  }
}

export default FileService;
