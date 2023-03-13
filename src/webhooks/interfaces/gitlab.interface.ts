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

export interface Assignee {
  name: string;
  username: string;
  avatar_url: string;
}

export interface MergeRequest {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number;
  state: string;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  position: number;
  labels: Label[];
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  assignee: Assignee;
  detailed_merge_status: string;
}

export enum MergeRequestActionEnum {
  open = '发起',
  close = '关闭',
  reopen = '重新打开',
  update = '更新',
  approved = '审批通过',
  unapproved = '审批未通过',
  approval = '批准',
  unapproval = '不批准',
  merge = '合并',
}

export interface Issue {
  id: number;
  title: string;
  assignee_ids: any[];
  assignee_id: null;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: null;
  description: string;
  milestone_id: null;
  state: string;
  iid: number;
  labels: Label[];
}

export interface Snippet {
  id: number;
  title: string;
  content: string;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  expires_at: null;
  type: string;
  visibility_level: number;
}

export interface NoteEventJSON {
  object_kind: string;
  event_type: string;
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: NoteEventObjectAttributes;
  commit?: Commit;
  merge_request?: MergeRequest;
  issue?: Issue;
  snippet?: Snippet;
}

export interface NoteEventObjectAttributes {
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

export enum NoteActionEnum {
  Commit = 'Commit',
  MergeRequest = 'MergeRequest',
  Issue = 'Issue',
  Snippet = 'Snippet',
}
