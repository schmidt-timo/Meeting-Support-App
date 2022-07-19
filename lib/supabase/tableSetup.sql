-- REQUIRED TABLES FOR MEETINGS AND USERS

create table meetings (
  "id" varchar not null,
  "createdBy" text not null,
  "title" text not null,
  "startDate" timestamp with time zone not null,
  "endDate" timestamp with time zone not null,
  "location" text,
  "description" text,
  "agenda" json,
  "participants" json,
  "completed" boolean not null default false,
  "completedAt" timestamp with time zone,
  "agendaStatus" json not null default ('{}'),

  primary key (id)
);

create table users (
  "id" uuid not null,
  "name" text not null,
  "color" text not null,

  foreign key (id) references auth.users(id)
);

-- TABLE FOR NOTES, QUESTIONS AND FEEDBACK

create table meeting_notes (
  "id" uuid not null default uuid_generate_v4(),
  "meetingId" varchar not null,
  "createdBy" uuid not null,
  "content" text,

  primary key(id)
);

create table meeting_questions (
  "id" uuid not null default uuid_generate_v4(),
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "meetingId" varchar not null,
  "question" text not null,
  "upvotes" json not null default ('[]'),
  "answered" boolean not null default false,

  primary key (id)
)

create table meeting_feedback (
  "id" uuid not null default uuid_generate_v4(),
  "meetingId" varchar not null,
  "createdBy" uuid not null,
  "responses" json not null default ('[]'),

  primary key (id)
)

-- VIEW TO CHECK IF USERS ARE ALREADY REGISTERED IN THE APP

create view existing_users as
select users.id, name, color, accounts.email
from users
inner join auth.users as accounts
on users.id = accounts.id;

-- POLICIES FOR DATA STORAGE

create policy "Read access"
  on storage.objects for select
  using ( bucket_id = 'files' );

create policy "Insert access"
  on storage.objects for insert
  with check ( bucket_id = 'files' );

create policy "Delete access"
  on storage.objects for delete
  using ( bucket_id = 'files' );
