export interface AnyObject {
  [key: string]: any;
}

export function isEmptyObject(obj: AnyObject) {
  return JSON.stringify(obj) === "{}";
}
