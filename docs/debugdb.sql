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
  `old` enum('TODO','IN_PROGRESS','FINISHED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `new` enum('TODO','IN_PROGRESS','FINISHED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `task_id` int NOT NULL,
  PRIMARY KEY (`changelog_id`),
  KEY `Changelogs_task_id_fkey` (`task_id`),
  CONSTRAINT `Changelogs_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Tasks` (`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Changelogs`
--

LOCK TABLES `Changelogs` WRITE;
/*!40000 ALTER TABLE `Changelogs` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,'admin@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$uDw2Uo6Wk1vDkXBlKgRVDg$ng5nit4pY0bRFJno+LT+qcT0m9BfeldK87JwJyUOsks'),(2,'jun@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$Y0X1ESuE1IAb9mBiXyIiXg$Vzf5lFsp5rKgyYJjFSaXmjxqViKKNFNEUPqUIHpQrSo'),(4,'leah@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$E81MQslzyZ8OZt/Itt+s1A$Aivr6hX88ZMlzjKLKHZa9Wl1uOhPoj/NmN/TtiYq49U'),(5,'testuser@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$XG0STTNZapn3pZwYaJfWbQ$+2GabPnq9nYIXm9+8QRQMzglFRVgIKnciW5u6qKK0fE'),(8,'testuser1@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$uUc6s0qYlXlYk/yaDGbXZg$JKmO7eHqy0WMtNzrubMevjRmUAlT6Fou6cycchif7g4'),(9,'testuser28@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$kug97PL0hltfHsqHFiwNrA$2pQRAEmX0HCWCNG0rDZPYiGYJkXxMV9Eeg5HaXB1VeY'),(10,'testuser16@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$v8kwYbEnUglavXtkuzOrKQ$/IqiwrukbKdAjqw5H9ngDbYMg1ZqJo3P3R4UHbJ/bv8'),(11,'testuser18@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$YCaHTB4blhaq+33DAVhYIw$BzxMN6Xtim5jzh0kyMaVRtmWYtbhck2WvOVxdjDgVWY'),(12,'asd@asdasd.com','$argon2id$v=19$m=65536,t=3,p=4$frDiUc6Wc5BWsCuTluFGVg$k7emF4Kuz3cQYO570Vnt24Hlu9By9Swo2l/USseEtRc'),(26,'testuser288@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$JQ57Lu17+uL20bLcCRElKg$Noy+ER4sj0mO8KVPExo2UwoDvG3KLaqJwcSODsQHzWI'),(34,'apollo@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$6+Jpz8nAOaOD4hYho1cAXQ$qCC7VPnl4W6CnrolaYxGBtGq3XIt7N+iJcbYwnra2Bo'),(37,'testuser224534@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$sfaoe2Ex63mG8u8KzpsCAQ$09LOL91ul5NMffmVzO29N6EGHXtVM4nSFodD+UNcDMA'),(38,'testuser1231231@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$s1qTftvJlIXQb70wEXTk7Q$VZj0Pk1k6E5kE8nAcqp9vtvQxHmnJtIwGxGaluHxw9o'),(39,'newuser@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$8BJBr1DS59olSFaaHHyDMQ$/+oGxu5fzMgAM7f/PIC8lkWNdoVEaSxbJjzJQv4pGBY'),(41,'testuser123@todowinn.com','$argon2id$v=19$m=65536,t=3,p=4$qDRI9baeDexjYy9PAG50Sg$zxTr+Pt/FAi8OpvBN9BrtM6Obh1EH4QqdXtz7Ljui9c');
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
  `status` enum('TODO','IN_PROGRESS','FINISHED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IN_PROGRESS',
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `Projects_name_key` (`name`),
  KEY `Projects_member_id_fkey` (`member_id`),
  CONSTRAINT `Projects_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES ('test project','2025-09-07 10:57:01.255','2025-09-09 09:50:59.864',NULL,'helloworld',1,1,'remark','FINISHED'),('live foto','2025-09-07 11:17:32.975',NULL,'2025-07-16 00:00:00.000','photobooth webapp using nextjs',1,8,'to be described','TODO'),('test project11','2025-09-09 06:12:57.898','2025-09-09 09:58:20.745',NULL,'helloworld',2,10,'remarked','FINISHED'),('zav pms','2025-09-09 09:50:36.231','2025-09-09 09:50:49.491','2024-11-11 00:00:00.000','product management system in java',1,11,'done','FINISHED'),('nicole port','2025-09-09 09:57:22.095','2025-09-09 10:03:50.086','2025-09-29 00:00:00.000','portfolio built using nextjs',1,12,'lay-outing','FINISHED'),('jun\'s project','2025-09-09 09:58:18.391','2025-09-09 10:02:50.565','2025-09-17 00:00:00.000','project for his technical exam',2,13,'still figuring it out','FINISHED');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tasks`
--

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;
INSERT INTO `Tasks` VALUES (1,'test task','testing tasks','2025-09-07 00:00:00.000','2025-09-07 11:11:12.585',NULL,'IN_PROGRESS','hello world',1),(2,'test task','testing tasks','2002-10-28 00:00:00.000','2025-09-07 11:11:27.951',NULL,'IN_PROGRESS','working on it',1),(3,'test task1','testing tasks','2002-10-28 00:00:00.000','2025-09-07 11:15:34.336',NULL,'CANCELLED','working on it',1),(4,'test task12','testing tasks',NULL,'2025-09-07 11:15:44.292',NULL,'TODO','hello worlds',1),(5,'test task12','testing tasks',NULL,'2025-09-07 11:16:31.236',NULL,'TODO','hello worlds',1);
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
INSERT INTO `_prisma_migrations` VALUES ('353ef65c-1982-4556-8623-d5fccd030f18','2e0abb4a264272484ca8a683ee5ceb76e9f12b2fdbc036e51c148c71641e8878','2025-09-07 10:36:02.122','20250904084806_final_structure',NULL,NULL,'2025-09-07 10:36:01.471',1),('afe5b6a2-57d5-4417-885b-10a99b39fa11','6652cb104804b02f1b7bcfdade20716981feab620479028031b7b2ce47dbcdc9','2025-09-07 10:36:01.354','20250902090326_first_migration',NULL,NULL,'2025-09-07 10:36:01.293',1),('b7a22636-5149-4526-80f9-35a6428765e0','43d8f1e99ab15486af320953789cb5dc426e69f3ef6deb6617c28a194708e846','2025-09-07 10:36:02.497','20250907005353_finish_status_fix',NULL,NULL,'2025-09-07 10:36:02.130',1),('c44174c7-2265-4b74-9dc9-e31a5f6a289d','3fd372193818375e5b85f0b22b3260825da51b0fb3ac7cc03447a12c60896300','2025-09-07 10:36:01.461','20250902095834_date_created_rename',NULL,NULL,'2025-09-07 10:36:01.360',1);
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

-- Dump completed on 2025-09-09 18:07:04
