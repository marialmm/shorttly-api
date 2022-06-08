CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES "users" ("id"),
    "token" text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
    "id" SERIAL PRIMARY KEY,
    "url" text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer NOT NULL DEFAULT 0,
    "userId" integer NOT NULL REFERENCES "users" ("id"),
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);