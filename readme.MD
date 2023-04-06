# <p align = "center">TypeMediCare API</p>

<p align = "center"><img style="width:800px" src="./assets/read-me-pic.png"/></p>

## :white_circle: Technologies

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [http-status](https://www.npmjs.com/package/http-status)
- [joi](https://joi.dev/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pg](https://node-postgres.com/)
- [string-strip-html](https://www.npmjs.com/package/string-strip-html)

# 🏁 Let's go!

This project is an idea of a simple API whose purpose is to enable doctors and patients to interact through medical appointments. Doctors can create appointments and patients can book, confirm and cancel them. Patients can also list all available (or unavailable) appointments, and filter these appointments by the doctor's specialization, date, hour, and even the doctor themselves. The stack of the project primarily consists of TypeScript and Express for the back-end, and the data base was made using PostgreSQL. All the other technologies used in this project are listed and referenced above.  

```bash
git clone https://github.com/ecocaval/TypeMediCareAPI.git && cd TypeMediCareAPI
```

Then you must install all the dependencies running:

```bash
npm install
```

If you want to use and test the api you will have to recriate the database considering the tables that are showen in the database modeling, feel free to add improvements given the basis. 

```sql
CREATE TABLE logins (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "logins_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE patients (
	"id" serial NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"loginId" int NOT NULL UNIQUE,
	CONSTRAINT "patients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE doctors (
	"id" serial NOT NULL,
	"specialityName" varchar(100) NOT NULL,
	"crm" varchar(6) NOT NULL UNIQUE,
	"crmOptionals" TEXT,
	"createdAt" DATE NOT NULL DEFAULT 'NOW()',
	"loginId" int NOT NULL UNIQUE,
	CONSTRAINT "doctors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE specialities (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL UNIQUE,
	CONSTRAINT "specialities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE appointments (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"doctorId" int NOT NULL,
	"patientId" int,
	"hour" time with time zone NOT NULL,
	"status" varchar(50) NOT NULL DEFAULT 'free',
	CONSTRAINT "appointments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "forbidenSessions" (
	"id" SERIAL NOT NULL,
	"token" VARCHAR(255) NOT NULL,
	"createdAt" DATE DEFAULT NOW()
);

ALTER TABLE "patients" 
ADD CONSTRAINT "patients_fk0" 
FOREIGN KEY ("loginId") 
REFERENCES "logins"("id") ON DELETE CASCADE;

ALTER TABLE "doctors" 
ADD CONSTRAINT "doctors_fk0" 
FOREIGN KEY ("specialityName") 
REFERENCES "specialities"("name") ON DELETE CASCADE;

ALTER TABLE "doctors" 
ADD CONSTRAINT "doctors_fk1" 
FOREIGN KEY ("loginId") 
REFERENCES "logins"("id") ON DELETE CASCADE;

ALTER TABLE "appointments" 
ADD CONSTRAINT "appointments_fk0" 
FOREIGN KEY ("doctorId") 
REFERENCES "doctors"("id") ON DELETE CASCADE;

ALTER TABLE "appointments" 
ADD CONSTRAINT "appointments_fk1" 
FOREIGN KEY ("patientId") 
REFERENCES "patients"("id") ON DELETE CASCADE;
```


To connect to the database create a .env file and populate it given the .env.example file:

```javascript
--Considering a local database--

PORT=               //the port to run your application
PGUSER=             //usually is postgres
PGPASSWORD=         //your password
PGHOST=             //usually is localhost
PGDATABASE=         //the name you give to the database
PGPORT=             //usually is 5432
NODE_ENV=           //dev || prod, prod activates SSL in db
JWT_PRIVATE_KEY=    //the key used in jwt.sign and jwt.verify
```



And finally, run:

```bash
npm run dev
```

or:

```bash
npm run build && npm start
```
