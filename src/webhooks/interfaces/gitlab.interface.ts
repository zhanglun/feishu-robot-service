export interface Commit {
  id: string;
  message: string;
  title: string;
  timestamp: Date;
  url: string;
  author: Author;
  added: string[];
  modified: string[];
  removed: any[];
}

export interface Author {
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
  git_http_url: string;
  git_ssh_url: string;
  visibility_level: number;
}

export interface PushEventJSON {
  object_kind: string;
  event_name: string;
  before: string;
  after: string;
  ref: string;
  checkout_sha: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: Project;
  repository: Repository;
  commits: Commit[];
  total_commits_count: number;
}

export interface CommentEventJSON {
  object_kind: string;
  event_type: string;
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: ObjectAttributes;
}

export interface ObjectAttributes {
  id: number;
  note: string;
  noteable_type: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: null;
  line_code: string;
  commit_id: string;
  noteable_id: null;
  system: boolean;
  st_diff: StDiff;
  url: string;
}

export interface StDiff {
  diff: string;
  new_path: string;
  old_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export enum HookEventEnum {
  Push_Hook = 'Push Hook',
  Tag_Push_Hook = 'Tag Push Hook',
  Note_Hook = 'Note Hook',
  Merge_Request_Hook = 'Merge Request Hook',
}
export type HookEventType = `${HookEventEnum}`;
