export const formatMessage = (user: string, message: string) => {
    return {
      user,
      message,
      timestamp: new Date().toISOString(),
    };
  };
  