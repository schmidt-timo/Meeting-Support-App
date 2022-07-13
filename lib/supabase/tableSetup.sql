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

  primary key (id)
);

create table users (
  id uuid not null,
  name text not null,
  color text not null,

  foreign key (id) references auth.users(id)
);

-- VIEW TO CHECK IF USERS ARE ALREADY REGISTERED IN THE APP

create  existing_users as
select users.id, name, color, accounts.email
from users
inner join auth.users as accounts
on users.id = accounts.id;

-- EXAMPLE DATA

insert into meetings (
    "createdBy",
    "title",
    "startDate",
    "endDate",
    "description",
    "location" 
)
values(
    'fff8b359-6024-4368-bba7-dafa9183e9c9',
    'Test Meeting',
    '2022-05-01T10:00:00',
    '2022-05-01T11:00:00',
    'This is a meeting description',
    'Meeting Room A'
);