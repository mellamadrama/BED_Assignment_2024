CREATE TABLE Account (
  accId CHAR(10),
  username VARCHAR(100) NOT NULL UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  CONSTRAINT PK_Account PRIMARY KEY (accId)
);


INSERT INTO Account (accId, username, firstName, lastName, email, password)
VALUES
  ('Acc0000001', 'janetest', 'Jane', 'Test', 'janetest@email.com', 'test123456'),
  ('Acc0000002', 'dobbyfree', 'Dobby', 'Free', 'dobbyfree@email.com', 'test789123'),
  ('Acc0000003', 'junkaismith', 'Jun Kai', 'Smith', 'junkaismith@email.com', 'test789123'),
  ('Acc0000004', 'ethanchew', 'Ethan', 'Chew', 'ethanchew@email.com', 'test789123'),
  ('Acc0000005', 'renasoong', 'Rena', 'Soong', 'renasoong@email.com', 'test789123'),
  ('Acc0000006', 'jefflow', 'Jeff', 'Low', 'jefflow@email.com', 'test789123'),
  ('Acc0000007', 'emmanuelstone', 'Emmanuel', 'Stone', 'emmanuelstone@email.com', 'test789123'),
  ('Acc0000008', 'hervinsie', 'Hervin', 'Sie', 'hervinsie@email.com', 'test789123'),
  ('Acc0000009', 'rithikajames', 'Rithika', 'James', 'rithikajames@email.com', 'test789123'),
  ('Acc0000010', 'isabelletan', 'Isabelle', 'Tan', 'isabelletan@email.com', 'test789123');

CREATE TABLE Admin (
  adminId char(10),
  CONSTRAINT PK_Admin PRIMARY KEY (adminId),
  CONSTRAINT FK_Admin_adminId
  FOREIGN KEY (adminId) REFERENCES Account(accId),
);

INSERT INTO Admin (adminId)
VALUES
  ('Acc0000001'),
  ('Acc0000004'),
  ('Acc0000007'),
  ('Acc0000010');

CREATE TABLE UserAcc (
  userId char(10),
  CONSTRAINT PK_UserAcc PRIMARY KEY (userId),
  CONSTRAINT FK_UserAcc_userId
  FOREIGN KEY (userId) REFERENCES Account(accId),
);

INSERT INTO UserAcc(userId)
VALUES
  ('Acc0000002'),
  ('Acc0000003'),
  ('Acc0000005'),
  ('Acc0000006'),
  ('Acc0000008'),
  ('Acc0000009');

CREATE TABLE Category (
  catId char(1),
  catName VARCHAR(50) NOT NULL,
  CONSTRAINT PK_Category PRIMARY KEY (catId),
);

INSERT INTO Category (catId, catName)
VALUES
  ('1', 'Food Waste'),
  ('2', 'Carbon Emission'),
  ('3', 'Plastic Waste'),
  ('4', 'Recyclables');

CREATE TABLE CatWeek (
  weekName VARCHAR(100) NOT NULL,
  catId char(1) NOT NULL,
  userId char(10) NOT NULL,
  CONSTRAINT PK_CatWeek PRIMARY KEY (weekName, catId, userId),
  CONSTRAINT FK_CatWeek_catId
  FOREIGN KEY (catId) REFERENCES Category(catId),
  CONSTRAINT FK_CatWeek_dataId
  FOREIGN KEY (userId) REFERENCES Account(accId),
);

INSERT INTO CatWeek(weekName, catId, userId)
VALUES
  ('Week-1', '1', 'Acc0000002'),
  ('Week-1', '2', 'Acc0000002'),
  ('Week-1', '3', 'Acc0000002'),
  ('Week-1', '4', 'Acc0000002'),
  ('Week-1', '1', 'Acc0000003'),
  ('Week-1', '2', 'Acc0000003'),
  ('Week-1', '4', 'Acc0000003'),
  ('Week-1', '3', 'Acc0000005'),
  ('Week-1', '2', 'Acc0000005'),
  ('Week-1', '1', 'Acc0000005'),
  ('Week-1', '1', 'Acc0000006'),
  ('Week-1', '2', 'Acc0000006'),
  ('Week-1', '4', 'Acc0000006'),
  ('Week-1', '1', 'Acc0000008'),
  ('Week-1', '2', 'Acc0000008'),
  ('Week-1', '3', 'Acc0000008'),
  ('Week-1', '4', 'Acc0000008'),
  ('Week-1', '1', 'Acc0000009'),
  ('Week-1', '2', 'Acc0000009'),
  ('Week-1', '4', 'Acc0000009');

