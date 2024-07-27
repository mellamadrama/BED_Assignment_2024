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
  ('Acc0000001', 'janetest', 'Jane', 'Test', 'janetest@email.com', '$2a$10$AuTQAWhTOGR9RXLGM2e8M.N.XguEZX91kyhCkujT/eEmQarlfTunG'),
  ('Acc0000002', 'dobbyfree', 'Dobby', 'Free', 'dobbyfree@email.com', '$2a$10$GqOxltML3.VhQY1btu2URecoVgrgVMGH9EtTYGzxVdaV0ynD43NfO'),
  ('Acc0000003', 'junkaismith', 'Jun Kai', 'Smith', 'junkaismith@email.com', '$2a$10$5AjJ/P4GqedxLfLQ6sjWUuyDlnm/oDGIiFE97mYrlYNa3CoXmdmDS'),
  ('Acc0000004', 'ethanchew', 'Ethan', 'Chew', 'ethanchew@email.com', '$2a$10$CmiaFQTA/9W1xiN.D/2Qb.8po21AlW94KIe9/BWZGzTSLakhsEC6S'),
  ('Acc0000005', 'renasoong', 'Rena', 'Soong', 'renasoong@email.com', '$2a$10$n8EvKzYekF.5ayoplWjTS.dpX6BlVvVaDyLnNFVbk9H2zLuVls6SK'),
  ('Acc0000006', 'jefflow', 'Jeff', 'Low', 'jefflow@email.com', '$2a$10$k9eGhARsIxcHODoLSF2tH.HtO6Wn6/6GpMQC9qEIxFHbk.yqC8gLy'),
  ('Acc0000007', 'emmanuelstone', 'Emmanuel', 'Stone', 'emmanuelstone@email.com', '$2a$10$cgbYmvvaR8Bj8v9JznTGvOYlF7iICk5eqDo9B6rqhxrDIhvKhJ40i'),
  ('Acc0000008', 'hervinsie', 'Hervin', 'Sie', 'hervinsie@email.com', '$2a$10$5XKzhC1EsbRXplS8rkAsJ.VbyjcrEi9azzqA0/u7XNlrlVyyXJ8jS'),
  ('Acc0000009', 'rithikajames', 'Rithika', 'James', 'rithikajames@email.com', '$2a$10$75JkvikrAdZMqvNf1y.UoOwKr/pkewg6/E89O4cr.PbXvGoHCyjLe'),
  ('Acc0000010', 'isabelletan', 'Isabelle', 'Tan', 'isabelletan@email.com', '$2a$10$q9GbgdnNzhqXXIS/WwsSAehbaDe0vrikJkzLde.qChjLgHSiaaV42');

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
  catId CHAR(1),
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
  weekName VARCHAR(100) COLLATE Latin1_General_BIN NOT NULL,
  catId CHAR(1) NOT NULL,
  userId CHAR(10) NOT NULL,
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
  weekName VARCHAR(100) COLLATE Latin1_General_BIN NOT NULL,
  catId CHAR(1),
  userId CHAR(10),
  dataId CHAR(10),
  info VARCHAR(200) NOT NULL,
  amount VARCHAR(200) NOT NULL,
  dateInput VARCHAR(100) NOT NULL,
  CONSTRAINT PK_CatData PRIMARY KEY (dataId),
  CONSTRAINT FK_CatDataInput_CatWeek
  FOREIGN KEY (weekName, catId, userId) REFERENCES CatWeek(weekName, catId, userId),
);

