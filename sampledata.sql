create database if not exists `universal_table`;
use `universal_table`;



drop table if exists `universal_tables`;



create table `universal_tables` (
`dataset_id` varchar(100) primary key,
`dataset_name` varchar(100) not null,
`dataset_source` varchar(100) not null,
`dataset_source_id` varchar(100) not null,
`dataset_version` varchar(100) default "1.0",
`dataset_date` datetime,
`dataset_status` varchar(100) default "pending",
`dataset_content_type` varchar(100) default "csv",
`dataset_path` varchar(500) not null,
`dataset_comment` varchar(500) default null
);



drop table if exists `emp_data`;



create table `emp_data` (
`emp_id` varchar(100) primary key,
`emp_role` int default 0
);



drop table if exists `dataset_details`;



create table `dataset_details` (
`dataset_id` varchar(100),
`dataset_path_name` varchar(100) not null,
`emp_comments` varchar(500) default null
);



drop table if exists `source_verification_status`;



create table `source_verification_status` (
`source_id` varchar(100) primary key,
`date_verified` datetime default "2000-10-10 10:10:10"
);



drop table if exists `emp_proj_data`;



create table `emp_proj_data` (
`emp_id` varchar(100),
`dataset_id` varchar(100),
`emp_project_path_name` varchar(100) default null,
`emp_project_status` boolean default false,
`emp_comments` varchar(500) default null
);



insert into `universal_tables` (`dataset_id`, `dataset_name`, `dataset_source`, `dataset_source_id`, `dataset_version`, `dataset_date`, `dataset_status`, `dataset_content_type`, `dataset_path`, `dataset_comment`) values
("D1000", "covid_dataset_1", "aimedhubiiit", "1", "1.0", "2008-11-11 13:23:44", "pending", "xlsx", "../dataset_temp/covid1.zip", null),
("D1001", "covid_dataset_2", "aimedhubiiit", "1", "1.0", "2008-11-09 15:45:21", "pending", "xlsx", "../dataset_temp/covid2.zip", null),
("D1002", "covid_dataset_3", "aimedhubiiit2", "2", "1.0", "2008-11-11 11:12:01", "pending", "xlsx", "../dataset_temp/covid3.zip", null),
("D1003", "covid_dataset_4", "aimedhubiiit2", "2", "1.0", "2008-10-29 14:56:59", "pending", "xlsx", "../dataset_temp/covid4.zip", null),
("D1004", "covid_dataset_5", "aimedhubiiit2", "2", "1.0", "2008-12-11 13:23:44", "pending", "xlsx", "../dataset_temp/covid5.zip", null),
("D1005", "covid_dataset_6", "aimedhubiiit3", "3", "1.0", "2008-11-21 13:23:44", "pending", "xlsx", "../dataset_temp/covid6.zip", null),
("D1006", "covid_dataset_7", "aimedhubiiit3", "3", "1.0", "2008-11-22 13:23:44", "processing", "xlsx", "../dataset_temp/covid7.zip", null),
("D1007", "covid_dataset_8", "aimedhubiiit4", "4", "1.0", "2008-11-23 13:23:44", "approved", "xlsx", "../dataset_temp/covid8.zip", "Validates all criterion."),
("D1008", "covid_dataset_9", "aimedhubiiit4", "4", "1.0", "2008-11-24 13:23:44", "pending", "xlsx", "../dataset_temp/covid9.zip", null),
("D1009", "covid_dataset_10", "aimedhubiiit5", "5", "1.0", "2008-11-25 13:23:44", "pending", "xlsx", "../dataset_temp/covid10.zip", null),
("D1010", "covid_dataset_11", "aimedhubiiit5", "5", "1.0", "2008-11-19 13:23:44", "pending", "xlsx", "../dataset_temp/covid11.zip", null);



insert into `emp_data` (`emp_id`, `emp_role`) values
("E001", 0),
("E002", 0),
("E003", 0),
("E004", 0),
("E005", 0),
("E006", 0),
("E007", 0),
("E008", 0),
("E009", 0),
("E010", 0),
("M001", 1);



commit;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Admin@123';
-- flush privileges;universal_tables