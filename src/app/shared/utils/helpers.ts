export function camelCaseToRegularString(camelCaseString: string): string {
    const regularString = camelCaseString.replace(/([A-Z])/g, ' $1');

    return regularString.charAt(0).toUpperCase() + regularString.slice(1).trim();
}