INSERT INTO CatDataInput(weekName, catId, userId, dataId, info, amount, dateInput)
VALUES
    ('Week-1', '1', 'Acc0000003', 'CD00000001', 'Leftover rice', '1 cup', '2024-06-14'),
    ('Week-1', '2', 'Acc0000003', 'CD00000002', 'Took public transport', '30 minutes', '2024-06-14'),
    ('Week-1', '4', 'Acc0000003', 'CD00000003', 'Used reusable water bottle', '1', '2024-06-14'),
    ('Week-1', '4', 'Acc0000003', 'CD00000004', 'Recycled paper', '5 sheets', '2024-06-14'),
    ('Week-1', '1', 'Acc0000006', 'CD00000005', 'Expired vegetables', '1 kg', '2024-06-15'),
    ('Week-1', '2', 'Acc0000006', 'CD00000006', 'Walked to work', '20 minutes', '2024-06-15'),
    ('Week-1', '4', 'Acc0000006', 'CD00000007', 'Brought own shopping bag', '3', '2024-06-15'),
    ('Week-1', '4', 'Acc0000006', 'CD00000008', 'Used metal straw', '1', '2024-06-15'),
    ('Week-1', '3', 'Acc0000005', 'CD00000009', 'Food packaging waste', '2 kg', '2024-06-16'),
    ('Week-1', '2', 'Acc0000005', 'CD00000010', 'Cycled to school', '15 minutes', '2024-06-16'),
    ('Week-1', '1', 'Acc0000005', 'CD00000011', 'unfinished lunch', 'half a packet of salad', '2024-06-16'),
    ('Week-1', '2', 'Acc0000005', 'CD00000012', 'Drove to mbs', '30 minutes', '2024-06-16'),
    ('Week-1', '1', 'Acc0000002', 'CD00000013', 'Unfinished toast', 'Half a slice', '2024-06-13'),
    ('Week-1', '2', 'Acc0000002', 'CD00000014', 'Drove my car', '2 hour', '2024-06-13'),
    ('Week-1', '3', 'Acc0000002', 'CD00000015', 'Used plastic cups', '2', '2024-06-13'),
    ('Week-1', '4', 'Acc0000002', 'CD00000016', 'Reused plastic bag', '1', '2024-06-13'),
    ('Week-1', '3', 'Acc0000008', 'CD00000017', 'used plastic straw', '1', '2024-06-14'),
    ('Week-1', '2', 'Acc0000008', 'CD00000018', 'Took public transport', '50 minutes', '2024-06-14'),
    ('Week-1', '4', 'Acc0000008', 'CD00000019', 'Used reusable bag', '1', '2024-06-14'),
    ('Week-1', '3', 'Acc0000008', 'CD00000020', 'used plastic container', '5  packets', '2024-06-14'),
    ('Week-1', '1', 'Acc0000009', 'CD00000021', 'Expired fruits', '1 kg', '2024-06-15'),
    ('Week-1', '2', 'Acc0000009', 'CD00000022', 'Drove to work', '20 minutes', '2024-06-15'),
    ('Week-1', '1', 'Acc0000009', 'CD00000023', 'rotten food', '3kg', '2024-06-15'),
    ('Week-1', '4', 'Acc0000009', 'CD00000024', 'Used metal straw', '1', '2024-06-15');
   
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
  userMonthlyPoints INT NOT NULL,
  CONSTRAINT PK_MonthlyPoints PRIMARY KEY (userId),
  CONSTRAINT FK_MonthlyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId),
);

INSERT INTO MonthlyPoints(userId, userMonthlyPoints) 
VALUES
  ('Acc0000002', 1200),
  ('Acc0000003', 1000),
  ('Acc0000005', 1500),
  ('Acc0000006', 1205),
  ('Acc0000008', 1005),
  ('Acc0000009', 750);


CREATE TABLE WeeklyPoints (
  userId CHAR(10),
  userWeeklyPoints VARCHAR(200) NULL,
  CONSTRAINT PK_WeeklyPoints PRIMARY KEY (userId),
  CONSTRAINT FK_WeeklyPoints_userId FOREIGN KEY (userId) REFERENCES Account(accId),
);


INSERT INTO WeeklyPoints(userId, userWeeklyPoints) 
VALUES
  ('Acc0000002', 120),
  ('Acc0000003', 100),
  ('Acc0000005', 150),
  ('Acc0000006', 120),
  ('Acc0000008', 105),
  ('Acc0000009', 75);

CREATE TABLE LocationReq (
  locationReqId INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(50) NOT NULL UNIQUE,
  address VARCHAR(250) NOT NULL,
  status char(1) NOT NULL CHECK (status IN ('A', 'P', 'R')),
  websiteLink VARCHAR(250),
  userId char(10),
  adminId char(10),
  CONSTRAINT FK_locationReq_userId FOREIGN KEY (userId) REFERENCES UserAcc(userId),
  CONSTRAINT FK_locationReq_adminId FOREIGN KEY (adminId) REFERENCES Admin(adminId)
);

