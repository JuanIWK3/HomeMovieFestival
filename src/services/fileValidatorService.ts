interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

const fileTypes = ["jpg", "jpeg", "doc", "docx"];

async function validateFileSize(fileSize: number): Promise<ValidatorResponse> {
  const documentFileSizeValidator = (
    await import("../validators/DocumentFileSizeValidator")
  ).default;

  const validator = new documentFileSizeValidator(fileSize);
  const isValid = validator.validateFileSize();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

async function validateFileType(fileType: string): Promise<ValidatorResponse> {
  const fileTypeValidator = (await import("../validators/FileTypeValidator"))
    .default;

  const validator = new fileTypeValidator(fileType, fileTypes);
  const isValid = validator.validateFile();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

export { validateFileSize, validateFileType };
