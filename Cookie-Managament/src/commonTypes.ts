export type autoCast<T1, T2 extends {}> =
  | string
  | number
  | boolean
  | Date
  | Array<T1>
  | T2
  | null
  | undefined
