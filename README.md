# Group2 Team1
## Team Members -
* Prashant Raj, 2020201057
* Trisha Gupta, 2020201086
* Avi Agarwal, 2020201046

# Data entry verification workflow (NodeJS)
## Project Idea
The project aims to implement a tool, which when a dataset is uploaded to be published on the DFS website, validates the identity of the user/data they are uploading. The main aim is to create a portal which notifies the `DFS Manager` about a potential dataset upload and provides the manager with tools to distribute the dataset to multiple employees who can validate the records in the dataset based on multiple conditions. Having validated the dataset, it can be flagged to be uploaded on the main website.

## Project Functionalities
The project requires developing
* a web UI/portal to notify manager.
* a portal to validate/invalidate a record for employees.
* accessing/using the API to read/write the dataset from backend.
* a systematic flow of control for validation/invalidation of the records in the dataset.
* (an overall metric to determine if the quality of dataset is adequate or not to validate/invalidate the entire dataset as a whole.)

## Key Requirements (Top 5) 

1. UI -  
Dashboard like portal for managers/employee to review datasets. 

Authentication portal using API provided. 

2. Verification of datasets through checklist following required protocols as provided to us by DFS team.  

3. Final right of verdict for verification reserved by manager. 

4. Division of records for verification among employees as per their availability.  

5. Resolve dependencies from following project teams –  User authentication, Dataset versions, Record level view of dataset 


## Requirements Specification 

* Successful authentication of a manager (using API provided by Authentication team) will redirect to a dashboard containing dataset information as well as separate tabs for datasets that need to be verified, are in process of verification, and verified datasets. 

* For each dataset in the need-to-verified tab, there will be a hyperlink on each dataset that will allow the manager to view extensive information about the specific dataset such as number of records, number of files, difference checker among different versions, etc.  

* Datasets under need-to-be verified page depend on updates from Datasets Versions team. 

* Dataset information page will also provide utility for managers to verify authentication status of source of dataset. Only users with the latest clearance (verified using API provided by Authentication team) will be allowed to submit dataset for verification.  

* Load balancing will be used to partition records of the dataset for verification among employees to equalize workload.  

* Successful authentication of employees (using API provided by Authentication team) will redirect to a dashboard containing datasets that need to be verified by them. Protocols for manual verification will be provided in the form of a checklist with an optional comment box, based on input from DFS team. On completing the verification process, information will be sent to managers for final approval. 

* Employees can review record level data of the dataset (by coordinating with Record Level View of Data team). 

* Managers will have final approval for verification of datasets. Acknowledgement on success/failure of approval will be sent to user source of dataset as well as to Dataset Versions team. 

* Newer versions of existing datasets will require a difference checker to verify new records only. This will save time spent on double verification. 

* We are aiming for open-source availability of modular code for easy updating. 

## Project Deliverables
In order of priority:
* a portal to notify the manager on any new dataset/version upload, divide the work amongst employees, validate the dataset recordwise.
* to enable the user validation/verification functionality.
* metric to determine quality of dataset.

# Tech Stack
As discussed in the class, we will be using the `MERN` stack.

# Documentation/Resources planning to go through
* [Mern Stack YouTube](https://www.youtube.com/watch?v=7CqJlxBYj-M)
* [ReactJS](https://reactjs.org/tutorial/tutorial.html)
* [NodeJS](https://nodejs.dev/learn)
* [MongoDB](https://docs.mongodb.com/manual/tutorial/getting-started/)

# Collaboration with teams
* Team 6 - Publishing Datasets and Versions.