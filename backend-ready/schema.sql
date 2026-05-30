create table links (
    id uuid primary key default gen_random_uuid(),
    alias text unique not null,
    long_url text not null,
    clicks integer default 0,
    created_at timestamp default now()
);