INSERT INTO LocationReq (name, address, status, websiteLink, userId, adminId)
VALUES 
  ('The Green Collective SG', '02-18, Funan Mall, 107 North Bridge Rd, 179105', 'A', 'https://www.thegreencollective.sg/', 'Acc0000006', 'Acc0000004'),
  ('Scoop Wholefoods Jem', '50 Jurong Gateway Rd, #01-12/13, Singapore 608549', 'A', 'https://scoopwholefoodsshop.com/', 'Acc0000003', 'Acc0000004'),
  ('OliveAnkara', '79 Chay Yan St, #01-02 Opposite Plain Vanilla, Singapore 160079', 'A', 'https://oliveankara.com/', 'Acc0000008', 'Acc0000007'),
  ('Unpackt', '20 Mandai Lake Rd, #02-09 Mandai Wildlife WEST, Singapore 729825', 'A', 'https://unpackt.com.sg/', 'Acc0000009', 'Acc0000010'),
  ('H&M', '345 Main St', 'P', NULL, 'Acc0000002', NULL),
  ('Shein', '678 Main St', 'R', NULL, 'Acc0000005', 'Acc0000001');

CREATE TABLE Events (
  eventId INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(250) NOT NULL,
  address VARCHAR(250),
  date DATETIME,
  price DECIMAL(10, 2),
  adminId CHAR(10),
  CONSTRAINT FK_Events_adminId FOREIGN KEY (adminId) REFERENCES Admin(adminId)
);

INSERT INTO Events (name, description, address, date, price, adminId)
VALUES 
  ('Great Green Run 2024', 'A trailblazing event designed to redefine the essence of eco-friendly and aspirational runs, presented by CIMB Singapore.', 'Marina Barrage, 8 Marina Gardens Drive Singapore, 018951', '2024-10-12 18:30:00', NULL, 'Acc0000010'),
  ('Race For Good 2024', 'Get ready to lace up your sneakers and join us for Race For Good 2024, where we will run, walk, and raise money for our beneficiaries.', 'Angsana Green East Coast Parkway Singapore, Singapore', '2024-09-14 13:00:00', 70, 'Acc0000010'),
  ('Upcycled with Plastic: Accessories @ CLSF 2024', 'Make your own blings using plastic!', 'Tzu Chi Humanistic Youth Centre 慈济人文青年中心, 30A Yishun Central 1 Singapore, 768796', '2024-07-20 10:00:00', 30, 'Acc0000001'),
  ('Nature and Sustainability Tour: Urban Wetlands', 'Join us for free guided walks to learn about climate change, biodiversity and sustainable features in the Gardens!', 'Satay by the Bay, Tables outside toilet and next to western food, 12 Marina Gardens Drive Singapore, 018952', '2024-08-03 10:30:00', NULL, 'Acc0000007'),
  ('Net Zero Carbon Cities: Dream or Reality - A RICS & REDAS SEA Conference', 'Navigating the Net Zero Challenge: Practical Solutions for a Sustainable South East Asia', 'Singapore Marriott Tang Plaza Hotel, 320 Orchard Road Singapore, 238865', '2024-10-23 08:30:00', 163.50, 'Acc0000007'),
  ('Plastic Collage - Explore Plastic Issues Today & Solutions for Tomorrow', 'Learn about Plastics (Trends, Waste, Recycling etc.) issues & challenges + solutions to beat Plastic Pollution in Asia! Fun science evening!', 'PALO IT Singapore, 11 Beach Road ##06-01 Singapore, Singapore 189675', '2024-09-23 18:15:00', NULL, 'Acc0000004'),
  ('Coffee Scrub Upcycling Workshop @ CLSF 2024', 'Discover the beauty of coffee grounds, how to upcycle them, and bring home a coffee ground body scrub!', 'Tzu Chi Humanistic Youth Centre 慈济人文青年中心, 30A Yishun Central 1 Singapore, 768796', '2024-07-20 15:30:00', NULL, 'Acc0000004');

CREATE TABLE ChatHistory (
  chatId INT PRIMARY KEY IDENTITY(1,1),
  userId CHAR(10) NOT NULL,
  sender VARCHAR(10) NOT NULL CHECK (sender IN ('user', 'model')),
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT GETDATE(),
  CONSTRAINT FK_ChatHistory_userId FOREIGN KEY (userId) REFERENCES UserAcc(userId)
);