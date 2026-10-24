CREATE ROLE library_staff 
WITH LOGIN PASSWORD 'postgres';

--The library_staff role has the LOGIN privilege and a password.
--I successfully connected to PostgreSQL using this role. 
--In contrast, library_guest cannot log in because it was 
--created without the LOGIN privilege.