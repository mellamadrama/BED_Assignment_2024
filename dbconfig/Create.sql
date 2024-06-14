CREATE TABLE Account (
  accId char(10),
  username VARCHAR(100) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  CONSTRAINT PK_Account PRIMARY KEY (accId),
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
  ('Acc0000010', 'isabelletan', 'Isabelle', 'Tan', 'isabelletan@email.com', 'test789123'),;

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

CREATE TABLE CatDataInput (
  dataId char(10),
  userId char(10),
  info VARCHAR(200) NOT NULL,
  amount VARCHAR(200) NOT NULL,
  dateInput smalldatetime NOT NULL,
  CONSTRAINT PK_CatData PRIMARY KEY (dataId),
  CONSTRAINT FK_CatDataInput_userId
  FOREIGN KEY (userId) REFERENCES Account(accId),
);

INSERT INTO CatDataInput(userId, dataId, info, amount, dateInput)
VALUES
    ('Acc0000003', 'D000000001', 'Leftover rice', '1 cup', '2024-06-14'),
    ('Acc0000003', 'D000000002', 'Took public transport', '30 minutes', '2024-06-14'),
    ('Acc0000003', 'D000000004', 'Used reusable water bottle', '1', '2024-06-14'),
    ('Acc0000003', 'D000000004', 'Recycled paper', '5 sheets', '2024-06-14'),
    ('Acc0000006', 'D000000001', 'Expired vegetables', '1 kg', '2024-06-15'),
    ('Acc0000006', 'D000000002', 'Walked to work', '20 minutes', '2024-06-15'),
    ('Acc0000006', 'D000000004', 'Brought own shopping bag', '3', '2024-06-15'),
    ('Acc0000006', 'D000000004', 'Used metal straw', '1', '2024-06-15'),
    ('Acc0000005', 'D000000003', 'Food packaging waste', '2 kg', '2024-06-16'),
    ('Acc0000005', 'D000000002', 'Cycled to school', '15 minutes', '2024-06-16'),
    ('Acc0000005', 'D000000001', 'unfinished lunch', 'half a packet of salad', '2024-06-16'),
    ('Acc0000005', 'D000000002', 'Drove to mbs', '30 minutes', '2024-06-16'),
    ('Acc0000002', 'D000000001', 'Unfinished toast', 'Half a slice', '2024-06-13'),
    ('Acc0000002', 'D000000002', 'Drove my car', '2 hour', '2024-06-13'),
    ('Acc0000002', 'D000000003', 'Used plastic cups', '2', '2024-06-13'),
    ('Acc0000002', 'D000000004', 'Reused plastic bag', '1', '2024-06-13'),
    ('Acc0000008', 'D000000003', 'used plastic straw', '1', '2024-06-14'),
    ('Acc0000008', 'D000000002', 'Took public transport', '50 minutes', '2024-06-14'),
    ('Acc0000008', 'D000000004', 'Used reusable bag', '1', '2024-06-14'),
    ('Acc0000008', 'D000000003', 'used plastic container', '5  packets', '2024-06-14'),
    ('Acc0000009', 'D000000001', 'Expired fruits', '1 kg', '2024-06-15'),
    ('Acc0000009', 'D000000002', 'Drovw to work', '20 minutes', '2024-06-15'),
    ('Acc0000009', 'D000000001', 'rotten food', '3kg', '2024-06-15'),
    ('Acc0000009', 'D000000004', 'Used metal straw', '1', '2024-06-15');


CREATE TABLE CatWeek (
  weekName VARCHAR(100) NOT NULL,
  catId char(1) NOT NULL,
  dataId char(10) NOT NULL,
  userId char(10) NOT NULL,
  CONSTRAINT PK_CatWeek PRIMARY KEY (weekName, catId, dataId, userId),
  CONSTRAINT FK_CatWeek_catId
  FOREIGN KEY (catId) REFERENCES Category(catId),
  CONSTRAINT FK_CatWeek_dataId
  FOREIGN KEY (dataId) REFERENCES CatDataInput(dataId),
  CONSTRAINT FK_CatWeek_userId
  FOREIGN KEY (userId) REFERENCES Account(accId),
);

INSERT INTO CatWeek(weekName, catId, dataId, userId)
VALUES
  ('Week 1', '1', 'D000000001', 'Acc0000002'),
  ('Week 1', '2', 'D000000002', 'Acc0000002'),
  ('Week 1', '3', 'D000000003', 'Acc0000002'),
  ('Week 1', '4', 'D000000004', 'Acc0000002'),
  ('Week 1', '1', 'D000000001', 'Acc0000003'),
  ('Week 1', '2', 'D000000002', 'Acc0000003'),
  ('Week 1', '4', 'D000000004', 'Acc0000003'),
  ('Week 1', '4', 'D000000004', 'Acc0000003'),
  ('Week 1', '3', 'D000000003', 'Acc0000005'),
  ('Week 1', '2', 'D000000002', 'Acc0000005'),
  ('Week 1', '1', 'D000000001', 'Acc0000005'),
  ('Week 1', '2', 'D000000002', 'Acc0000005'),
  ('Week 1', '1', 'D000000001', 'Acc0000006'),
  ('Week 1', '2', 'D000000002', 'Acc0000006'),
  ('Week 1', '4', 'D000000004', 'Acc0000006'),
  ('Week 1', '4', 'D000000004', 'Acc0000006'),
  ('Week 1', '1', 'D000000003', 'Acc0000008'),
  ('Week 1', '2', 'D000000002', 'Acc0000008'),
  ('Week 1', '3', 'D000000004', 'Acc0000008'),
  ('Week 1', '4', 'D000000003', 'Acc0000008'),
  ('Week 1', '1', 'D000000001', 'Acc0000009'),
  ('Week 1', '2', 'D000000002', 'Acc0000009'),
  ('Week 1', '1', 'D000000001', 'Acc0000009'),
  ('Week 1', '4', 'D000000004', 'Acc0000009');
   
CREATE Table WeeklyChallenge (
 userId char(10),
 ChallengeID varchar(10),
 ChallengeDesc varchar(200) NOT NULL UNIQUE,
 Points varchar(20) NOT NULL,
 ChallengeStatus char(1) NOT NULL CHECK (ChallengeStatus IN ('Y','N')),
 CONSTRAINT PK_WeeklyChallenge PRIMARY KEY (ChallengeID),
);

INSERT INTO WeeklyChallenge(ChallengeID, ChallengeDesc, Points, ChallengeStatus) 
VALUES
    ('C000000001', 'Plant a Tree in Your Backyard', 100, 'Y'),
    ('C000000002', 'Recycle All Your Plastic Waste for a Month', 75, 'N'),
    ('C000000003', 'Commute by Bike for a Week', 60, 'Y'),
    ('C000000004', 'Reduce Your Daily Shower Time by 2 Minutes', 30, 'Y'),
    ('C000000005', 'Bring a Recyclable Bag for Shopping', 40, 'N'),
    ('C000000006', 'Join a Local Park Clean-Up Event', 90, 'Y'),
    ('C000000007', 'Start a Compost Bin at Home', 70, 'N'),
    ('C000000008', 'Replace One Light Bulb with LED Bulbs', 60, 'Y'),
    ('C000000009', 'Have a Meat-Free Day Once a Week', 85, 'N'),
    ('C000000010', 'Switch to a Green Energy Plan', 95, 'Y'),
    ('C000000011', 'Avoid Using Single-Use Plastics for a Week', 65, 'Y'),
    ('C000000012', 'Shop at a Local Farmers Market', 55, 'N'),
    ('C000000013', 'Grow Your Own Herbs', 75, 'Y'),
    ('C000000014', 'Host a Recycling Drive in Your Community', 100, 'Y');

CREATE TABLE MonthlyPoints (
    userId char(10),
    userMonthlyPoints VARCHAR(200) NOT NULL,
    CONSTRAINT PK_MonthlyPoints PRIMARY KEY (userId),
    CONSTRAINT FK_MonthlyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId)
);


