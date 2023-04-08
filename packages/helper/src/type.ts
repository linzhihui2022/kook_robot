export type FalseType = "" | 0 | false | null | undefined;
export const typedBoolean = <Value>(
  value: Value
): value is Exclude<Value, FalseType> => {
  return Boolean(value);
};

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
