# SIMPLE TODO LISTS - FROM RUBY GARAGE

Working example on Heroku  [Link](https://todogarage.herokuapp.com/)

### SQL task

>Given tables:
>> tasks (id, name, status, project_id)
>> projects (id, name)

   1. get all statuses, not repeating, alphabetically ordered 
```SQL
SELECT DISTINCT status 
FROM tasks 
ORDER BY status ASC
```
   2. get the count of all tasks in each project, order by tasks count descending 
```SQL
SELECT *, (SELECT count(*) from tasks tT where tP.id = tT.project_id) as TaskCount 
FROM projects as tP 
ORDER BY TaskCount DESC
```
   3. get the count of all tasks in each project, order by projects names 
```SQL
SELECT *, (SELECT count(*) from tasks tT where tP.id = tT.project_id) as TaskCount
FROM projects as tP 
ORDER BY tP.name DESC
```
   4. get the tasks for all projects having the name beginning with “N” letter 
```SQL
SELECT * 
FROM tasks 
WHERE name LIKE 'N%'
```
   5. get the list of all projects containing the ‘a’ letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id=NULL 
```SQL
SELECT p.id, p.name as name, p.id as user_id, COUNT(t.project_id) as total 
FROM projects as p 
LEFT JOIN tasks as t on t.project_id=p.id 
WHERE p.name LIKE '%a%' 
GROUP BY p.id 
ORDER BY name
```
   6. get the list of tasks with duplicate names. Order alphabetically 
```SQL
SELECT name, COUNT(*) AS total 
FROM tasks 
GROUP BY name 
HAVING COUNT(name)>1 
ORDER BY total
```
   7. get the list of tasks having several exact matches of both name and status, from the project ‘Garage’. Order by matches count 
```SQL
SELECT t.name, COUNT(*) as total 
FROM tasks as t 
WHERE t.project_id = (SELECT id FROM projects WHERE name='Garage' LIMIT 1) 
GROUP BY t.name, t.status 
HAVING COUNT(name) > 1 
ORDER BY total
```
   8. get the list of project names having more than 10 tasks in status ‘completed’. Order by project_id 
```SQL
SELECT p.id, p.name as name, p.id as pid, COUNT(t.project_id) as total, COUNT(t.status) as statuses 
FROM projects as p 
LEFT JOIN tasks as t on t.project_id=p.id 
WHERE t.status = '1' 
GROUP BY p.id 
HAVING COUNT(t.status) > 10 
ORDER BY p.id
```
