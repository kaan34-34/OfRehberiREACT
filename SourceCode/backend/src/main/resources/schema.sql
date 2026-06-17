CREATE DATABASE IF NOT EXISTS ofrehberi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ofrehberi;

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  icon VARCHAR(80),
  color VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS sub_categories (
  id VARCHAR(10) PRIMARY KEY,
  category_id VARCHAR(10) NOT NULL,
  name VARCHAR(80) NOT NULL,
  CONSTRAINT fk_sub_category_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS businesses (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  category_id VARCHAR(10) NOT NULL,
  sub_category_id VARCHAR(10) NOT NULL,
  neighborhood_id VARCHAR(10) NOT NULL,
  slogan VARCHAR(255),
  address VARCHAR(255),
  phone1 VARCHAR(40),
  phone2 VARCHAR(40),
  gsm VARCHAR(40),
  open_now BOOLEAN NOT NULL DEFAULT TRUE,
  open_all_day BOOLEAN NOT NULL DEFAULT FALSE,
  open_time TIME,
  close_time TIME,
  has_delivery BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_card BOOLEAN NOT NULL DEFAULT FALSE,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0,
  total_votes INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  image_url TEXT,
  CONSTRAINT fk_business_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_business_sub_category FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
  CONSTRAINT fk_business_neighborhood FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id)
);

CREATE TABLE IF NOT EXISTS business_details (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  business_id VARCHAR(10) NOT NULL UNIQUE,
  weekday_hours VARCHAR(80),
  saturday_hours VARCHAR(80),
  sunday_hours VARCHAR(80),
  opening_date DATE,
  email VARCHAR(160),
  website VARCHAR(160),
  fax VARCHAR(40),
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  twitter VARCHAR(100),
  google_map_embed TEXT,
  CONSTRAINT fk_detail_business FOREIGN KEY (business_id) REFERENCES businesses(id)
);

CREATE TABLE IF NOT EXISTS business_gallery_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  business_detail_id BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE KEY uk_gallery_detail_order (business_detail_id, sort_order),
  CONSTRAINT fk_gallery_detail FOREIGN KEY (business_detail_id) REFERENCES business_details(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(30) PRIMARY KEY,
  business_id VARCHAR(10) NOT NULL,
  user_id BIGINT NULL,
  user_name VARCHAR(120) NOT NULL,
  avatar_url TEXT,
  rating INT NOT NULL,
  comment_text TEXT NOT NULL,
  review_date DATE NOT NULL,
  admin_reply TEXT,
  CONSTRAINT fk_review_business FOREIGN KEY (business_id) REFERENCES businesses(id),
  CONSTRAINT chk_review_rating CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE IF NOT EXISTS app_users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  firebase_uid VARCHAR(160) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL
);

ALTER TABLE app_users ADD COLUMN IF NOT EXISTS firebase_uid VARCHAR(160) UNIQUE;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE app_users MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id BIGINT NULL;

CREATE TABLE IF NOT EXISTS questions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  business_id VARCHAR(10) NOT NULL,
  user_name VARCHAR(120) NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  asked_at DATETIME NOT NULL,
  answered_at DATETIME,
  UNIQUE KEY uk_question_seed (business_id, user_name, asked_at),
  CONSTRAINT fk_question_business FOREIGN KEY (business_id) REFERENCES businesses(id)
);

CREATE TABLE IF NOT EXISTS purchases (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  business_id VARCHAR(10) NOT NULL,
  package_name VARCHAR(120) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
  payment_provider VARCHAR(40) NOT NULL,
  payment_status VARCHAR(40) NOT NULL,
  purchased_at DATETIME NOT NULL,
  UNIQUE KEY uk_purchase_seed (user_id, business_id, package_name, purchased_at),
  CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES app_users(id),
  CONSTRAINT fk_purchase_business FOREIGN KEY (business_id) REFERENCES businesses(id)
);