CREATE TABLE CatDataInput (
  dataId char(10),
  catId char(1),
  weekName VARCHAR(100),
  userId char(10),
  info VARCHAR(200) NOT NULL,
  amount VARCHAR(200) NOT NULL,
  dateInput VARCHAR(100) NOT NULL,
  CONSTRAINT PK_CatData PRIMARY KEY (dataId),
  CONSTRAINT FK_CatDataInput_CatWeek
  FOREIGN KEY (weekName, catId, userId) REFERENCES CatWeek(weekName, catId, userId),
);

INSERT INTO CatDataInput(userId, catId, dataId, weekName, info, amount, dateInput)
VALUES
    ('Acc0000003', '1', 'CD00000001', 'Week-1', 'Leftover rice', '1 cup', '2024-06-14'),
    ('Acc0000003', '2', 'CD00000002', 'Week-1', 'Took public transport', '30 minutes', '2024-06-14'),
    ('Acc0000003', '4', 'CD00000003', 'Week-1', 'Used reusable water bottle', '1', '2024-06-14'),
    ('Acc0000003', '4', 'CD00000004', 'Week-1', 'Recycled paper', '5 sheets', '2024-06-14'),
    ('Acc0000006', '1', 'CD00000005', 'Week-1', 'Expired vegetables', '1 kg', '2024-06-15'),
    ('Acc0000006', '2', 'CD00000006', 'Week-1', 'Walked to work', '20 minutes', '2024-06-15'),
    ('Acc0000006', '4', 'CD00000007', 'Week-1', 'Brought own shopping bag', '3', '2024-06-15'),
    ('Acc0000006', '4', 'CD00000008', 'Week-1', 'Used metal straw', '1', '2024-06-15'),
    ('Acc0000005', '3', 'CD00000009', 'Week-1', 'Food packaging waste', '2 kg', '2024-06-16'),
    ('Acc0000005', '2', 'CD00000010', 'Week-1', 'Cycled to school', '15 minutes', '2024-06-16'),
    ('Acc0000005', '1', 'CD00000011', 'Week-1', 'unfinished lunch', 'half a packet of salad', '2024-06-16'),
    ('Acc0000005', '2', 'CD00000012', 'Week-1', 'Drove to mbs', '30 minutes', '2024-06-16'),
    ('Acc0000002', '1', 'CD00000013', 'Week-1', 'Unfinished toast', 'Half a slice', '2024-06-13'),
    ('Acc0000002', '2', 'CD00000014', 'Week-1', 'Drove my car', '2 hour', '2024-06-13'),
    ('Acc0000002', '3', 'CD00000015', 'Week-1', 'Used plastic cups', '2', '2024-06-13'),
    ('Acc0000002', '4', 'CD00000016', 'Week-1', 'Reused plastic bag', '1', '2024-06-13'),
    ('Acc0000008', '3', 'CD00000017', 'Week-1', 'used plastic straw', '1', '2024-06-14'),
    ('Acc0000008', '2', 'CD00000018', 'Week-1', 'Took public transport', '50 minutes', '2024-06-14'),
    ('Acc0000008', '4', 'CD00000019', 'Week-1', 'Used reusable bag', '1', '2024-06-14'),
    ('Acc0000008', '3', 'CD00000020', 'Week-1', 'used plastic container', '5  packets', '2024-06-14'),
    ('Acc0000009', '1', 'CD00000021', 'Week-1', 'Expired fruits', '1 kg', '2024-06-15'),
    ('Acc0000009', '2', 'CD00000022', 'Week-1', 'Drove to work', '20 minutes', '2024-06-15'),
    ('Acc0000009', '1', 'CD00000023', 'Week-1', 'rotten food', '3kg', '2024-06-15'),
    ('Acc0000009', '4', 'CD00000024', 'Week-1', 'Used metal straw', '1', '2024-06-15');
   
CREATE Table WeeklyChallenge (
 ChallengeID varchar(10),
 ChallengeDesc varchar(200) NOT NULL UNIQUE,
 Points varchar(20) NOT NULL,
 CONSTRAINT PK_WeeklyChallenge PRIMARY KEY (ChallengeID),
);

INSERT INTO WeeklyChallenge(ChallengeID, ChallengeDesc, Points) 
VALUES
    ('C000000001', 'Plant a Tree in Your Backyard', 100),
    ('C000000002', 'Recycle All Your Plastic Waste for a Month', 75),
    ('C000000003', 'Commute by Bike for a Week', 60),
    ('C000000004', 'Reduce Your Daily Shower Time by 2 Minutes', 30),
    ('C000000005', 'Bring a Recyclable Bag for Shopping', 40),
    ('C000000006', 'Join a Local Park Clean-Up Event', 90),
    ('C000000007', 'Start a Compost Bin at Home', 70),
    ('C000000008', 'Replace One Light Bulb with LED Bulbs', 60),
    ('C000000009', 'Have a Meat-Free Day Once a Week', 85),
    ('C000000010', 'Switch to a Green Energy Plan', 95),
    ('C000000011', 'Avoid Using Single-Use Plastics for a Week', 65),
    ('C000000012', 'Shop at a Local Farmers Market', 55),
    ('C000000013', 'Grow Your Own Herbs', 75),
    ('C000000014', 'Host a Recycling Drive in Your Community', 100);

