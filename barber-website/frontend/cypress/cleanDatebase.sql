DELETE from about;
DELETE from barber_schedule;
DELETE from faq;
DELETE from products;
delete from users where userrole <> 'Admin';
delete from about;
delete from pricing;
delete from workinghours;
INSERT INTO workingHours (day, description)
VALUES('SUNDAY', 'CLOSED');
INSERT INTO workingHours (day, description)
VALUES('MONDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('TUESDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('WEDNESDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('THURSDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('FRIDAY', '10 AM - 8 PM');
INSERT INTO workingHours (day, description)
VALUES('SATURDAY', 'CLOSED');
INSERT INTO Pricing (service, price, duration)
VALUES('Haircut', '$35', '45 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Haircut + Beard', '$40', '1 Hour');
INSERT INTO Pricing (service, price, duration)
VALUES('Line up', '$15', '30 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Beard only', '$15', '30 Minutes');
INSERT INTO Pricing (service, price, duration)
VALUES('Line up + Beard', '$20', '30 Minutes');
INSERT INTO about
VALUES ('Hello');