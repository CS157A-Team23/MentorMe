CREATE DATABASE  IF NOT EXISTS `cs157a` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cs157a`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cs157a
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatlog`
--

DROP TABLE IF EXISTS `chatlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatlog` (
  `message` varchar(511) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `chatlog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatlog_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatlog`
--

LOCK TABLES `chatlog` WRITE;
/*!40000 ALTER TABLE `chatlog` DISABLE KEYS */;
INSERT INTO `chatlog` VALUES ('hello there','2019-12-03 07:57:22',1,16),('general kenobi','2019-12-03 07:58:00',2,16),('have you heard the tale of darth plagius the wise','2019-12-03 07:58:19',1,16),('its tragedy','2019-12-03 07:59:07',2,16),('you said it wrong','2019-12-03 07:59:13',2,16),('oh oops','2019-12-03 07:59:18',1,16),('my mistake lol','2019-12-03 07:59:26',1,16),('sigh','2019-12-03 07:59:31',2,16),('aren\'t you supposed to be my basketball mentor','2019-12-03 07:59:43',2,16),('Bob you are late for your dark magic lesson','2019-12-03 08:00:37',3,17),('sorry master, i was shooting hoops. one sec','2019-12-03 08:00:53',2,17),('the dark arts do not wait. hurry!','2019-12-03 08:01:08',3,17),('gotcha','2019-12-03 08:01:14',2,17),('hey chat are you mentoring bob rn','2019-12-03 08:01:27',1,18),('chad*','2019-12-03 08:01:35',1,18),('yeah whats up','2019-12-03 08:01:43',3,18),('its a busy task. imma afk','2019-12-03 08:01:58',3,18),('alright ttyl','2019-12-03 08:02:04',1,18),('bjaldf','2019-12-03 22:13:29',2,3),('fgaghas','2019-12-03 22:13:36',1,3),('Yo how is it going','2019-12-08 20:59:08',2,16);
/*!40000 ALTER TABLE `chatlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interests` (
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `interests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interests_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
INSERT INTO `interests` VALUES (1,1),(3,2),(4,2),(5,2),(6,2),(7,2),(1,3),(2,3),(3,3),(5,3),(2,9),(4,11),(6,11),(7,11),(1,15),(2,15),(3,15),(4,15),(6,15),(7,15);
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentors`
--

DROP TABLE IF EXISTS `mentors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentors` (
  `mentee_accepted` tinyint(1) DEFAULT '0',
  `mentor_accepted` tinyint(1) DEFAULT '0',
  `topic_id` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `mentor_id` int(11) NOT NULL,
  `mentee_id` int(11) NOT NULL,
  PRIMARY KEY (`mentor_id`,`mentee_id`),
  KEY `topic_id` (`topic_id`),
  KEY `chat_id` (`chat_id`),
  KEY `mentee_id` (`mentee_id`),
  CONSTRAINT `mentors_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`),
  CONSTRAINT `mentors_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`),
  CONSTRAINT `mentors_ibfk_3` FOREIGN KEY (`mentor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mentors_ibfk_4` FOREIGN KEY (`mentee_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentors`
--

LOCK TABLES `mentors` WRITE;
/*!40000 ALTER TABLE `mentors` DISABLE KEYS */;
INSERT INTO `mentors` VALUES (1,1,3,16,1,2),(1,1,3,18,1,3),(1,1,3,28,1,5),(1,1,15,18,3,1),(1,1,15,17,3,2),(1,1,15,20,3,6),(1,1,15,24,3,7),(1,1,15,29,4,1),(1,1,15,19,4,2),(1,1,2,21,4,6),(1,1,2,25,4,7),(1,1,15,30,6,1),(1,1,15,22,6,2),(1,1,2,23,6,5),(1,1,2,26,6,7),(1,1,2,27,7,5);
/*!40000 ALTER TABLE `mentors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proficiency`
--

DROP TABLE IF EXISTS `proficiency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proficiency` (
  `skill` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `proficiency_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proficiency_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proficiency`
--

LOCK TABLES `proficiency` WRITE;
/*!40000 ALTER TABLE `proficiency` DISABLE KEYS */;
INSERT INTO `proficiency` VALUES (1,1,1),(4,1,3),(1,1,15),(1,2,3),(5,2,9),(2,3,2),(3,3,3),(5,3,15),(4,4,2),(2,4,11),(3,4,15),(1,5,2),(1,5,3),(2,6,2),(5,6,11),(3,6,15),(2,7,2),(2,7,11),(1,7,15);
/*!40000 ALTER TABLE `proficiency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rates` (
  `rating` int(11) NOT NULL,
  `rater_id` int(11) NOT NULL,
  `ratee_id` int(11) NOT NULL,
  PRIMARY KEY (`rater_id`,`ratee_id`),
  KEY `ratee_id` (`ratee_id`),
  CONSTRAINT `rates_ibfk_1` FOREIGN KEY (`rater_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rates_ibfk_2` FOREIGN KEY (`ratee_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rates`
--

LOCK TABLES `rates` WRITE;
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` VALUES (4,1,2),(5,1,3),(4,1,4),(4,1,5),(4,1,6),(2,2,1),(4,3,1),(2,3,2),(3,3,6),(4,3,7),(4,4,1),(4,4,2),(3,4,6),(4,4,7),(4,6,1),(2,6,2),(3,6,3),(4,6,4),(4,6,5),(3,6,7),(3,7,3),(5,7,4),(3,7,5),(4,7,6);
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'Algebra'),(2,'Alchemy'),(3,'Basketball'),(4,'Bowling'),(5,'Chemistry'),(6,'Child Development'),(7,'Communications'),(8,'English'),(9,'Calculus'),(10,'Software Engineering'),(11,'Epstein didn\'t KHS'),(12,'Gardening'),(13,'Home cooking'),(14,'Arabic'),(15,'Dark magic');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topicchat`
--

DROP TABLE IF EXISTS `topicchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topicchat` (
  `topic_id` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  KEY `topic_id` (`topic_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `topicchat_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`),
  CONSTRAINT `topicchat_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topicchat`
--

LOCK TABLES `topicchat` WRITE;
/*!40000 ALTER TABLE `topicchat` DISABLE KEYS */;
INSERT INTO `topicchat` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15);
/*!40000 ALTER TABLE `topicchat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alice','Al','a@gmail.com','$2b$10$uO5Fskk0qc1fJ60ZDArYXuqhQqtuvSIS2jLwjpj6RTbNZVWXDAlgy'),(2,'Bob','Bo','b@gmail.com','$2b$10$05KEfKR4HPFYKyGF.TcFRewEevry2SOp5dDFUBYGuukgmAlneCpGi'),(3,'Chad','Cha','c@gmail.com','$2b$10$HfOHE5h8vrC5wajGk9N/WuZ8AxCuvbXd98iMKvJm9t.tMOBRmRKBO'),(4,'Doug','Do','d@gmail.com','$2b$10$FOftNe0/XAq9dOPyKWw1Z./xZ.BEmbYR5YJJ8irPosSAdnaUYdWna'),(5,'Edward','Ed','e@gmail.com','$2b$10$gj4rgokrCr5WJ.noO6..mugrc0DDXoSQh9pHongzDyzHJZh9l8DYq'),(6,'Fred','Fe','f@gmail.com','$2b$10$O4J1lsdt7R9qjRWrVWrywek7QBbqXlrRMUyNDa8ZQAKKAE1jyfxRG'),(7,'Gary','Ga','g@gmail.com','$2b$10$7V.6d.hqE5Dud6MHQPdyRu2n4TMXpOw20P9HZsROopsxd.oTM2uYq'),(8,'Helen','He','h@gmail.com','$2b$10$dtD5b3Iu/izfE7uIaKBjEObxljkHDyDJyq0aUY/lz.kl3xOhtIRfO'),(9,'Isaac','Is','i@gmail.com','$2b$10$xLo0Ms77UbmabbEOi23nP.apm/1BJmItrvkrRW/mqAhHr0so5fsUe'),(10,'Joseph','Jo','j@gmail.com','$2b$10$MkgEcJw06U7k.mmj4cDfJOCQZu5hMYA20/BqI3fvfblOfR4W5i0vW'),(11,'Kevin','Ke','k@gmail.com','$2b$10$FZV/.c3KluCs18iraGYrU.4oJycQYKoGcSUYtWtZKhciFuLynAX.W'),(12,'Larry','La','l@gmail.com','$2b$10$hM7h87Tzeq4We3zZWYnq5O/DnndDPNOU4IHNBhaM5urMcP.yQOd3u'),(13,'Mary','Ma','m@gmail.com','$2b$10$51a/plhQBOeyCTHgjrq6zuu7MvbUDgBZQKe2mKrFW9ggUN5tWi9EO'),(14,'Nancy','Na','n@gmail.com','$2b$10$.3NYZbqiAyw1E.u.AP7ks.FVw5gyjc8BMT6Uewg9CveaNojMg4OPi'),(15,'Oscar','Os','o@gmail.com','$2b$10$HTczFzZS/0VyyWmiJiR9yuslpxckp01Cug.0vCnUKkPakKHk7vA1C');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userchat`
--

DROP TABLE IF EXISTS `userchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userchat` (
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  KEY `user1_id` (`user1_id`),
  KEY `user2_id` (`user2_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `userchat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `user` (`id`),
  CONSTRAINT `userchat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `user` (`id`),
  CONSTRAINT `userchat_ibfk_3` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userchat`
--

LOCK TABLES `userchat` WRITE;
/*!40000 ALTER TABLE `userchat` DISABLE KEYS */;
INSERT INTO `userchat` VALUES (1,2,16),(3,2,17),(1,3,18),(4,2,19),(3,6,20),(4,6,21),(6,2,22),(6,5,23),(3,7,24),(4,7,25),(6,7,26),(7,5,27),(1,5,28),(4,1,29),(6,1,30);
/*!40000 ALTER TABLE `userchat` ENABLE KEYS */;
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
