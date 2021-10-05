# Diccionario de datos

## Hospitals
Representa el lugar de origen de los pacientes registrados, guarda el nombre del hospital y la ciudad de origen.

| Columna | tipo de dato  | acepta nulos            | Llave primaria          | Llave extranjera |
| ------- | ------------- | ----------------------- | ----------------------- | ---------------- |
| id      | int (11)      | :ballot_box_with_check: | :ballot_box_with_check: |                  |
| name    | varchar (100) | :ballot_box_with_check: |                         |                  |
| city    | varchar (50)  | :ballot_box_with_check: |                         |                  |

## Patients
Guarda toda la información personal del paciente así como la fecha de inscripción. Se relaciona con la entidad Hospitals de forma muchos a uno.

| Columna          | tipo de dato  | acepta nulos            | Llave primaria          | Llave extranjera        |
| ---------------- | ------------- | ----------------------- | ----------------------- | ----------------------- |
| id               | int (11)      | :ballot_box_with_check: | :ballot_box_with_check: |                         |
| names            | varchar (100) | :ballot_box_with_check: |                         |                         |
| last_name        | varchar (50)  | :ballot_box_with_check: |                         |                         |
| second_last_name | varchar (50)  | :ballot_box_with_check: |                         |                         |
| sex              | enum('M','F') | :ballot_box_with_check: |                         |                         |
| birthday         | date          | :ballot_box_with_check: |                         |                         |
| inscription_date | date          | :ballot_box_with_check: |                         |                         |
| id_hospital      | int(11)       | :ballot_box_with_check: |                         | :ballot_box_with_check: |

## Guardians
Guarda la información relacionada al tutor del paciente registrado. Se relaciona con la entidad Patients de forma uno a uno.

| Columna    | tipo de dato  | acepta nulos            | Llave primaria          | Llave extranjera        |
| ---------- | ------------- | ----------------------- | ----------------------- | ----------------------- |
| id_patient | int (11)      | :ballot_box_with_check: | :ballot_box_with_check: | :ballot_box_with_check: |
| name       | varchar (100) | :ballot_box_with_check: |                         |                         |
| city       | varchar (10)  | :ballot_box_with_check: |                         |                         |