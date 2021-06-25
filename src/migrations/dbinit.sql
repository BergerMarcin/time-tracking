CREATE TABLE tasks
(
    id     UUID PRIMARY KEY,
    name   VARCHAR(255) NOT NULL,
    start  TIMESTAMPTZ  NOT NULL,
    finish TIMESTAMPTZ
)
