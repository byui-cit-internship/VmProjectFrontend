# FrontEnd-VMproject

# Project Requirement:

1. Student have the ability to access/ request a VM through a user interface for a specific class.
2. Professors are able to provision a VM for the class that they are assigned to.
3. Student can only see what classes they are enrolled in.
4. Professor can only see the Class that they are enrolled in.
5. Professor can only change Vm status for Students that are in their own class.

# User Stories (Professors):

1. Professors signs In to application (Login page)
2. Professors sees a list of their classes
3. Professors is able to click one of their classes and see the Students in that class and the Vm status for that student.
4. Professors is able to add a class for specific section and also add a Canvas token to that class on that section.
5. Professor is able to click a button to change the status of the Vm on a specifc student.
6. Professor is able to change the VM status of all the students in a class for a specific section.
7. Professor is able to create and delete a Vm for their class.

# User Stories(Student):

1. Student signs into the application (Login Page)
2. Student sees a list of the class that they are enrolled in.
3. Student clicks on a class and then sees their Vm and the Status of that Vm for that class
4. Student can send a request to Professor to change the Status of the VM via email.

# NOTES

This repository is just for the front end.

Things that need to be finish:

- Work on the set up a template page. It needs to add the APIs.
- Connect the remainding APIs
- Create a documentation of your progress
-

# Common GIT COMMANDS

Git commands to the main branch:

1. git pull
2. git add .
3. git commit -m "message"
4. git push origin main

Git command to your branch:

1. git checkout -b nameOfbranch (this will switch to your branch or create a banch with that name and switch over to that branch)
2. git pull
3. git add .
4. git commit -m "message"
5. git push
   To switch back to main
6. git checkout main

To merge your branch to your Main

1. make sure you are on main
2. git merge nameofBranch

To delete branch

1. git branch -d nameOfbranch
