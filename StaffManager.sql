drop database EmployeeManager;
create database EmployeeManager;
use EmployeeManager;

create table DType(
	idDType int primary key auto_increment,
    DName varchar(50)
);

create table Staffs(
	id int primary key auto_increment,
    name varchar(50),
    age int check (age between 18 and 65),
    department int,
    avatar varchar(255),
    foreign key (department) references DType(idDType)
);

insert into DType(DName)
values	('management'),
		('directorate'),
		('production department'),
		('human resources'),
		('finance and accounting department'),
		('marketing'),
        ('administrative offices');
        
insert into Staffs (name, age, department, avatar)
values	('Tùng', 27, 1, '/upload/avatar.jpg'),
		('Toàn', 25, 3, '/upload/avatar.jpg'),
		('Hiếu', 28, 3, '/upload/avatar.jpg'),
		('Hải', 44, 2, '/upload/avatar.jpg'),
		('Tuấn', 19, 7, '/upload/avatar.jpg'),
		('Kiên', 35, 4, '/upload/avatar.jpg'),
		('Linh', 18, 5, '/upload/avatar.jpg'),
		('Hà', 48, 2, '/upload/avatar.jpg'),
		('Hiền', 38, 6, '/upload/avatar.jpg');

DELIMITER $$
CREATE PROCEDURE `getAllStaff`()
BEGIN
	select S.id, S.name, S.age, D.DName
    from Staffs S
    join DType D
    on S.department = D.idDType;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getLimitStaff`(
	in size int,
    startWith int
)
BEGIN
	select S.id, S.avatar, S.name, S.age, D.DName
    from Staffs S
    join DType D
    on S.department = D.idDType
    order by S.name
    limit size offset startWith;
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getDetailStaff`(
	in id int
)
BEGIN
	select S.*, D.DName
    from Staffs S
    join DType D
    on S.department = D.idDType
    where id = S.id;
END$$

DELIMITER ;