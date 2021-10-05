
INSERT INTO DigitalHospital.Hospitals (id,name,city) VALUES
	 (1,'IMSS','Mérida'),
	 (2,'IMSS','Valladolid'),
	 (3,'Hospital Cancún','Cancún'),
	 (4,'San Miguel','Valladolid');

INSERT INTO DigitalHospital.Patients (id,names,last_name,second_last_name,sex,birthday,inscription_date,id_hospital) VALUES
	 (1,'Miguel Angel','Martinez','Pech','M','2005-05-30','2021-06-10',1),
	 (2,'Antonio','Estrella','Escalante','M','2010-02-15','2021-06-10',2),
	 (3,'Estela Soledad','Paredes','García','F','2008-09-18','2021-06-11',2),
	 (4,'Gabriel','Juarez','Torres','M','2015-10-22','2021-06-11',3),
	 (5,'Lucero Carolina','Valdez','Figeroa','F','2018-01-27','2021-06-11',4);

INSERT INTO DigitalHospital.Guardians (id_patient,name,phone) VALUES
	 (1,'Karina  Canche','9995236458'),
	 (2,'Oscar Benitez','9991364552'),
	 (3,'Guillermo Islas','9995223545'),
	 (4,'Esther Suarez','9996458523'),
	 (5,'Humberto Lopez','9992286645');