CREATE TABLE UserWeeklyChallenges (
   userChallengeId INT PRIMARY KEY,
   userId CHAR(10),
   ChallengeID VARCHAR(10),
   challengeCompleted CHAR(1) DEFAULT 'N' CHECK (challengeCompleted IN ('Y', 'N')),
   CONSTRAINT FK_UserWeeklyChallenges_UserId FOREIGN KEY (userId) REFERENCES UserAcc(userId),
   CONSTRAINT FK_UserWeeklyChallenges_ChallengeID FOREIGN KEY (ChallengeID) REFERENCES WeeklyChallenge(ChallengeID)
);

INSERT INTO UserWeeklyChallenges (userChallengeId, userId, ChallengeID)
SELECT 
    ROW_NUMBER() OVER (ORDER BY ua.userId, wc.ChallengeID) AS userChallengeId,
    ua.userId,
    wc.ChallengeID
FROM
    UserAcc ua
CROSS JOIN
    WeeklyChallenge wc;

CREATE TABLE MonthlyPoints (
  userId CHAR(10),
  username VARCHAR(100) NOT NULL,
  userMonthlyPoints INT NOT NULL,
  CONSTRAINT PK_MonthlyPoints PRIMARY KEY (userId),
  CONSTRAINT FK_MonthlyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId),
  CONSTRAINT FK_MonthlyPoints_username FOREIGN KEY (username) REFERENCES Account(username)
);

INSERT INTO MonthlyPoints(userId, username, userMonthlyPoints) 
VALUES
  ('Acc0000002', 'dobbyfree', 1200),
  ('Acc0000003', 'junkaismith', 1000),
  ('Acc0000005', 'renasoong', 1500),
  ('Acc0000006', 'jefflow', 1205),
  ('Acc0000008', 'hervinsie', 1005),
  ('Acc0000009', 'rithikajames', 750);


CREATE TABLE WeeklyPoints (
  userId CHAR(10),
	username VARCHAR(100) NOT NULL,
  userWeeklyPoints VARCHAR(200) NULL,
  CONSTRAINT PK_WeeklyPoints PRIMARY KEY (userId),
  CONSTRAINT FK_WeeklyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId),
	CONSTRAINT FK_WeeklyPoints_username FOREIGN KEY (username) REFERENCES Account(username)
);


INSERT INTO WeeklyPoints(userId, username, userWeeklyPoints) 
VALUES
  ('Acc0000002', 'dobbyfree', 120),
  ('Acc0000003', 'junkaismith', 100),
  ('Acc0000005', 'renasoong', 150),
  ('Acc0000006', 'jefflow', 120),
  ('Acc0000008', 'hervinsie', 105),
  ('Acc0000009', 'rithikajames', 75);

CREATE TABLE LocationReq (
    locationReqId INT,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(250) NOT NULL,
    status char(1) NOT NULL CHECK (status IN ('A', 'P', 'R')),
    websiteLink VARCHAR(250),
    userId char(10),
    adminId char(10),
    CONSTRAINT PK_LocationReq PRIMARY KEY (locationReqId),
    CONSTRAINT FK_locationReq_userId FOREIGN KEY (userId) REFERENCES UserAcc(userId),
    CONSTRAINT FK_locationReq_adminId FOREIGN KEY (adminId) REFERENCES Admin(adminId)
);

INSERT INTO LocationReq (locationReqId, name, address, status, websiteLink, userId, adminId)
VALUES 
(1, 'The Green Collective SG', '02-18, Funan Mall, 107 North Bridge Rd, 179105', 'A', 'https://www.thegreencollective.sg/', 'Acc0000006', 'Acc0000004'),
(2, 'Scoop Wholefoods Jem', '50 Jurong Gateway Rd, #01-12/13, Singapore 608549', 'A', 'https://scoopwholefoodsshop.com/', 'Acc0000003', 'Acc0000004'),
(3, 'OliveAnkara', '79 Chay Yan St, #01-02 Opposite Plain Vanilla, Singapore 160079', 'A', 'https://oliveankara.com/', 'Acc0000008', 'Acc0000007'),
(4, 'Unpackt', '20 Mandai Lake Rd, #02-09 Mandai Wildlife WEST, Singapore 729825', 'A', 'https://unpackt.com.sg/', 'Acc0000009', 'Acc0000010'),
(5, 'H&M', '345 Main St', 'P', NULL, 'Acc0000002', 'Acc0000001'),
(6, 'Shein', '678 Main St', 'R', NULL, 'Acc0000005', 'Acc0000001');