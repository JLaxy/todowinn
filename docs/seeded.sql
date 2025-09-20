-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: todowinndb
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Changelogs`
--

DROP TABLE IF EXISTS `Changelogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Changelogs` (
  `changelog_id` int NOT NULL AUTO_INCREMENT,
  `old` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `new` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `task_id` int NOT NULL,
  `field` enum('NAME','DESCRIPTION','DATE_TARGET','STATUS','REMARKS') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`changelog_id`),
  KEY `Changelogs_task_id_fkey` (`task_id`),
  CONSTRAINT `Changelogs_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Tasks` (`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Changelogs`
--

LOCK TABLES `Changelogs` WRITE;
/*!40000 ALTER TABLE `Changelogs` DISABLE KEYS */;
INSERT INTO `Changelogs` VALUES (1,'TODO','IN_PROGRESS','2025-09-17 01:09:08.712',1,'STATUS'),(2,'to contact owner.','will interview client tomorrow, September 18, 2025','2025-09-17 01:09:08.712',1,'REMARKS'),(3,'TODO','IN_PROGRESS','2025-09-17 01:09:43.412',2,'STATUS'),(4,'drafting proposal','created initial draft; to be peer reviewed','2025-09-17 01:09:43.412',2,'REMARKS'),(5,'IN_PROGRESS','FINISHED','2025-09-17 01:10:14.902',1,'STATUS'),(6,'will interview client tomorrow, September 18, 2025','successfully interviewed client!','2025-09-17 01:10:14.902',1,'REMARKS'),(7,'NOTHING','2025-09-20T00:00:00.000Z','2025-09-17 01:11:30.728',2,'DATE_TARGET'),(8,'created initial draft; to be peer reviewed','refining project proposal to fit found problems','2025-09-17 01:11:30.728',2,'REMARKS'),(9,'TODO','IN_PROGRESS','2025-09-17 01:12:29.496',3,'STATUS'),(10,'finding related literature','starting draft','2025-09-17 01:12:29.496',3,'REMARKS'),(11,'refining project proposal to fit found problems','present to client','2025-09-17 01:15:10.299',2,'REMARKS'),(12,'IN_PROGRESS','FINISHED','2025-09-17 01:15:41.037',2,'STATUS'),(13,'present to client','successfully presented to client','2025-09-17 01:15:41.037',2,'REMARKS'),(14,'TODO','IN_PROGRESS','2025-09-17 01:17:09.359',4,'STATUS'),(15,'find export','meet expert tomorrow, September 26, 2025','2025-09-17 01:17:09.359',4,'REMARKS'),(16,'NOTHING','2025-09-30T00:00:00.000Z','2025-09-17 01:19:36.340',5,'DATE_TARGET'),(17,'IN_PROGRESS','CANCELLED','2025-09-17 01:20:21.486',4,'STATUS'),(18,'meet expert tomorrow, September 26, 2025','expert is not willing to help anymore, find new expert','2025-09-17 01:20:21.486',4,'REMARKS'),(19,'TODO','FINISHED','2025-09-17 01:26:39.328',6,'STATUS'),(20,'to talk to at September 15, 2025','done','2025-09-17 01:26:39.328',6,'REMARKS'),(21,'TODO','IN_PROGRESS','2025-09-17 01:27:06.330',7,'STATUS'),(22,'define all table entites','for peer-review','2025-09-17 01:27:06.330',7,'REMARKS'),(23,'TODO','FINISHED','2025-09-17 01:31:13.478',9,'STATUS'),(24,'create account in GitHub','initialized','2025-09-17 01:31:13.478',9,'REMARKS'),(25,'FINISHED','IN_PROGRESS','2025-09-17 01:32:20.286',9,'STATUS'),(26,'initialized','designing','2025-09-17 01:32:20.286',9,'REMARKS'),(27,'IN_PROGRESS','FINISHED','2025-09-17 01:33:04.012',9,'STATUS'),(28,'designing','initialized','2025-09-17 01:33:04.012',9,'REMARKS'),(29,'TODO','IN_PROGRESS','2025-09-17 01:33:33.666',10,'STATUS'),(30,'creating account','designing','2025-09-17 01:33:33.666',10,'REMARKS'),(31,'TODO','CANCELLED','2025-09-17 01:35:39.630',11,'STATUS'),(32,'TODO','IN_PROGRESS','2025-09-17 01:36:13.042',12,'STATUS'),(33,'IN_PROGRESS','FINISHED','2025-09-17 01:37:02.881',12,'STATUS'),(34,'FINISHED','IN_PROGRESS','2025-09-17 01:37:14.569',12,'STATUS'),(35,'TODO','IN_PROGRESS','2025-09-17 01:37:20.414',14,'STATUS'),(36,'IN_PROGRESS','FINISHED','2025-09-17 01:37:29.602',14,'STATUS');
/*!40000 ALTER TABLE `Changelogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Members` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `Members_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,'jun@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$vcMAzUZ1W3ezeQ2YjvUJsQ$VT7uqPfhyKV0M7ZgAHL3Zi3MmzKcyw1g39BIfWsQNAc');
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Projects`
--

DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projects` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `date_finished` datetime(3) DEFAULT NULL,
  `date_target` datetime(3) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `member_id` int NOT NULL,
  `project_id` int NOT NULL AUTO_INCREMENT,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('TODO','IN_PROGRESS','FINISHED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TODO',
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `Projects_name_key` (`name`),
  KEY `Projects_member_id_fkey` (`member_id`),
  CONSTRAINT `Projects_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES ('Zav Product Management System','2025-09-17 01:00:47.844',NULL,'2025-11-28 00:00:00.000','Product Management System using Java, JavaFX and MYSQL',1,1,NULL,'IN_PROGRESS'),('System Projects Monitoring System','2025-09-17 01:04:09.580',NULL,'2026-05-10 00:00:00.000','Monitors softwares built in-house of the organization using C# and .NET framework',1,2,NULL,'IN_PROGRESS'),('Distracted Driving Detection System','2025-09-17 01:23:19.607',NULL,NULL,'Detect distracted driving detection using proposed machine learning model',1,3,NULL,'TODO'),('Live Foto','2025-09-17 01:28:00.615',NULL,NULL,'Photobooth-like Web Application using Nextjs',1,4,'unprofitable','CANCELLED'),('Sample Finished Project','2025-09-17 01:34:47.806','2025-09-17 01:38:26.752',NULL,'A Sample finished project',1,5,'finished task!','FINISHED');
/*!40000 ALTER TABLE `Projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tasks`
--

DROP TABLE IF EXISTS `Tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_target` datetime(3) DEFAULT NULL,
  `date_created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `date_finished` datetime(3) DEFAULT NULL,
  `status` enum('TODO','IN_PROGRESS','FINISHED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TODO',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `Tasks_project_id_fkey` (`project_id`),
  CONSTRAINT `Tasks_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects` (`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tasks`
--

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;
INSERT INTO `Tasks` VALUES (1,'Initial Interview','Interview owner of Zav\'s Kitchen and Bar for potential problems',NULL,'2025-09-17 01:05:35.917','2025-09-17 01:10:14.886','FINISHED','successfully interviewed client!',1),(2,'Project Proposal','Create initial proposal and present to client','2025-09-20 00:00:00.000','2025-09-17 01:06:21.772','2025-09-17 01:15:41.026','FINISHED','successfully presented to client',1),(3,'Chapter 1 draft','Create draft of Chapter 1',NULL,'2025-09-17 01:07:09.615',NULL,'IN_PROGRESS','starting draft',1),(4,'Expert collaboration','contact inventory system expert to ask for insight',NULL,'2025-09-17 01:13:58.251',NULL,'CANCELLED','expert is not willing to help anymore, find new expert',1),(5,'UI Wireframe','Create wireframe of UI on figma','2025-09-30 00:00:00.000','2025-09-17 01:18:59.206',NULL,'TODO','Setup',1),(6,'Requirement gathering','Talk to supervisor for system requirements',NULL,'2025-09-17 01:21:47.612','2025-09-17 01:26:39.313','FINISHED','done',2),(7,'Database ERD','Create database ERD using Draw.IO',NULL,'2025-09-17 01:22:38.390',NULL,'IN_PROGRESS','for peer-review',2),(8,'Initialize Repo','Initialize repository in GitLab',NULL,'2025-09-17 01:25:36.955',NULL,'TODO','create account in gitlab',2),(9,'Initialize Repo','Initialize repository in GitHub',NULL,'2025-09-17 01:28:35.570','2025-09-17 01:33:04.002','FINISHED','initialized',4),(10,'Create UI Wireframe','Create wireframe in Figma',NULL,'2025-09-17 01:32:06.501',NULL,'IN_PROGRESS','designing',4),(11,'Cancelled task','sample cancelled task',NULL,'2025-09-17 01:35:22.784',NULL,'CANCELLED','hello world',5),(12,'Ongoing task','sample ongoing task',NULL,'2025-09-17 01:35:58.802',NULL,'IN_PROGRESS','hello world',5),(13,'Todo task','sample todo task',NULL,'2025-09-17 01:36:20.878',NULL,'TODO','hello world',5),(14,'Finished task','sample finished task',NULL,'2025-09-17 01:36:48.966','2025-09-17 01:37:29.593','FINISHED','hello world',5);
/*!40000 ALTER TABLE `Tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0c38ae2c-1629-4e1f-9474-ad66790420f4','d2df19c618234473eedf56693ac6ab360d7a33837247fb2743d4e65b46f86a22','2025-09-17 00:57:32.943','20250916120131_changelogtable_changes',NULL,NULL,'2025-09-17 00:57:32.839',1),('1bac71cc-ec61-448b-91bd-14c89f1eac5e','133139b2a3693ea3b9e6f037a1202486598a45e16f198c2599a294c5fbb65e57','2025-09-17 00:57:32.831','20250909105847_default_status_fix',NULL,NULL,'2025-09-17 00:57:32.802',1),('4edc8a52-a701-47e9-805e-8b2e39d9d82f','6652cb104804b02f1b7bcfdade20716981feab620479028031b7b2ce47dbcdc9','2025-09-17 00:57:31.722','20250902090326_first_migration',NULL,NULL,'2025-09-17 00:57:31.662',1),('73c79c6c-877e-4237-b410-167789c445b6','2e0abb4a264272484ca8a683ee5ceb76e9f12b2fdbc036e51c148c71641e8878','2025-09-17 00:57:32.439','20250904084806_final_structure',NULL,NULL,'2025-09-17 00:57:31.848',1),('9dd7a767-97c7-40fa-ae0c-453f0cee3892','3fd372193818375e5b85f0b22b3260825da51b0fb3ac7cc03447a12c60896300','2025-09-17 00:57:31.843','20250902095834_date_created_rename',NULL,NULL,'2025-09-17 00:57:31.734',1),('eeb5b4c1-2be0-4eaa-8ad4-0670b55239ea','59f72995a9423a2ab260043a28557048dc33b8d3836e8ec671ffee9e38e9c902','2025-09-17 00:57:33.062','20250917000947_old_new_asstring_changelogs',NULL,NULL,'2025-09-17 00:57:32.948',1),('fb4a4dc9-ac60-4dfd-8b30-1dbdb4cf04f6','43d8f1e99ab15486af320953789cb5dc426e69f3ef6deb6617c28a194708e846','2025-09-17 00:57:32.798','20250907005353_finish_status_fix',NULL,NULL,'2025-09-17 00:57:32.446',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'todowinndb'
--

--
-- Dumping routines for database 'todowinndb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-17  9:39:17
