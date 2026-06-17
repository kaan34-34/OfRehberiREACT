USE ofrehberi;

INSERT IGNORE INTO categories (id, name, icon, color) VALUES
('GRGS','YEMEK','Restaurant','#e74c3c'),
('LFKB','CAFE','LocalCafe','#8e6e53'),
('GLEK','ALIŞVERİŞ','ShoppingCart','#27ae60'),
('DGRH','ULAŞIM','DirectionsBus','#2980b9'),
('NBFT','SAĞLIK','LocalHospital','#e91e63'),
('VCBN','GİYİM','Checkroom','#9b59b6'),
('HDYL','HEDİYELİK','CardGiftcard','#f39c12'),
('9TGS','TAMİR','Build','#7f8c8d'),
('ATMG','EV/BAHÇE','Home','#1abc9c'),
('SDFE','KONAKLAMA','Hotel','#e67e22'),
('OKKU','OKUL/KURS','School','#3498db'),
('BNFT','TELEFON','PhoneAndroid','#2c3e50'),
('DFHD','BAKIM','ContentCut','#e84393'),
('BNAT','BANKA/ATM','AccountBalance','#0984e3'),
('NXGR','DİĞER','MoreHoriz','#636e72');

INSERT IGNORE INTO sub_categories (id, category_id, name) VALUES
('GRGS01','GRGS','Restoran'),('GRGS02','GRGS','Fast Food'),('GRGS03','GRGS','Kebapçı'),('GRGS04','GRGS','Pideci'),
('GRGS05','GRGS','Balık'),('GRGS06','GRGS','Pastane'),('GRGS07','GRGS','Dönerci'),('GRGS08','GRGS','Tostçu'),
('LFKB01','LFKB','Cafe'),('LFKB02','LFKB','Çay Bahçesi'),('LFKB03','LFKB','Nargile Cafe'),
('GLEK01','GLEK','Market'),('GLEK02','GLEK','Bakkal'),('GLEK03','GLEK','Kırtasiye'),('GLEK04','GLEK','Züccaciye'),
('DGRH01','DGRH','Taksi'),('DGRH02','DGRH','Servis'),('DGRH03','DGRH','Oto Kiralama'),
('NBFT01','NBFT','Eczane'),('NBFT02','NBFT','Doktor'),('NBFT03','NBFT','Diş Hekimi'),('NBFT04','NBFT','Veteriner'),
('VCBN01','VCBN','Erkek Giyim'),('VCBN02','VCBN','Kadın Giyim'),('VCBN03','VCBN','Çocuk Giyim'),('VCBN04','VCBN','Ayakkabı'),
('DFHD01','DFHD','Kuaför'),('SDFE01','SDFE','Otel'),('BNFT01','BNFT','Telefon'),('9TGS01','9TGS','Oto Tamirci');

INSERT IGNORE INTO neighborhoods (id, name) VALUES
('M001','Bölümlü'),('M002','Cumhuriyet'),('M003','Kaban'),('M004','Sulakyurt'),('M005','Soğukpınar'),('M006','İskenderli'),
('M007','Akoluk'),('M008','Ballıca'),('M009','Çamlık'),('M010','Çarşı'),('M011','Kalkınma'),('M012','Sarayköy');

