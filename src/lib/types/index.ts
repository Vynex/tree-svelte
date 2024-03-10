export interface Comment {
  value: string;
  expanded: boolean;
  children: Array<Comment>
}
