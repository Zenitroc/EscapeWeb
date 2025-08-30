create table users (
  id uuid primary key,
  email text unique not null,
  tier text default 'free'
);

create table subscriptions (
  user_id uuid references users(id) on delete cascade,
  tier text not null,
  stripe_sub text,
  primary key(user_id)
);

create table cases (
  id serial primary key,
  slug text unique not null,
  title text not null,
  tier text not null
);

create table puzzles (
  id serial primary key,
  case_id int references cases(id) on delete cascade,
  slug text unique not null,
  solution_regex text not null
);

create table attempts (
  id serial primary key,
  user_id uuid references users(id) on delete cascade,
  puzzle_id int references puzzles(id) on delete cascade,
  seed text,
  outcome text check (outcome in ('clean','with_hints','abandoned')),
  created_at timestamptz default now()
);

create table submissions (
  id serial primary key,
  attempt_id int references attempts(id) on delete cascade,
  answer text,
  correct boolean,
  created_at timestamptz default now()
);

create table hints (
  id serial primary key,
  attempt_id int references attempts(id) on delete cascade,
  used_at timestamptz default now()
);

create table teams (
  id serial primary key,
  name text,
  join_code text unique
);

create table team_members (
  team_id int references teams(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  primary key(team_id, user_id)
);

create table messages (
  id serial primary key,
  room_id int references teams(id) on delete cascade,
  user_id uuid references users(id),
  content text,
  created_at timestamptz default now()
);

create table downloads (
  id serial primary key,
  user_id uuid references users(id),
  case_id int references cases(id),
  downloaded_at timestamptz default now()
);

create index on attempts(user_id);
create index on messages(room_id);
