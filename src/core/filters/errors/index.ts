type ErrorDocumentation = {
  code: string;
  message: string;
  description: string;
};

export const ERROR_CODES: { [key: string]: ErrorDocumentation } = {
  UNHANDLED_EXCEPTION: {
    code: 'OGTICAPIDGII-0001',
    message: 'Something went wrong with the server',
    description: 'Unhandled exception',
  },
};
