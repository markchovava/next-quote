export function trimString(str: string, num: number): string {
    if (!str) {
      return "";
    }
    return str.length > num ? str.substring(0, num) + "..." : str;
  }