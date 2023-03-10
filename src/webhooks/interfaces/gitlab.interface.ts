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
  aaa: number;
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
  object_attributes: CommentEventObjectAttributes;
}

export interface CommentEventObjectAttributes {
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

export interface MergeEventJSON {
  object_kind: string;
  event_type: string;
  user: User;
  project: Project;
  repository: Repository;
  object_attributes: MergeEventObjectAttributes;
  labels: Label[];
  changes: Changes;
  assignees: User[];
  reviewers: User[];
}

export interface Changes {
  updated_by_id: UpdatedByID;
  updated_at: UpdatedAt;
  labels: Labels;
}

export interface Labels {
  previous: Label[];
  current: Label[];
}

export interface Label {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: Date;
  updated_at: Date;
  template: boolean;
  description: string;
  type: string;
  group_id: number;
}

export interface UpdatedAt {
  previous: string;
  current: string;
}

export interface UpdatedByID {
  previous: null;
  current: number;
}

export interface MergeEventObjectAttributes {
  id: number;
  iid: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_ids: number[];
  assignee_id: number;
  reviewer_ids: number[];
  title: string;
  created_at: Date;
  updated_at: Date;
  milestone_id: null;
  state: string;
  blocking_discussions_resolved: boolean;
  work_in_progress: boolean;
  first_contribution: boolean;
  merge_status: string;
  target_project_id: number;
  description: string;
  url: string;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  labels: Label[];
  action: string;
  detailed_merge_status: string;
}

export interface LastCommit {
  id: string;
  message: string;
  timestamp: Date;
  url: string;
  author: Author;
}

export enum MergeRequestActionEnum {
  open = 'open发起',
  close = 'close关闭',
  reopen = 'reopen重新打开',
  update = 'update更新',
  approved = 'approved审批通过',
  unapproved = 'unapproved审批未通过',
  approval = 'approval批准',
  unapproval = 'unapproval不批准',
  merge = 'merge合并',
}
