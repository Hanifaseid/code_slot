-- PostgreSQL Initialization Script
-- Executed on container startup if data directory is empty

-- Enable standard UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Database initialization script completed successfully.';
END $$;
