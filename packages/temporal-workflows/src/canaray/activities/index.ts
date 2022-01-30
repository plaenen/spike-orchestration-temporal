export const createCanaryActivities = (prefix: string) => ({
  async greet(name: string): Promise<string> {
    return `Hello, ${prefix} ${name}!`;
  }
});