INSERT IGNORE INTO businesses (id, name, slug, category_id, sub_category_id, neighborhood_id, slogan, address, phone1, phone2, gsm, open_now, open_all_day, open_time, close_time, has_delivery, accepts_card, rating, total_votes, featured, image_url) VALUES
('F001','Pide House Of','pide-house-of','GRGS','GRGS04','M010','Of''un en lezzetli pideleri burada!','Çarşı Mah. Cumhuriyet Cad. No:15','0462 771 00 01','','0532 111 22 33',true,false,'08:00:00','23:00:00',true,true,4.5,128,true,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'),
('F002','Cafe Trabzon','cafe-trabzon','LFKB','LFKB01','M002','Trabzon''un eşsiz manzarasıyla kahvenizi yudumlayın.','Cumhuriyet Mah. Sahil Yolu No:8','0462 771 00 02','','0533 222 33 44',true,false,'09:00:00','00:00:00',false,true,4.2,85,true,'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'),
('F003','Of Market','of-market','GLEK','GLEK01','M003','Her ihtiyacınız tek çatı altında.','Kaban Mah. Atatürk Cad. No:42','0462 771 00 03','','0534 333 44 55',true,true,'00:00:00','00:00:00',true,true,4.0,64,true,'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop'),
('F004','Karadeniz Kebap','karadeniz-kebap','GRGS','GRGS03','M010','Geleneksel lezzetler, modern sunum.','Çarşı Mah. Liman Sok. No:7','0462 771 00 04','0462 771 00 05','0535 444 55 66',false,false,'11:00:00','22:00:00',true,false,4.7,210,true,'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop'),
('F005','Yeşil Eczane','yesil-eczane','NBFT','NBFT01','M002','Sağlığınız bizim önceliğimiz.','Cumhuriyet Mah. Hastane Cad. No:3','0462 771 00 06','','',true,false,'08:30:00','19:00:00',false,true,4.1,42,false,'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop'),
('F006','Of Taksi Durağı','of-taksi-duragi','DGRH','DGRH01','M010','7/24 hizmetinizdeyiz.','Çarşı Mah. Terminal Yanı','0462 771 00 07','','0536 555 66 77',true,true,'00:00:00','00:00:00',false,false,3.8,56,true,'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=1170&auto=format&fit=crop'),
('F007','Stil Kuaför','stil-kuafor','DFHD','DFHD01','M004','Tarzınızı biz belirleyelim.','Sulakyurt Mah. Yeni Sok. No:12','0462 771 00 08','','0537 666 77 88',true,false,'09:00:00','20:00:00',false,true,4.3,91,true,'https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1169&auto=format&fit=crop'),
('F008','Deniz Otel','deniz-otel','SDFE','SDFE01','M002','Deniz manzaralı konforlu odalar.','Cumhuriyet Mah. Sahil Cad. No:1','0462 771 00 09','0462 771 00 10','0538 777 88 99',true,true,'00:00:00','00:00:00',false,true,4.6,175,true,'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'),
('F009','Tekno Cep','tekno-cep','BNFT','BNFT01','M010','En yeni telefonlar en uygun fiyatlarla.','Çarşı Mah. Çarşı İçi No:22','0462 771 00 11','','0539 888 99 00',true,false,'09:00:00','19:30:00',false,true,3.9,33,false,'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'),
('F010','Lezzet Pastanesi','lezzet-pastanesi','GRGS','GRGS06','M011','Taze pastalar, el yapımı kurabiyeler.','Kalkınma Mah. Okul Cad. No:5','0462 771 00 12','','0530 999 00 11',true,false,'07:00:00','21:00:00',true,true,4.8,245,true,'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop'),
('F011','Güven Oto Tamir','guven-oto-tamir','9TGS','9TGS01','M006','Aracınız güvenli ellerde.','İskenderli Mah. Sanayi Sitesi No:8','0462 771 00 13','','0531 000 11 22',true,false,'08:00:00','18:00:00',false,false,4.4,67,false,'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'),
('F012','Moda Giyim','moda-giyim','VCBN','VCBN01','M010','Şıklığın adresi.','Çarşı Mah. İstiklal Cad. No:18','0462 771 00 14','','0532 111 22 33',true,false,'09:00:00','20:00:00',false,true,4.1,55,false,'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop');

INSERT IGNORE INTO business_details (id, business_id, weekday_hours, saturday_hours, sunday_hours, opening_date, email, website, fax, instagram, facebook, twitter, google_map_embed) VALUES
(1,'F001','08:00 - 23:00','08:00 - 23:00','10:00 - 22:00','2016-03-12','info@pidehouseof.com','','','pidehouseof','pidehouseof','','https://www.google.com/maps/embed?pb=mock'),
(2,'F002','09:00 - 00:00','09:00 - 01:00','10:00 - 23:00','2018-06-20','info@cafetrabzon.com','www.cafetrabzon.com','','cafetrabzon','cafetrabzon','',''),
(3,'F003','7/24 Açık','7/24 Açık','7/24 Açık','2010-01-01','','','','','','',''),
(4,'F004','11:00 - 22:00','11:00 - 23:00','12:00 - 21:00','2015-08-15','karadenizkebap@gmail.com','','0462 771 00 99','karadenizkebap','','','https://www.google.com/maps/embed?pb=mock'),
(5,'F005','08:30 - 19:00','09:00 - 17:00','Kapalı','2012-10-03','','','','','','',''),
(6,'F006','7/24 Açık','7/24 Açık','7/24 Açık','2005-01-01','','','','oftaksi','oftaksi','oftaksi',''),
(7,'F007','09:00 - 20:00','09:00 - 20:00','Kapalı','2019-04-22','','','','stilkuafor','','',''),
(8,'F008','7/24 Açık','7/24 Açık','7/24 Açık','2014-07-10','info@denizotel.com','www.denizotel.com','0462 771 00 99','denizotel','denizotel','denizotel',''),
(9,'F009','09:00 - 19:30','09:00 - 19:00','Kapalı','2020-11-15','','','','teknocep','','',''),
(10,'F010','07:00 - 21:00','07:00 - 22:00','08:00 - 20:00','2013-09-01','lezzetpastanesi@gmail.com','','','lezzetpastanesi','lezzetpastanesi','',''),
(11,'F011','08:00 - 18:00','08:00 - 16:00','Kapalı','2017-02-10','','','','','','',''),
(12,'F012','09:00 - 20:00','09:00 - 21:00','10:00 - 19:00','2019-01-05','info@modagiyim.com','www.modagiyim.com','','modagiyimof','modagiyimof','','');

INSERT IGNORE INTO business_gallery_images (business_detail_id, image_url, sort_order) VALUES
(1,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',1),(1,'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',2),(1,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',3),
(2,'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',1),(2,'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',2),(2,'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',3),
(3,'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop',1),
(4,'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop',1),(4,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',2),
(5,'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=600&fit=crop',1),
(6,'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=800&h=600&fit=crop',1),
(7,'https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800&h=600&fit=crop',1),(7,'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',2),
(8,'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',1),(8,'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',2),(8,'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',3),
(9,'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop',1),
(10,'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop',1),(10,'https://images.unsplash.com/photo-1486427944544-d2c246c4df4d?w=800&h=600&fit=crop',2),
(11,'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',1),
(12,'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',1),(12,'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop',2);

INSERT IGNORE INTO reviews (id, business_id, user_name, avatar_url, rating, comment_text, review_date, admin_reply) VALUES
('R001','F001','Ahmet Y.','',5,'Pideleri harika, kesinlikle tavsiye ederim!','2026-03-10','Teşekkür ederiz Ahmet Bey!'),
('R002','F001','Fatma K.','',4,'Güzel ortam, lezzetli yemekler. Servis biraz yavaş olabilir.','2026-03-05',''),
('R003','F002','Mehmet A.','',4,'Manzarası çok güzel, kahveleri kaliteli.','2026-03-01',''),
('R004','F004','Ali V.','',5,'Of''un en iyi kebapçısı, tereddütsüz gelin!','2026-02-28','Çok teşekkürler Ali Bey, bekliyoruz!'),
('R005','F004','Zeynep D.','',5,'Adana kebap mükemmel. Porsiyonlar da gayet doyurucu.','2026-02-20',''),
('R006','F004','Emre T.','',4,'Lezzetler güzel ama biraz kalabalık olabiliyor.','2026-02-15',''),
('R007','F006','Burak S.','',4,'Her saat çalışıyorlar, çok memnunum.','2026-03-12',''),
('R008','F007','Selin M.','',5,'Harika bir kuaför, çok memnun kaldım!','2026-03-08','Teşekkürler Selin Hanım, yine bekleriz!'),
('R009','F008','Hakan B.','',5,'Manzara muhteşem, odalar tertemiz.','2026-02-25',''),
('R010','F008','Ayşe G.','',4,'Kahvaltı çeşitleri zengin. Personel ilgili.','2026-02-18',''),
('R011','F010','Derya K.','',5,'Yaş pastaları şahane, özellikle çileklisi!','2026-03-30',''),
('R012','F010','Murat Ö.','',5,'Her gittiğimde memnun ayrılıyorum. Kurabiyeler de çok lezzetli.','2026-03-22','Teşekkür ederiz Murat Bey!'),
('R013','F011','Osman C.','',4,'İşini iyi yapıyor, fiyatlar makul.','2026-03-02','');

INSERT IGNORE INTO app_users (id, full_name, email, firebase_uid, password_hash, role) VALUES
(1,'Admin Kullanıcı','admin@ofrehberi.local',NULL,'admin123','ADMIN'),
(2,'Demo Kullanıcı','demo@ofrehberi.local',NULL,'demo123','USER');

UPDATE app_users SET password_hash = 'admin123' WHERE email = 'admin@ofrehberi.local' AND (password_hash IS NULL OR password_hash = '');
UPDATE app_users SET password_hash = 'demo123' WHERE email = 'demo@ofrehberi.local' AND (password_hash IS NULL OR password_hash = '');

INSERT IGNORE INTO questions (business_id, user_name, question_text, answer_text, asked_at, answered_at) VALUES
('F001','Demo Kullanıcı','Paket servis hangi mahallelere var?','Çarşı, Cumhuriyet ve Kalkınma mahallelerine servisimiz vardır.','2026-06-01 10:30:00','2026-06-01 12:10:00'),
('F008','Ayşe G.','Deniz manzaralı oda müsait mi?',NULL,'2026-06-02 14:20:00',NULL);

INSERT IGNORE INTO purchases (user_id, business_id, package_name, amount, currency, payment_provider, payment_status, purchased_at) VALUES
(2,'F001','Öne Çıkan Firma Paketi',299.90,'TRY','MOCK','MOCK_APPROVED','2026-06-03 09:15:00'),
(2,'F008','Aylık Vitrin Paketi',499.90,'TRY','MOCK','MOCK_APPROVED','2026-06-04 16:45:00');