INSERT INTO MonthlyPoints(userId, userMonthlyPoints) 
VALUES
 ('ACC0000001', 1200),
 ('ACC0000002', 1100);


CREATE TABLE WeeklyPoints (
    userId CHAR(10),
    userWeeklyPoints VARCHAR(200) NULL,
    CONSTRAINT PK_WeeklyPoints PRIMARY KEY (userId),
    CONSTRAINT FK_WeeklyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId)
);


INSERT INTO WeeklyPoints(userId, userWeeklyPoints) 
VALUES
 ('ACC0000001', 230),
 ('ACC0000002', 250); 

CREATE TABLE LocationReq (
    locationReqId char(10),
    locationReqName VARCHAR(50) NOT NULL,
    locationReqAddress VARCHAR(250) NOT NULL,
    status char(1) NOT NULL CHECK (status IN ('Y', 'N')),
    websiteLink VARCHAR(250),
    userId char(10),
    adminId char(10)
    CONSTRAINT PK_LocationReq PRIMARY KEY (locationReqId)
);

INSERT INTO LocationReq (locationReqId, locationReqName, locationReqAddress, status, websiteLink, userId, adminId)
VALUES 
(1, 'Location 1', '123 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002'),
(2, 'Location 2', '456 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002'),
(3, 'Location 3', '789 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002'),
(4, 'Location 4', '012 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002'),
(5, 'Location 5', '345 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002'),
(6, 'Location 6', '678 Main St', 'Y', 'https://example.com/location1', 'Acc0000001', 'Acc0000002');